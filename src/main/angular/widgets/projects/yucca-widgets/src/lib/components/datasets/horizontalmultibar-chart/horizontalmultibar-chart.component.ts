import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { DatasetColumn } from '../../../model/dataset-column';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { BroadcastService } from '../../../services/broadcast.service';
import { RenderService } from '../../../services/render.service';
import { DebugMessages } from '../../../model/debug-messages';

import * as c3 from 'c3';

import { SafeNumberPipe } from '../../../pipes/safe-number.pipe';
import { BaseDatasetWidgetAxisC3Component } from '../base-dataset-widget-axis-c3/base-dataset-widget-axis-c3.component';

@Component({
  selector: 'yucca-horizontalmultibar-chart',
  templateUrl: './horizontalmultibar-chart.component.html',
  styleUrls: ['./horizontalmultibar-chart.component.css']
})

export class HorizontalMultiBarChartComponent extends BaseDatasetWidgetAxisC3Component implements OnInit {
  @Input() public groupByDatetime: boolean;
  @Input() public serieStyles: any;

  @Input() protected groupByColumn: DatasetColumn;
  @Input() protected serieColumns: Array<DatasetColumn>;
  @Input() protected zerobased: boolean;
  @Input() protected barRatio: number;
  @Input() protected barWidth: number;
  @Input() protected valuesAsCategory: boolean;

  constructor(protected dataService: DataService,
    protected metadataService: MetadataService,
    protected prepareDataService: PrepareDataService,
    protected broadcastService: BroadcastService,
    protected safeNumberPipe: SafeNumberPipe,
    protected renderService: RenderService) {
    super(dataService, metadataService, prepareDataService, safeNumberPipe, broadcastService);
    this.widgetType = "YuccaHorizontalMultiBarChart";
    console.debug("Constructor horizontalmultibar-chart-component");
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected validateParams(): DebugMessages {
    this.debugMessages = super.validateParams();

    let required = [
      { param: this.groupByColumn, type: "object", name: "groupByColumn", objectType: ": { key: string; label: string; countingMode: string;" },
      { param: this.serieColumns, type: "object", name: "serieColumns", objectType: ": [{ key: string; label: string; countingMode: string;]" },
    ];

    Array.prototype.push.apply(this.debugMessages.errors, this.dataService.checkParams(required, false));

    let optional = [
      { param: this.zerobased, type: "boolean", name: "zerobased" },
      { param: this.barRatio, type: "number", name: "barRatio" },
      { param: this.barWidth, type: "number", name: "barWidth" },
      { param: this.valuesAsCategory, type: "boolean", name: "valuesAsCategory" },
      { param: this.groupByDatetime, type: "boolean", name: "groupByDatetime" },
    ];

    Array.prototype.push.apply(this.debugMessages.warnings, this.dataService.checkParams(optional, true));

    return this.debugMessages;
  }

  protected prepareData(): void {

    console.debug("prepareData");

    this.isLoading = true;
    let dataFormat = null;

    if (this.valuesAsCategory)
      dataFormat = "json";

    this.chartData = this.prepareDataService.aggregationSeriesHorizontalBar(this.allData, this.groupByColumn, this.serieColumns, this.groupByDatetime);

    const colorCount = this.serieColumns.length == 1 ? this.chartData.data.length : this.serieColumns.length;
    this.safeColors = this.renderService.safeColors(this.colors.mainChartColor, this.colors.chartColors, colorCount);
    this.isLoading = false;

    console.debug("horizontal multibar chartData---DEBUG", this.chartData);
    console.debug("horizontal multibar colors,safeColors---DEUBUG", this.colors, this.safeColors);

    this.isLoading = false;
    this.axisRotated = true;

    this.chartOptions = {
      bindto: '#' + this.chartId,
      data: {
        x: 'x',
        type: 'bar',
        groups: [this.chartData.group]
      },
      bar: {},
    };
    
    if (this.valuesAsCategory) {
      this.chartOptions.data["json"] = this.chartData.data;
      this.chartOptions.data["keys"] = {
        x: 'label',
        value: ["value"],
      };
      this.chartOptions.data["color"] = (color, d) => { return typeof d["index"] !== undefined ? this.safeColors[d["index"]] : "#f00"; };
      this.chartOptions.legend = { show: false }
    } else {
      this.chartOptions["color"] = { pattern: this.safeColors }
      this.chartOptions.data["columns"] = this.chartData.data;
    }

    if (this.barRatio) {
      this.chartOptions.bar["width"] = { ratio: this.barRatio }
    }
    else if (this.barWidth)
      this.chartOptions.bar["width"] = this.barWidth;

    if (this.zerobased)
      this.chartOptions.bar["zerobased"] = true;

    this.setAxisChartOptions();

    // To show X axis correctly (not negative)
    // We use chartOptions.axis.y for the x axis because is rotated
    if (this.yAxisTick) {
      this.chartOptions.axis.y.tick = this.yAxisTick
    };
    const format = (value) => {
      if (value < 0) value = -value;
      return this.safeNumberPipe.transform(value, this.numberFormat);
    }
    this.chartOptions.axis.y = { tick: { format: format } };

    console.debug("HorizontalMultiBarChartComponent chartOptions", this.chartOptions);

    setTimeout(() => this.chart = c3.generate(this.chartOptions));

  }

  downloadData() {
    console.debug("downloadData", this.chartData);
    var csvData = this.prepareDataService.prepareHorizontalCSV(this.groupByColumn.label, this.chartData);
    this.dataService.downloadCSV(csvData, 'data.csv');
    return;
  }
}
