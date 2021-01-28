import { Component, ViewEncapsulation, Input, ChangeDetectorRef } from '@angular/core';
import { BaseDatasetWidgetComponent } from '../base-dataset-widget/base-dataset-widget.component';
import { DatasetColumn } from '../../../model/dataset-column';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { Info } from '../../../model/info';
import { DebugMessages } from '../../../model/debug-messages';

import { RenderService } from '../../../services/render.service';
import { SafeNumberPipe } from '../../../pipes/safe-number.pipe';

import * as d3 from 'd3';
import { MapUtilsService } from '../../../services/map-utils.service';
import { BroadcastService } from '../../../services/broadcast.service';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';
import { Constants } from '../../../yucca-widgets.constants';

@Component({
  selector: 'yucca-choropleth-map',
  templateUrl: './choropleth-map.component.html',
  styleUrls: ['./choropleth-map.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChoroplethMapComponent extends BaseDatasetWidgetComponent {

  @Input() groupByColumn: DatasetColumn;
  @Input() valueColumn: DatasetColumn;
  @Input() skipZeroValue: boolean; // TODO ?

  @Input() borderColor: string = "#fff";
  @Input() noDataColor: string = "#eee";
  @Input() rangeColors: Array<any>;


  @Input() geojsons: Array<any> = [{}];
  @Input() geoprojection: string = "mercator";


  private mapLayer: any;
  private mapColors: Array<any> = new Array();
  public info: Info = {
    show: false,
    content: " "
  };

  constructor(private dataService: DataService, private metadataService: MetadataService,
    private prepareDataService: PrepareDataService, private renderService: RenderService, private mapUtilsService: MapUtilsService, private cdr: ChangeDetectorRef, protected broadcastService: BroadcastService) {
    super(dataService, metadataService, prepareDataService, broadcastService);
    this.widgetType = "YuccaChoroplethMap";
    console.debug("ChoroplethMapComponent constructor")

    broadcastService.getEvents(event).subscribe(eventValue => {
      if (!YuccaWidgetEvent.ignoreEvent(eventValue, this.widgetId)) {
        if (eventValue["detail"].eventType == Constants.EVENT_TYPES.DATASET_CHANGE_VALUE_COLUMN) {
          let value = this.valueColumn;

          value["key"] = eventValue["detail"].data.key;
          value["label"] = eventValue["detail"].data.label;
          this.valueColumn = value;

          d3.selectAll("#" + this.widgetId + " svg g").remove();

          this.prepareData();
        }
      }
    });
  }


  ngOnInit(): void {
    super.ngOnInit();
    for (let gIndex = 0; gIndex < this.geojsons.length; gIndex++) {
      this.geojsons[gIndex] = this.mapUtilsService.initGeojson(this.geojsons[gIndex]);
    }
    
  }

  ngAfterViewInit(): void {
    if (!this.widgetWidth || this.widgetWidth > this.self.nativeElement.clientWidth)
      this.widgetWidth = this.self.nativeElement.clientWidth;

    if (!this.widgetHeight)
      this.widgetHeight = this.self.nativeElement.clientHeight;

    this.cdr.detectChanges();
  }

  protected validateParams(): DebugMessages {
    this.debugMessages = super.validateParams();

    let required = [
      { param: this.groupByColumn, type: "object", name: "groupByColumn", objectType: ": { key: string; label: string; countingMode: string;" },
      { param: this.valueColumn, type: "object", name: "valueColumn", objectType: ": { key: string; label: string; countingMode: string;" },
      { param: this.tenantcode, type: "string", name: "tenantcode" },
      { param: this.geojsons, type: "object", name: "geojsons", objectType: ": Array" },
    ];

    Array.prototype.push.apply(this.debugMessages.errors, this.dataService.checkParams(required, false));

    let optional = [
      { param: this.skipZeroValue, type: "boolean", name: "skipZeroValue" },
      { param: this.borderColor, type: "object", name: "borderColor" },
      { param: this.noDataColor, type: "object", name: "noDataColor" },
      { param: this.rangeColors, type: "object", name: "rangeColors", objectType: ": Array" },
      { param: this.geoprojection, type: "array", name: "geoprojection" },
    ];

    Array.prototype.push.apply(this.debugMessages.warnings, this.dataService.checkParams(optional, true));

    return this.debugMessages;
  }

  protected prepareData(): void {
    console.debug("ChoroplethMapComponent prepareData");
    this.chartData = this.prepareDataService.aggregationSerieKeyValue(this.allData, this.valueColumn, this.groupByColumn.key,
      null, this.colors.mainChartColor, null);

    console.debug("ChoroplethMapComponent prepareData - chartData", this.chartData);

    let values = [];
    for (let i = 0; i < this.chartData[0].values.length; i++) {
      values.push(parseFloat(this.chartData[0].values[i].value));
    }

    if (this.rangeColors) {
      var minValue = d3.min(this.chartData[0].values, function (d: any) { return d.value; });
      for (var c = 0; c < this.rangeColors.length; c++) { // [4,5,100,300
        let color = {
          max: this.rangeColors[c].limit, color: d3.scaleLinear().domain([minValue, this.rangeColors[c].limit])
            .clamp(true).range(this.renderService.getColorRange(this.rangeColors[c].color))
        }
        minValue = this.rangeColors[c].limit;
        this.mapColors.push(color);
      }
    }
    else {
      if (!this.colors.mainChartColor && this.colors.chartColors && this.colors.chartColors.length > 0) {
        this.colors.mainChartColor = this.colors.chartColors[0];
      }
      const maxValue = d3.max(values);
      const minValue = d3.min(values);
      this.mapColors.push({
        max: maxValue, color: d3.scaleLinear().domain([minValue, maxValue])
          .clamp(true).range(this.renderService.getColorRange(this.colors.mainChartColor))
      });
    }

    this.loadGeojson(0);
  }

  private loadGeojson(geojsonIndex: number): void {
    console.debug("ChoroplethMapComponent loadGeojson")
    //d3.json(this.geojsons[geojsonIndex].url, (error, mapData) => {
    this.mapUtilsService.loadGeojson(this.geojsons[geojsonIndex].url)
      .subscribe(res => {
        let mapData = res;
        console.debug("ChoroplethMapComponent loadGeojson mapData", mapData);
        // create a first guess for the projection
        for (var k in mapData.features) {
          mapData.features[k].properties.selected = false;
        }
        var geofit = this.mapUtilsService.fitGeojson(mapData, this.widgetWidth, this.widgetHeight, this.geoprojection);

        this.mapLayer = d3.select('#' + this.widgetId + ' svg').attr('width', this.widgetWidth)
          .attr('height', geofit.height).append('g').classed('map-layer', true);

        var path = geofit.path;
        // Update color scale domain based on data
        //color.domain([0, d3.max(features, nameLength)]);
        if (this.chartData[0].values.length > 0) {
          console.debug("ChoroplethMapComponent loadGeojson chartData[0]", this.chartData[0]);
          for (let j = 0; j < this.chartData[0].values.length; j++) {
            const d = this.chartData[0].values[j];
            for (let k = 0; k < mapData.features.length; k++) {
              if (d.key.toUpperCase() == mapData.features[k].properties[this.geojsons[geojsonIndex].key].toUpperCase()) {
                mapData.features[k].properties.label = this.chartData[0].label;
                mapData.features[k].properties.value = d.value;
                //geojson_data.features[k].properties.color = d.color;
              }
            }
          }
        }

        // Draw each province as a path
        this.mapLayer.selectAll('path')
          .data(mapData.features)
          .enter().append('path')
          .attr('d', path)
          .attr('vector-effect', 'non-scaling-stroke')
          .attr('fill', this.getValueColor)
          .style('fill', this.getValueColor)
          .style('stroke', "white")
          .on('mouseover', (d, i, nodes) => this.highlightFeature(d, i, nodes))
          .on('mouseout', this.resetHighlight);

        this.isLoading = false;
      }, error => {
        console.error("ChoroplethMapComponent loadGeojson - Error ", error);
      });
  };

  private getValueColor = (d: any) => {
    let color = this.noDataColor;
    if (d.properties.value) {
      color = this.mapColors[0].color(d.properties.value);
      for (let i = 0; i < this.mapColors.length - 1; i++) {
        if (d.properties.value >= this.mapColors[i].max && d.properties.value < this.mapColors[i + 1].max) {
          color = this.mapColors[i].color(d.properties.value);
        }
      }
      const diff = d.properties.value - this.mapColors[this.mapColors.length - 1].max;
      if (d.properties.value >= this.mapColors[this.mapColors.length - 1].max) {
        color = this.mapColors[this.mapColors.length - 1].color(d.properties.value);
      }
    }
    return color;
  };

  private highlightFeature = (d: any, i: number, nodes: any) => {
    d3.selectAll("path")
      .attr('vector-effect', 'non-scaling-stroke')
      .style("stroke", "transparent")
      .transition()
      .duration(200)
      .style("opacity", .5)
    d3.select(nodes[i])
      .transition()
      .duration(200)
      .style("opacity", 1)
      .style("stroke", "black")

    var safeNumberPipe = new SafeNumberPipe();

    this.updateInfo(true, d.properties.name + (d.properties.label ? " - " + d.properties.label : "") +
      (d.properties.value ?
        ": " + safeNumberPipe.transform(d.properties.value, this.numberFormat) : ": no data"));

    // var event = $yuccaHelpers.event.createEvent(scope.widgetId, widgetType, "dataset.highlight.group_by_column",
    //   { "key": d.properties[geojsons[activeGeojson].key], "color": color });
    // $rootScope.$broadcast('yucca-widget-event', event);

  };

  private resetHighlight = () => {
    d3.selectAll("path")
      .attr('vector-effect', 'non-scaling-stroke')
      .transition()
      .duration(200)
      .style("stroke", "white")
      .style("opacity", 1)
      .style("fill", this.getValueColor)


    this.updateInfo(false, "");


    // var event = $yuccaHelpers.event.createEvent(scope.widgetId, widgetType, "dataset.de_highlight.group_by_column",
    //   { "key": d.properties[geojsons[activeGeojson].key] });
    // $rootScope.$broadcast('yucca-widget-event', event);
  };

  private updateInfo(show, content) {
    setTimeout(() => {
      this.info.show = show;
      this.info.content = content;
    }, 100);
  }

  downloadData() {
    console.debug("downloadData", this.chartData);
    var csvData = this.prepareDataService.prepareMapCSV(this.groupByColumn.label, this.chartData);
    this.dataService.downloadCSV(csvData, 'data.csv');
    return;
  }

}
