import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { DAG } from '../../../model/dag';

import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';
import { RenderService } from '../../../services/render.service';


@Component({
  selector: 'lib-sankey',
  template: `<div id="{{panelIndex}}"><svg id="sankey" width="980" height="500"></svg></div>`,
})

export class SankeyComponent implements OnInit {

  @Input() sankeyData: DAG;

  @Input() width: number;
  @Input() height: number;

  panelIndex: string;

  rootHeigth = 0;

  margin = { top: this.rootHeigth, right: 0, bottom: 0, left: 0 };

  constructor(private renderService: RenderService) {
    console.debug("SankeyDiagramComponent constructor")
  }

  ngOnInit(): void {
    this.panelIndex = "sankey_" + Math.floor((Math.random() * 10000) + 1);
  }

  ngAfterViewInit() {
    this.drawChart();
  }

  ngOnChanges(changes: SimpleChange) {    
    if (changes["sankeyData"] && !changes["sankeyData"].firstChange) {
      d3.selectAll("#" + this.panelIndex + " svg g").remove();

      this.drawChart();
    }
  }


  private drawChart() {
    console.debug("drawChart", this.sankeyData);

    let svg = d3.select("#" + this.panelIndex + " svg")
      .attr("width", (+this.width + +this.margin.left + +this.margin.right))
      .attr("height", (+this.height + +this.margin.top + +this.margin.bottom))

    let width = +svg.attr("width"),
      height = +svg.attr("height");

    var formatNumber = d3.format(",.0f"),
      format = function (d: any) { return formatNumber(d) /*+ " TWh"*/; },
      color = d3.scaleOrdinal(d3.schemeCategory10);

    var sankey = d3Sankey.sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[1, 1], [width - 1, height - 6]])
      .nodeSort(null);

    var links = svg.append("g")
      .attr("class", "links")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .attr("stroke-opacity", 0.2)
      .selectAll("path");

    var nodes = svg.append("g")
      .attr("class", "nodes")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .selectAll("g");

    sankey(this.sankeyData);

    links = links
      .data(this.sankeyData.links)
      .enter().append("path")
      .attr("d", d3Sankey.sankeyLinkHorizontal())
      .attr("class", "link")
      .attr("id", function (d, i) {
        return "link-" + i
      })
      .attr("stroke-width", function (d: any) { return Math.max(1, d.width); });

    links.append("title")
      .text(function (d: any) { return d.source.name + " → " + d.target.name + "\n" + format(d.value); });

    nodes = nodes
      .data(this.sankeyData.nodes)
      .enter().append("g");

    nodes.append("rect")
      .attr("x", function (d: any) { return d.x0; })
      .attr("y", function (d: any) { return d.y0; })
      .attr("height", function (d: any) { return d.y1 - d.y0; })
      .attr("width", function (d: any) { return d.x1 - d.x0; })
      .attr("fill", (d: any) => {
        if (typeof d.color == 'undefined' || d.color == null)
          d.color = color(d.name.replace(/ .*/, ""));
        else if (d.fades)
          d.color = this.renderService.ColorLuminance(d.color, Math.random() - .5);
        return d.color;
      })
      .attr("stroke", "#000")
      .attr("class", "node")
      .on("click", highlight_node_links);

    nodes.append("text")
      .attr("x", function (d: any) { return d.x0 - 6; })
      .attr("y", function (d: any) { return (d.y1 + d.y0) / 2; })
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(function (d: any) { return d.name; })
      .filter(function (d: any) { return d.x0 < width / 2; })
      .attr("x", function (d: any) { return d.x1 + 6; })
      .attr("text-anchor", "start");

    nodes.append("title")
      .text(function (d: any) { return d.name + "\n" + format(d.value); });
  }

}

function highlight_node_links(node, i) {
  var remainingNodes = [],
    nextNodes = [];

  var stroke_opacity = 0;
  if (d3.select(this).attr("data-clicked") == "1") {
    d3.select(this).attr("data-clicked", "0");
    stroke_opacity = 0.2;
  } else {
    d3.select(this).attr("data-clicked", "1");
    stroke_opacity = 0.5;
  }

  var traverse = [{
    linkType: "sourceLinks",
    nodeType: "target"
  }, {
    linkType: "targetLinks",
    nodeType: "source"
  }];

  traverse.forEach(function (step) {

    node[step.linkType].forEach(function (link) {
      remainingNodes.push(link[step.nodeType]);
      highlight_link(link.id, stroke_opacity);
    });

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function (node) {
        node[step.linkType].forEach(function (link) {
          nextNodes.push(link[step.nodeType]);
          highlight_link(link.id, stroke_opacity);
        });
      });
      remainingNodes = nextNodes;
    }
  });
}

function highlight_link(id, opacity) {
  d3.select("#link-" + id).style("stroke-opacity", opacity);
}