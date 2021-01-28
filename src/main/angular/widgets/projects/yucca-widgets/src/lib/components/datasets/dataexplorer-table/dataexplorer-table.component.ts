import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BroadcastService } from '../../../services/broadcast.service';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { BaseDatasetWidgetComponent } from '../base-dataset-widget/base-dataset-widget.component';
import { DebugMessages } from '../../../model/debug-messages';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';
import { Constants } from '../../../yucca-widgets.constants';

@Component({
  selector: 'yucca-dataexplorer-table',
  templateUrl: './dataexplorer-table.component.html',
  styleUrls: ['./dataexplorer-table.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DataexplorerTableComponent extends BaseDatasetWidgetComponent {

  @Input() evt_filtertext: string;
  @Input() evt_highlight_groupbycolumn: string;
  @Input() columnsToShow: string[];

  @Input() widgetDescription: string;

  tableId: string;

  data;
  dataView; // Current data shown in the table
  columns: any[];
  currentPage: number = 0;
  pageSize: number = 10; // How many rows per page
  totalPages: number;
  orderByColumn = { column: "", reverse: false };
  highlightedColumn: string = null;

  metadata;

  constructor(private dataService: DataService, private metadataService: MetadataService,
    private broadcastService: BroadcastService, private prepareDataService: PrepareDataService) {
    super(dataService, metadataService, prepareDataService, broadcastService);
    this.widgetType = "YuccaDataexplorerTable";
    console.debug("DataexplorerTableComponent constructor");

    broadcastService.getEvents(event).subscribe(eventValue => {
      if (!YuccaWidgetEvent.ignoreEvent(eventValue, this.widgetId)) {
        if (eventValue["detail"].eventType == Constants.EVENT_TYPES.DATASET_HIGHLIGHT_GROUP_BY_COLUMN) {
          this.onHightlightGroupByColumn(eventValue["detail"].data);
        } else if (eventValue["detail"].eventType == Constants.EVENT_TYPES.DATASET_DEHIGHLIGHT_GROUP_BY_COLUMN) {
          this.onDehightlightGroupByColumn();
        }
      }
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.tableId = "discreteTable_" + Math.floor((Math.random() * 10000) + 1);
  }

  protected validateParams(): DebugMessages {
    this.debugMessages = super.validateParams();

    let optional = [
      { param: this.evt_filtertext, type: "string", name: "evt_filtertext" },
      { param: this.evt_highlight_groupbycolumn, type: "string", name: "evt_highlight_groupbycolumn" },
      { param: this.columnsToShow, type: "object", name: "columnsToShow", objectType: ": Array" },
      { param: this.widgetDescription, type: "string", name: "widgetDescription" },
    ];

    Array.prototype.push.apply(this.debugMessages.warnings, this.dataService.checkParams(optional, true));

    return this.debugMessages;
  }

  protected prepareData(): void {
    this.data = this.allData;

    this.goToPage(this.currentPage);
    this.totalPages = Math.ceil(this.data.length / this.pageSize);
    this.metadataService.getDatasetMetadata(this.tenantcode, this.datasetcode, this.usertoken).subscribe((datasetMetadata) => {
      console.debug("DatasetMetadata", datasetMetadata);
      this.metadata = datasetMetadata;
      this.columns = this.metadata.dataset.columns;

      // removes columns not present in columnsToShow
      if (this.columnsToShow) {
        var columnsTmp: any[] = [];
        for (var i = 0; i < this.columns.length; i++) {
          if (this.columnsToShow.indexOf(this.columns[i].name) >= 0) {
            columnsTmp.push(this.columns[i]);
          }
        }
        this.columns = columnsTmp;
      }

      this.isLoading = false;
    });
  }

  public goToPage(pageNumber: number): void {
    if (pageNumber < 0) return;
    if (pageNumber > (this.data.length / this.pageSize)) return;
    this.currentPage = pageNumber;
    this.updateDataView();
  }

  protected updateDataView(): void {
    this.dataView = this.data.slice((this.currentPage * this.pageSize), (this.currentPage * this.pageSize + this.pageSize));
  }

  private onHightlightGroupByColumn(groupByColumn: string): void {
    this.highlightedColumn = groupByColumn;
  }

  private onDehightlightGroupByColumn(): void {
    this.highlightedColumn = null;
  }

  public onMouseover(serie) {
    var d = serie;

    console.debug("onmouseoverEvent", d);
    var columnLabel = d.value ? d.name : d;  //If true event is triggered from data, from legend otherwise.

    this.broadcastService.next(new CustomEvent(Constants.YUCCA_WIDGET_EVENT, {
      detail: new YuccaWidgetEvent(this.widgetId,
        this.widgetType,
        Constants.EVENT_TYPES.DATASET_HIGHLIGHT_GROUP_BY_COLUMN,
        columnLabel)
    }));
  }

  public onMouseout(serie) {
    var d = serie;

    console.debug("onmouseoutEvent", d);
    var columnLabel = d.value ? d.name : d;  //If true event is triggered from data, from legend otherwise.

    this.broadcastService.next(new CustomEvent(Constants.YUCCA_WIDGET_EVENT, {
      detail: new YuccaWidgetEvent(this.widgetId,
        this.widgetType,
        Constants.EVENT_TYPES.DATASET_DEHIGHLIGHT_GROUP_BY_COLUMN,
        columnLabel)
    }));
  };

  public orderBy(column: string) {
    var columnMetadata: any[] = (this.metadata.dataset.columns.filter((col: any) => { return col['name'] == column }));
    var columnType: string = columnMetadata[0].datatype;

    const updateSort = () => {
      this.updateDataView();
      this.orderByColumn["column"] = column;
      this.orderByColumn["reverse"] = !this.orderByColumn["reverse"];
    }

    const stringOrderer = () => {
      if (this.orderByColumn["column"] == column && (this.orderByColumn["reverse"] == true)) {
        var s1: string;
        var s2: string;
        this.data = this.data.sort((a, b) => {
          a[column] ? s1 = a[column].toString() : s1 = "";
          b[column] ? s2 = b[column].toString() : s2 = "";

          return s1.localeCompare(s2);
        });
      } else {
        this.data = this.data.sort((a, b) => {
          a[column] ? s1 = a[column].toString() : s1 = "";
          b[column] ? s2 = b[column].toString() : s2 = "";
          return s2.localeCompare(s1);
        });
      }
      updateSort();
    }

    const numberOrderer = () => {
      if (this.orderByColumn["column"] == column && (this.orderByColumn["reverse"] == true)) {
        this.data = this.data.sort((a, b) => b[column] - a[column]);
      } else {
        this.data = this.data.sort((a, b) => a[column] - b[column]);
      }
      updateSort();
    }

    const dateOrderer = () => {
      if (this.orderByColumn["column"] == column && (this.orderByColumn["reverse"] == true)) {
        var d1: number;
        var d2: number;
        this.data = this.data.sort((a, b) => {
          // String   /Date(-1237939200000+0120) => we take the first number to order
          a[column] ? d1 = a[column].toString().substring(a[column].toString().indexOf("(") + 1, a[column].toString().indexOf("+")) : d1 = 0;
          b[column] ? d2 = b[column].toString().substring(b[column].toString().indexOf("(") + 1, b[column].toString().indexOf("+")) : d2 = 0;

          return d2 - d1;
        });
      } else {
        this.data = this.data.sort((a, b) => {
          a[column] ? d1 = a[column].toString().substring(a[column].toString().indexOf("(") + 1, a[column].toString().indexOf("+")) : d1 = 0;
          b[column] ? d2 = b[column].toString().substring(b[column].toString().indexOf("(") + 1, b[column].toString().indexOf("+")) : d2 = 0;

          return d1 - d2;
        });
      }
      updateSort();
    }

    switch (columnType) {
      case "boolean":
      case "string":
        stringOrderer();
        break;

      case "int":
      case "long":
      case "double":
      case "float":
        numberOrderer();
        break;

      case "dateTime":
        dateOrderer();
        break;

      default:
        console.log("COLUMN ORDERER ERROR no columnType case found =>", columnType);
    }
  }
}
