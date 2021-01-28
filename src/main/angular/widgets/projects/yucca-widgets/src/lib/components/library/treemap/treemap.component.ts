import { Component, OnInit, Input, ChangeDetectorRef, SimpleChange } from '@angular/core';
import { SafeNumberPipe } from '../../../pipes/safe-number.pipe';
import { NumberFormat } from '../../../model/number-format';
import * as d3 from 'd3';
import { BoxRadius } from '../../../model/box-radius';
import { RenderService } from '../../../services/render.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes
} from '@angular/animations';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';
import { BroadcastService } from '../../../services/broadcast.service';
import { Constants } from '../../../yucca-widgets.constants';

@Component({
  selector: 'lib-treemap',
  template: `<div class="feature" id="{{panelIndex}}" ></div>` +
    `<div class="treemap-textscroll-wrapper" [ngStyle]="{'max-width.px': width}">` +
    `<div  class="treemap-textscroll" [innerHTML]="textvalues"` +
    `[@scrollRight]="{value: scrolltextState, params: { scrolltextLength: scrolltextLength, scrolltextDuration: scrolltextDuration }}"></div>` +
    `</div>`,
  styles: [],
  animations: [
    trigger('scrollRight', [
      transition('* => right', [
        style({ position: 'relative' }),
        animate("{{scrolltextDuration}}ms", keyframes([
          style({ left: '0%' }),
          style({ left: '-{{scrolltextLength}}em' })
        ]))
      ], { params: { scrolltextLength: 500, scrolltextDuration: "5000ms" } })
    ])
  ]
})

export class TreemapComponent implements OnInit {

  @Input() data: any;

  @Input() width: number;
  @Input() height: number;
  @Input() boxRadius: BoxRadius;
  @Input() chartData: any;

  @Input() numberFormat: NumberFormat;


  panelIndex: string;
  protected widgetId: string;
  protected widgetType: string;

  svg: any;
  group: any;
  static nodeCounter: number = 0;
  public textvalues: SafeHtml;
  public scrolltextState: string = "left";
  public scrolltextDuration: number;
  public scrolltextLength: number;

  x: any;
  y: any;

  rootHeigth = 20;
  margin = { top: this.rootHeigth, right: 0, bottom: 0, left: 0 };

  constructor(private safeNumberPipe: SafeNumberPipe, private renderService: RenderService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer, private broadcastService: BroadcastService) {
    this.widgetType = "YuccaTreemapChart";
  }

  ngOnInit(): void {
    this.widgetId = this.widgetType + new Date().getTime();

    this.panelIndex = "treemap_" + Math.floor((Math.random() * 10000) + 1);
    console.debug("TreemapComponent::TreemapComponent", this.width, this.height);
    this.height = this.height - this.rootHeigth;
    this.x = d3.scaleLinear().rangeRound([0, this.width]);
    this.y = d3.scaleLinear().rangeRound([0, this.height]);

    if (!this.boxRadius)
      this.boxRadius = { rx: 0, ry: 0 }
  }

  ngAfterViewInit(): void {
    this.drawChart();

    this.scrolltextState = 'right'
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChange) {
    if (changes["sankeyData"] && !changes["sankeyData"].firstChange) {
      d3.selectAll("#" + this.panelIndex + " svg").remove();

      this.drawChart();
    }
  }

  private drawChart = () => {
    console.debug("Treemap drawChart - chartData", this.chartData);

    this.svg = d3.select("#" + this.panelIndex)
      .append("svg")
      .attr("width", (+this.width + +this.margin.left + +this.margin.right))
      .attr("height", (+this.height + +this.margin.top + +this.margin.bottom))
      .attr("viewBox", "0  " + (this.rootHeigth / 2).toFixed(0) + " " + this.width + " " + (+this.height))
      .style("font", "12px sans-serif");

    this.group = this.svg
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
      .call(this.render, this.treemap(this.chartData));

    accumulate(this.chartData);
    accumulate2(this.chartData);
    this.refreshTextvalues(this.chartData)
  }

  private render = (group, root) => {
    console.debug("render", group, root);
    const node = group
      .selectAll("g")
      .data(root.children.concat(root))
      .join("g");

    node.attr("class", (d) => { return d === root ? "root" : "node node_" + this.nodeClass(d.data.name) });

    node.filter(d => d === root ? d.parent : d.children)
      .attr("cursor", "pointer")
      .on("click", (d) => { d === root ? this.zoomout(root) : this.zoomin(d) });

    node.append("rect")
      .attr("id", d => (d.leafUid = this.treeUid("leaf", ++TreemapComponent.nodeCounter)).id)
      .attr("fill", d => d === root ? "transparent" : this.upColor(d))
      .attr("stroke", "#fff")
      .attr("rx", this.boxRadius.rx)
      .attr("ry", this.boxRadius.ry);

    node.append("clipPath")
      .attr("id", d => (d.clipUid = this.treeUid("clip", ++TreemapComponent.nodeCounter)).id)
      .append("use")
      .attr("xlink:href", d => d.leafUid.href);

    node.append("text")
      .attr("clip-path", d => d.clipUid)
      .attr("font-weight", d => d === root ? "bold" : null)
      .selectAll("tspan")
      .data(d => (d === root ? [this.name(d)] : d.data.name.split("/")))
      .join("tspan")
      .attr("x", 3)
      .attr("y", (d, i: number, nodes: Array<any>) => `${+(i === nodes.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
      .attr("fill-opacity", (d, i, nodes) => i === nodes.length - 1 ? 0.7 : null)
      .attr("font-weight", (d, i, nodes) => i === nodes.length - 1 ? "normal" : null)
      .text(d => d);

    this.refreshTextvalues(root)
    group.call(this.position, root);
    setTimeout(() => {
      node.append("title")
        .text(d => this.tooltip(d));
      group.call(this.fixColors);
    }, 800);
  }

  private position = (group, root) => {
    group.selectAll("g")
      .attr("transform", d => d === root ? `translate(0,-` + this.rootHeigth + `)` : `translate(${this.x(d.x0)},${this.y(d.y0)})`)
      .select("rect")
      .attr("width", d => d === root ? this.width : this.x(d.x1) - this.x(d.x0))
      .attr("height", d => d === root ? this.rootHeigth : this.y(d.y1) - this.y(d.y0));
  }

  // When zooming in, draw the new nodes on top, and fade them in.
  private zoomin = (d) => {
    console.debug("Treemap - zoomin", d);
    const group0 = this.group.attr("pointer-events", "none");
    const group1 = this.group = this.svg.append("g").attr("transform",
      "translate(" + this.margin.left + "," + this.margin.top + ")").call(this.render, d);

    this.x.domain([d.x0, d.x1]);
    this.y.domain([d.y0, d.y1]);

    this.svg.transition()
      .duration(750)
      .call(t => group0.transition(t).remove()
        .call(this.position, d.parent))
      .call(t => group1.transition(t)
        .attrTween("opacity", () => d3.interpolate(0, 1))
        .call(this.position, d))
      .call(this.fixColors, group1);

    this.refreshTextvalues(d)

    this.broadcastService.next(new CustomEvent(Constants.YUCCA_WIDGET_EVENT, {
      detail: new YuccaWidgetEvent(this.widgetId,
        this.widgetType,
        Constants.EVENT_TYPES.DATASET_BROWSE,
        d)
    }));
  }

  // When zooming out, draw the old nodes on top, and fade them out.
  private zoomout = (d) => {
    const group0 = this.group.attr("pointer-events", "none");
    const group1 = this.group = this.svg.insert("g", "*").attr("transform",
      "translate(" + this.margin.left + "," + this.margin.top + ")").call(this.render, d.parent);

    this.x.domain([d.parent.x0, d.parent.x1]);
    this.y.domain([d.parent.y0, d.parent.y1]);

    this.svg.transition()
      .duration(750)
      .call(t => group0.transition(t).remove()
        .attrTween("opacity", () => d3.interpolate(1, 0))
        .call(this.position, d))
      .call(t => group1.transition(t)
        .call(this.position, d.parent));

    this.refreshTextvalues(d.parent.parent != null ? d.parent : this.chartData)
  }

  private treemap = data => d3.treemap()
    .tile(this.tile)
    (d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value));

  private name = d => d.ancestors().reverse().map(d => d.data.name).join("/");
  private format = d => { return this.safeNumberPipe.transform(d, this.numberFormat) }


  private tile = (node, x0, y0, x1, y1) => {
    d3.treemapBinary(node, 0, 0, this.width, this.height);
    for (const child of node.children) {
      child.x0 = x0 + child.x0 / this.width * (x1 - x0);
      child.x1 = x0 + child.x1 / this.width * (x1 - x0);
      child.y0 = y0 + child.y0 / this.height * (y1 - y0);
      child.y1 = y0 + child.y1 / this.height * (y1 - y0);
    }
  }

  public treeUid = (name, nodeCounter) => {
    const id = "O-" + (name == null ? "" : name + "-") + nodeCounter
    return {
      id: id,
      href: new URL(`#${id}`, "" + window.location) + ""
    }
  }

  private upColor = (d) => {
    return d.data && d.data.color ? d.data.color : (d.parent ? this.upColor(d.parent) : "#ddd");
  }

  private refreshTextvalues(d): void {
    console.debug("refreshTextvalues", d);
    var textvalues = "";
    var text = "";
    if (d && d.children) {
      for (var i = 0; i < d.children.length; i++) {
        var c = d.children[i];
        var upColor = this.upColor(d);
        var rgb = c.color ? d3.rgb(c.color) : d3.rgb(upColor)
        var fColor = this.renderService.guessForegroundColorRgb(rgb.r, rgb.g, rgb.b);
        var value = this.safeNumberPipe.transform(c.value, this.numberFormat);
        textvalues += "<span class='treemap-column' style='background-color: " + (c.color ?? upColor) + "; color: " + fColor + "'>" + (c.name ?? c.data.name) + "</span>" +
          "	<span class='treemap-first-value'>" +
          "		<span class='treemap-data-label'>" + this.chartData.valueLabel + "</span> <span class='treemap-data-value'>" + value + "</span>  " +
          "   </span>";
        text += (c.name ?? c.data.name) + this.chartData.valueLabel + c.value;
        if (c.value2 || (c.data && c.data.value2)) {
          var value2 = this.safeNumberPipe.transform(c.value2 ?? c.data.value2, this.numberFormat);
          textvalues += "	<span class='treemap-first-value'>" +
            "		<span class='treemap-data-label'>" + this.chartData.valueLabel2 + "</span> <span class='treemap-data-value'>" + value2 + "</span>  " +
            "   </span>";

          text += this.chartData.valueLabel2 + c.value2;
        }
      }
    }
    console.debug("refreshTextvalues text", text);
    this.scrolltextDuration = textvalues.length * 6;
    this.scrolltextLength = text.length / 1.8;

    this.textvalues = this.sanitizer.bypassSecurityTrustHtml(textvalues);
    this.scrolltextState = "left";
    setTimeout(() => {
      this.scrolltextState = "right";
    }, 500);
    this.cdr.detectChanges();
  };

  private fixColors = (group) => {
    group.selectAll("#" + this.panelIndex + " g .node").select("text").attr("fill", function (d) {
      const rect = d3.select(this.parentElement).select("rect").node() as SVGSVGElement;
      const text = d3.select(this).node() as SVGSVGElement;
      const label = d3.select(this).select("tspan").text();
      const bgColor = d3.rgb(rect.getAttribute("fill"));

      var rectWidth = rect.getBBox().width;
      var fontWidth = 10;
      var nameLength = label.length * fontWidth;

      if (rectWidth < nameLength) {
        var numOfChar = rectWidth / fontWidth - 1;
        if (numOfChar > 3 && rect.getBBox().height > text.getBBox().height) {
          d3.select(this).select("tspan").text(label.substring(0, numOfChar) + "...");
          const luma = 0.2126 * bgColor.r + 0.7152 * bgColor.g + 0.0722 * bgColor.b; // per ITU-R BT.709
          return luma > 164 ? "#000" : "#fff";
        }
        else {
          return "transparent";
        }
      }
      const luma = 0.2126 * bgColor.r + 0.7152 * bgColor.g + 0.0722 * bgColor.b; // per ITU-R BT.709
      return luma > 164 ? "#000" : "#fff";
    });
  }

  private nodeClass(name: string) {
    return name.replace(/([^a-z0-9]+)/gi, "");
  }



  private tooltip(d) {
    console.debug("tooltip", d);
    var value = this.safeNumberPipe.transform(d.value, this.numberFormat);
    var t = d.data.name + " - " + this.chartData.valueLabel + ": " + value;
    if (d.data.value2) {
      try {
        var value2 = this.safeNumberPipe.transform(d.data.value2, this.numberFormat);
        t += " - " + this.chartData.valueLabel2 + ": " + value2;
      }
      catch (e) {
      }
    }
    return t;
  }
}

var accumulate = function (d) {
  return (d._children = d.children) ? d.value = d.children.reduce(function (p, v) {
    return p + +accumulate(v);
  }, 0) : d.value;
};

var accumulate2 = function (d) {
  return (d._children = d.children) ? d.value2 = d.children.reduce(function (p, v) {
    return p + accumulate2(v);
  }, 0) : d.value2;
};