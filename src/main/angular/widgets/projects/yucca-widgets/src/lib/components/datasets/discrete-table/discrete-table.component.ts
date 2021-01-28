import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BaseDatasetWidgetComponent } from '../base-dataset-widget/base-dataset-widget.component';
import { DatasetColumn } from '../../../model/dataset-column';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { BroadcastService } from '../../../services/broadcast.service';
import { Constants } from '../../../yucca-widgets.constants';
import { DebugMessages } from '../../../model/debug-messages';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';

@Component({
  selector: 'yucca-discrete-table',
  templateUrl: './discrete-table.component.html',
  styleUrls: ['./discrete-table.component.css'],
  encapsulation: ViewEncapsulation.None

})

export class DiscreteTableComponent extends BaseDatasetWidgetComponent {

  @Input() groupByColumn: DatasetColumn;
  @Input() serieColumns: Array<DatasetColumn>;

  tableId: string;
  transposeData: any;
  highlightSerieIndex = -1;

  constructor(private dataService: DataService, private metadataService: MetadataService,
    private prepareDataService: PrepareDataService, private broadcastService: BroadcastService) {
    super(dataService, metadataService, prepareDataService, broadcastService);
    this.widgetType = "YuccaDiscreteTable";
    console.debug("DiscreteTableComponent constructor")

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

    let required = [
      { param: this.groupByColumn, type: "object", name: "groupByColumn", objectType: ": { key: string; label: string; countingMode: string;" },
      { param: this.serieColumns, type: "object", name: "serieColumns", objectType: ": [{ key: string; label: string; countingMode: string;]" },
    ];

    Array.prototype.push.apply(this.debugMessages.errors, this.dataService.checkParams(required, false));

    return this.debugMessages;
  }

  protected prepareData(): void {
    console.debug("DiscreteTableComponent prepareData");
    this.isLoading = true;

    this.chartData = this.prepareDataService.aggregationSeriesKeyValue(this.allData,
      this.serieColumns, this.groupByColumn.key, null);
    console.debug("DiscreteTableComponent prepareData - chartData", this.chartData);
    this.isLoading = false;

    this.transposeData = this.prepareDataService.transposeMatrix(this.chartData.data);

  }


  private onHightlightGroupByColumn(groupByColumn: string): void {
    this.highlightSerieIndex = -1;
    for (let i = 0; i < this.serieColumns.length; i++) {
      if (groupByColumn == this.serieColumns[i].label) {
        this.highlightSerieIndex = i;
        break;
      }
    }
  }

  private onDehightlightGroupByColumn(): void {
    this.highlightSerieIndex = -1;
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
}
