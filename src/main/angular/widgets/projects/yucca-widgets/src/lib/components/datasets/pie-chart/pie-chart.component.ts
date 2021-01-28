import { Component, Input, OnInit } from '@angular/core';
import { SafeNumberPipe } from '../../../pipes/safe-number.pipe';
import { RenderService } from '../../../services/render.service';
import { DatasetColumn } from '../../../model/dataset-column';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { DebugMessages } from '../../../model/debug-messages';

import * as c3 from 'c3';
import * as d3 from 'd3';
import { BroadcastService } from '../../../services/broadcast.service';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';
import { Constants } from '../../../yucca-widgets.constants';
import { PiechartRender } from '../../../model/piechart-render';
import { BaseDatasetWidgetC3Component } from '../base-dataset-widget-c3/base-dataset-widget-c3.component';

@Component({
  selector: 'yucca-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent extends BaseDatasetWidgetC3Component implements OnInit {
  @Input() public valueColumn: any;
  @Input() public groupByColumn: DatasetColumn;
  @Input() public render: PiechartRender;
  @Input() protected legend: c3.LegendOptions;


  private donutRadius: number;
  private donutRenderedCheck: boolean = false;
  public numberFormat = this.numberFormat;


  constructor(protected dataService: DataService, protected metadataService: MetadataService, protected prepareDataService: PrepareDataService,
    protected safeNumberPipe: SafeNumberPipe, protected renderSercvice: RenderService, protected broadcastService: BroadcastService) {
    super(dataService, metadataService, prepareDataService, safeNumberPipe, broadcastService);
    this.widgetType = "YuccaPieChart";
    console.debug("PieChartComponent constructor")
    broadcastService.getEvents(event).subscribe(eventValue => {
      if (!YuccaWidgetEvent.ignoreEvent(eventValue, this.widgetId)) {
        if (eventValue["detail"].eventType == Constants.EVENT_TYPES.DATASET_CHANGE_GROUP_BY_COLUMN) {
          this.groupByColumn = eventValue["detail"].data;
          
          this.prepareData();
        }
      }
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected validateParams(): DebugMessages {
    this.debugMessages = super.validateParams();

    let required = [
      { param: this.groupByColumn, type: "object", name: "groupByColumn", objectType: ": { key: string; label: string; countingMode: string;" },
      { param: this.valueColumn, type: "object", name: "valueColumn", objectType: ": { key: string; label: string; countingMode: string;" },
    ];

    Array.prototype.push.apply(this.debugMessages.errors, this.dataService.checkParams(required, false));

    let optional = [
      { param: this.render, type: "object", name: "render", objectType: ": type: c3.ChartType; donutRatio: number; title: string; showLabel: boolean = false; showValue: boolean = true; showPercent: boolean = false;" },
    ];

    Array.prototype.push.apply(this.debugMessages.warnings, this.dataService.checkParams(optional, true));

    return this.debugMessages;
  }

  protected prepareData(): void {
    console.debug("PieChartComponent prepareData -  chartId:", this.chartId);
    this.isLoading = true;
    this.chartData = this.prepareDataService.aggregationSeriesKeyValue(this.allData,
      [this.groupByColumn], this.groupByColumn.key, null);
    console.debug("PieChartComponent prepareData - chartData", this.chartData);

    this.isLoading = false;

    var typeChart: c3.ChartType;

    this.generateChart();
  }

  private generateChart(): void {
    if (!this.render)
      this.render = new PiechartRender();

    var labelFormat: c3.LabelOptionsWithThreshold = {
      format: (value, ratio, id) => {
        let label = "";
        if (this.render.showLabel === true)
          label += id + " ";
        if (this.render.showValue !== false)
          label += this.safeNumberPipe.transform(value, this.numberFormat);
        if (this.render.showPercent === true)
          label += ((ratio) * 100).toFixed(0) + ' %'
        return label;
      }
    }

    this.chartOptions = {
      bindto: '#' + this.chartId,
      onrendered: () => {
        if (!this.donutRenderedCheck && this.render.type == "donut") {
          this.donutRenderedCheck = true;
          let element = d3.select('#' + this.chartId + ' .c3-chart-arcs').node() as Element;
          let width = element.getBoundingClientRect().width; // Get the pie diameter
          this.donutRadius = width / 2 * this.render.donutRatio;  // Calculate the radius from the ratio
          this.generateChart();
        }
      },
      data: {
        columns: this.chartData.data,
        type: this.render.type/*,
        onclick: function (d, i) { console.debug("onclick", d, i); },
        onmouseover: function (d, i) { console.debug("onmouseover", d, i); },
        onmouseout: function (d, i) { console.debug("onmouseout", d, i); }*/
      }, color: {
        pattern: this.renderSercvice.safeColors(this.colors.mainChartColor, this.colors.chartColors, this.chartData.data.length)
      }

    };

    if (this.render.type == "donut") {
      this.chartOptions.donut = {
        width: this.donutRadius,
        label: labelFormat,
        title: this.render ? this.render.title : ""
      };
    } else if (this.render.type == "pie") {
      this.chartOptions.pie = {
        label: labelFormat,
      }
    }
    if (this.legend)
      this.chartOptions.legend = this.legend;

    console.debug("PieChartComponent chartOptions", this.chartOptions);
    setTimeout(() => this.chart = c3.generate(this.chartOptions));
  };

  downloadData() {
    console.debug("downloadData", this.chartData);
    var csvData = this.prepareDataService.preparePieCSV(this.groupByColumn.label, this.chartData);
    this.dataService.downloadCSV(csvData, 'data.csv');
    return;
  }
}
