import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef, Injectable, Directive } from '@angular/core';
import { OdataResponse } from '../../../model/odata-response';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { NumberFormat } from '../../../model/number-format';
import { ChartColors } from '../../../model/chart-colors';
import { DebugMessages } from '../../../model/debug-messages';
import { Constants } from '../../../yucca-widgets.constants';
import { BroadcastService } from '../../../services/broadcast.service';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';


@Directive()
export abstract class BaseDatasetWidgetComponent implements OnInit {

  //@Input() parent: HTMLElement;
  @Input() parent: HTMLElement;

  @ViewChild("self") self: ElementRef;
  @ViewChild("header") header: ElementRef;

  // public perchè vanno viste dal template
  @Input() public widgetId: string;
  @Input() public widgetTitle: string;
  @Input() public widgetSubtitle: string;
  @Input() public widgetIntro: string;
  @Input() public widgetWidth: number;
  @Input() public widgetHeight: number;
  @Input() public widgetFooter: string;

  @Input() public debug: boolean;

  @Input() protected usertoken: string;
  @Input() protected apiDataUrl: string;
  @Input() protected cache: boolean;

  // valutare se raggrupparli
  @Input() protected filter: string;
  @Input() protected otherFilterLogic: string;
  @Input() protected orderby: string;
  @Input() protected top: number = 1000;
  @Input() protected skip: number = 1;

  // Number Format
  @Input() public numberFormat: NumberFormat;

  // Colors
  @Input() public colors: ChartColors;

  @Input() protected datasetcode: string;
  @Input() protected tenantcode: string;

  // event
  @Input() acceptedEventIds: Array<string>;

  protected widgetType: string;
  public debugMessages: DebugMessages = new DebugMessages();
  public isLoading: boolean = false;
  protected columnDataTypeMap: any = {};
  protected allData: Array<any> = [];
  public chartData: any = null;

  protected otherFilter: string;

  protected safeColors: Array<string> = [];

  public infoMessage: string;

  chartId: string;

  constructor(protected dataServiceParent: DataService, protected metadataServiceParent: MetadataService,
    protected prepareDataServiceParent: PrepareDataService, protected broadcastServiceParent: BroadcastService) {
    console.debug("BaseDatasetWidgetComponent constructor");
    broadcastServiceParent.getEvents(event).subscribe(eventValue => {
      if (!YuccaWidgetEvent.ignoreEvent(eventValue, this.widgetId, this.acceptedEventIds)) {
        if (eventValue["detail"].eventType == Constants.EVENT_TYPES.DATASET_FILTER_ODATA) {
          this.otherFilter = eventValue["detail"].data;
          this.loadData();
        }
      }
    });
  }

  ngOnInit(): void {

    this.widgetId = this.widgetId || this.widgetType + new Date().getTime();

    if (!this.colors)
      this.colors = new ChartColors(Constants.DEFAULT_CHART_COLOR);

    this.debugMessages = this.validateParams();

    if (this.debugMessages.errors.length == 0) {
      this.loadData();
    }

    this.chartId = "chartId_" + Math.floor((Math.random() * 10000) + 1);
  }

  protected validateParams(): DebugMessages {
    let required = [
      { param: this.datasetcode, type: "string", name: "datasetcode" },
      { param: this.tenantcode, type: "string", name: "tenantcode" }
    ];

    Array.prototype.push.apply(this.debugMessages.errors, this.dataServiceParent.checkParams(required, false));

    let optional = [
      { param: this.widgetId, type: "string", name: "widgetId" },
      { param: this.widgetTitle, type: "string", name: "widgetTitle" },
      { param: this.widgetSubtitle, type: "string", name: "widgetSubtitle" },
      { param: this.widgetIntro, type: "string", name: "widgetIntro" },
      { param: this.widgetWidth, type: "number", name: "widgetWidth" },
      { param: this.widgetHeight, type: "number", name: "widgetHeight" },
      { param: this.widgetFooter, type: "string", name: "widgetFooter" },
      { param: this.usertoken, type: "string", name: "usertoken" },
      { param: this.apiDataUrl, type: "string", name: "apiDataUrl" },
      { param: this.cache, type: "boolean", name: "cache" },
      { param: this.filter, type: "string", name: "filter" },
      { param: this.orderby, type: "string", name: "orderby" },
      { param: this.top, type: "number", name: "top" },
      { param: this.skip, type: "number", name: "skip" },
      { param: this.numberFormat, type: "object", name: "numberFormat", objectType: ": { decimal: number; isEuro: boolean; formatBigNumber: boolean; textAfter: string; lang: string }" },
      { param: this.colors, type: "object", name: "colors", objectType: ": { mainChartColor: string; chartColors: Array<string>; }" },
    ];

    Array.prototype.push.apply(this.debugMessages.warnings, this.dataServiceParent.checkParams(optional, true));

    return this.debugMessages;
  };
  protected abstract prepareData(): void;

  protected loadData(): void {
    this.isLoading = true;
    this.chartData = null;
    this.allData = [];
    this.infoMessage = null;

    const startLoading = new Date().getTime();
    let filter = this.filter;
    if (this.otherFilter) {
      if (this.otherFilterLogic && this.filter)
        filter = "(" + this.filter + ") " + this.otherFilterLogic + " (" + this.otherFilter + ")";
      else
        filter = this.otherFilter;
    }

    this.dataServiceParent.getDataEntities(this.datasetcode, this.usertoken, filter, 0, 1, null, this.apiDataUrl,
      this.cache).subscribe((firstData: OdataResponse) => {
        console.debug("BaseDatasetWidgetComponent loadData", firstData);
        const maxData = parseInt(firstData.d.__count) > 10000 ? 10000 : parseInt(firstData.d.__count);
        if (maxData > 0) {
          this.storeColumnDataType(firstData.d.results[0]);
          this.dataServiceParent.getMultipleDataEnties(this.datasetcode, this.usertoken, filter, this.orderby, maxData, this.apiDataUrl, this.cache).
            subscribe((result: OdataResponse[]) => {
              console.debug("BaseDatasetWidgetComponent loadData", result);
              for (var i = 0; i < result.length; i++)
                this.allData = this.allData.concat(result[i].d.results);
              this.debugMessages.addInfo("Data : <strong>" + this.allData.length + " rows</strong>");
              const startPrepare = new Date().getTime();
              this.prepareData();
              this.debugMessages.addInfo("Data prepare time: <strong>" + (new Date().getTime() - startPrepare) + " ms</strong>");
            }, function (result) {
              this.isLoading = false;
              console.error("BaseDatasetWidgetComponent Load data error", result);
              this.debugMessages.push("Load data error " + result);
            });
        }
        else {
          this.infoMessage = "No data";
          //this.debugMessages.errors.push("No data"); // capire come gestire meglio l'errore
          this.isLoading = false;
        }
        this.debugMessages.addInfo("Data loading time: <strong>" + (new Date().getTime() - startLoading) + " ms</strong>");

      }, (result) => {
        this.isLoading = false;
        this.infoMessage = "Unexpected error";
        console.error("BaseDatasetWidgetComponent Load data error", result);
        this.debugMessages.addInfo("Data loading time: <strong>" + (new Date().getTime() - startLoading) + " ms</strong>");
        this.debugMessages.addError("Load data error (detail in console log) " + result);
      });
  }


  // private functions
  private storeColumnDataType(d: any): void {
    for (let k in d) {
      if (d.hasOwnProperty(k) && k != '__metadata') {
        this.columnDataTypeMap[k] = typeof d[k];
      }
    }
    console.debug("columnDataTypeMap ", this.columnDataTypeMap);
  }
}
