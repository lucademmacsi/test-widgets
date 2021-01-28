import { Component, Input, ChangeDetectorRef, OnInit } from '@angular/core';
import { DatasetColumn } from '../../../model/dataset-column';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { SafeNumberPipe } from '../../../pipes/safe-number.pipe';
import { DebugMessages } from '../../../model/debug-messages';

import * as c3 from 'c3';
import { BaseDatasetWidgetAxisC3Component } from '../base-dataset-widget-axis-c3/base-dataset-widget-axis-c3.component';
import { BroadcastService } from '../../../services/broadcast.service';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';
import { Constants } from '../../../yucca-widgets.constants';


@Component({
  selector: 'yucca-multi-chart',
  templateUrl: './multi-chart.component.html',
  styleUrls: ['./multi-chart.component.css']
})
export class MultiChartComponent extends BaseDatasetWidgetAxisC3Component implements OnInit {
  @Input() public groupByColumn: DatasetColumn;
  @Input() public groupByDatetime: boolean;
  //@Input() public valueColumn: DatasetColumn;
  @Input() public serieStyles: any;
  @Input() public serieColumns: any;

  constructor(protected dataService: DataService, protected metadataService: MetadataService, protected safeNumberPipe: SafeNumberPipe,
    protected prepareDataService: PrepareDataService, protected broadcastService: BroadcastService) {
    super(dataService, metadataService, prepareDataService, safeNumberPipe, broadcastService);
    this.widgetType = "YuccaMultiChart";
    console.debug("Constructor Multi-chart-component");

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
    this.debugMessages = super.validateParams();

    let required = [
      { param: this.groupByColumn, type: "object", name: "groupByColumn", objectType: ": { key: string; label: string; countingMode: string;" },
      //{ param: this.valueColumn, type: "object", name: "valueColumn", objectType: ": { key: string; label: string; countingMode: string;" },
      { param: this.serieColumns, type: "object", name: "serieColumns", objectType: ": [{ key: string; label: string; countingMode: string;]" },
    ];

    Array.prototype.push.apply(this.debugMessages.errors, this.dataService.checkParams(required, false));

    let optional = [
      { param: this.groupByDatetime, type: "boolean", name: "groupByDatetime" },
    ];

    Array.prototype.push.apply(this.debugMessages.warnings, this.dataService.checkParams(optional, true));

    return this.debugMessages;
  }

  protected prepareData(): void {
    console.debug("prepareData");
    this.isLoading = true;
    var chartDataObj; //Obj to use in C3js

    chartDataObj = this.prepareDataService.aggregationSeriesXY(this.allData, this.groupByColumn, this.serieColumns, this.groupByDatetime);

    console.debug("multibar chartData---DEBUG", this.chartData);

    this.isLoading = false;
    this.chartOptions = {
      bindto: '#' + this.chartId,
      data: {
        columns: chartDataObj["columns"],
        type: chartDataObj["type"],
        types: chartDataObj["types"],
      }, color: {
        pattern: chartDataObj["colors"]
      }, tooltip: {
        format: {
          value: (value, ratio, id) => {
            return this.safeNumberPipe.transform(value, this.numberFormat);
          }
        }
      },
    };

    this.setAxisChartOptions();
    this.chartOptions.axis.x.categories = chartDataObj["xLabels"];

    console.debug("MultiChartComponent chartOptions", this.chartOptions);

    setTimeout(() => this.chart = c3.generate(this.chartOptions));

  }

  downloadData() {
    console.debug("downloadData", this.chartData);
    var csvData = this.prepareDataService.prepareLineCSV(this.groupByColumn.label, this.chartOptions);
    this.dataService.downloadCSV(csvData, 'data.csv');
    return;
  }
}
