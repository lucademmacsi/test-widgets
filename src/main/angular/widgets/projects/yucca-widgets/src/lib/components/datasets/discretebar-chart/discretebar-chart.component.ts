import { Component, EventEmitter, Input, ViewEncapsulation, Output, OnInit } from '@angular/core';
import { DatasetColumn } from '../../../model/dataset-column';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';

import { RenderService } from '../../../services/render.service';
import { SafeNumberPipe } from '../../../pipes/safe-number.pipe';
import { BroadcastService } from '../../../services/broadcast.service';

import * as c3 from 'c3';
import { Constants } from '../../../yucca-widgets.constants';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';
import { BaseDatasetWidgetAxisC3Component } from '../base-dataset-widget-axis-c3/base-dataset-widget-axis-c3.component';
import { DebugMessages } from '../../../model/debug-messages';

@Component({
  selector: 'yucca-discretebar-chart',
  templateUrl: './discretebar-chart.component.html',
  styleUrls: ['./discretebar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DiscretebarChartComponent extends BaseDatasetWidgetAxisC3Component implements OnInit {

  @Input() protected groupByColumn: DatasetColumn;
  @Input() protected serieColumns: Array<DatasetColumn>;
  @Input() protected zerobased: boolean;
  @Input() protected barRatio: number;
  @Input() protected barWidth: number;
  @Input() protected valuesAsCategory: boolean;

  protected chart: c3.ChartAPI;

  // events
  @Output() highlightEvent = new EventEmitter<any>();

  constructor(protected dataService: DataService, protected metadataService: MetadataService,
    protected prepareDataService: PrepareDataService, protected renderService: RenderService,
    protected safeNumberPipe: SafeNumberPipe, protected broadcastService: BroadcastService) {
    super(dataService, metadataService, prepareDataService, safeNumberPipe, broadcastService);
    this.widgetType = "YuccaDiscretebarChart";
    console.debug("DiscreteBarchartComponent constructor");

    broadcastService.getEvents(event).subscribe(eventValue => {
      if (!YuccaWidgetEvent.ignoreEvent(eventValue, this.widgetId)) {
        if (eventValue["detail"].eventType == Constants.EVENT_TYPES.DATASET_CHANGE_GROUP_BY_COLUMN) {
          this.groupByColumn = eventValue["detail"].data;
          this.prepareData();
        }
        else if (eventValue["detail"].eventType == Constants.EVENT_TYPES.DATASET_CHANGE_VALUE_COLUMN && this.serieColumns.length == 1) {
          let value = this.serieColumns;

          value[0]["key"] = eventValue["detail"].data.key;
          value[0]["label"] = eventValue["detail"].data.label;
          this.serieColumns = value;
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
      { param: this.groupByColumn, type: "object", name: "groupByColumn", objectType: ": { key: string; label: string; countingMode: string; }" },
      { param: this.serieColumns, type: "object", name: "serieColumns", objectType: ": [{ key: string; label: string; countingMode: string; }]" },
    ];

    Array.prototype.push.apply(this.debugMessages.errors, this.dataService.checkParams(required, false));

    let optional = [
      { param: this.zerobased, type: "boolean", name: "zerobased" },
      { param: this.barRatio, type: "number", name: "barRatio" },
      { param: this.barWidth, type: "number", name: "barWidth" },
      { param: this.valuesAsCategory, type: "boolean", name: "valuesAsCategory" },
    ];

    Array.prototype.push.apply(this.debugMessages.warnings, this.dataService.checkParams(optional, true));

    return this.debugMessages;
  }

  protected prepareData(): void {
    console.debug("DiscreteBarchartComponent prepareData");
    this.isLoading = true;
    let dataFormat = null;
    if (this.valuesAsCategory)
      dataFormat = "json";

    this.chartData = this.prepareDataService.aggregationSeriesKeyValue(this.allData,
      this.serieColumns, this.groupByColumn.key, dataFormat);
    console.debug("DiscreteBarchartComponent prepareData - chartData", this.chartData);
    const colorCount = this.serieColumns.length == 1 ? this.chartData.data.length : this.serieColumns.length;
    this.safeColors = this.renderService.safeColors(this.colors.mainChartColor, this.colors.chartColors, colorCount);
    console.debug("DiscreteBarchartComponent prepareData - safeColors", this.colors, this.safeColors);
    this.isLoading = false;

    this.chartOptions = {
      bindto: '#' + this.chartId,
      data: {
        type: 'bar'
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
      this.chartOptions.bar["zerobased"] = true

    this.setAxisChartOptions();

    console.debug("DiscreteBarchartComponent chartOptions", this.chartOptions);
    setTimeout(() => this.chart = c3.generate(this.chartOptions));
  }

  downloadData() {
    console.debug("downloadData", this.chartData);
    var csvData = this.prepareDataService.prepareSeriesKeyValue(this.groupByColumn.label, this.chartData);
    this.dataService.downloadCSV(csvData, 'data.csv');
    return;
  }

}
