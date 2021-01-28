import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { DatasetColumn } from '../../../model/dataset-column';
import { BaseDatasetWidgetComponent } from '../../datasets/base-dataset-widget/base-dataset-widget.component';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { DebugMessages } from '../../../model/debug-messages';
import { BroadcastService } from '../../../services/broadcast.service';
import { Constants } from '../../../yucca-widgets.constants';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';

@Component({
  selector: 'yucca-sankey-diagram',
  templateUrl: './sankey-diagram.component.html',
  styleUrls: ['./sankey-diagram.component.css']
})

export class SankeyDiagramComponent extends BaseDatasetWidgetComponent {

  @Input() valueColumn: DatasetColumn;
  @Input() nodeColumns: Object;
  @Input() showValues: boolean;
  @Input() labelType: string;
  @Input() euroValue: boolean;
  @Input() formatBigNumber: boolean;
  @Input() render: any;
  @Input() sort: string;

  public isLoading: boolean = false;
  public sankeyData: any;

  constructor(private dataService: DataService, private metadataService: MetadataService, private prepareDataService: PrepareDataService, private cdr: ChangeDetectorRef, protected broadcastService: BroadcastService,) {
    super(dataService, metadataService, prepareDataService, broadcastService)
    this.widgetType = "YuccaSankeyDiagram";
    console.debug("SankeyDiagramComponent constructor")

    broadcastService.getEvents(event).subscribe(eventValue => {
      if (!YuccaWidgetEvent.ignoreEvent(eventValue, this.widgetId)) {
        if (eventValue["detail"].eventType == Constants.EVENT_TYPES.DATASET_CHANGE_VALUE_COLUMN) {
          let value = this.valueColumn;
          
          value["key"] = eventValue["detail"].data.key;
          value["label"] = eventValue["detail"].data.label;
          this.valueColumn = value;
          
          this.prepareData();
        }
      }
    });
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    if (!this.widgetWidth || this.widgetWidth > this.self.nativeElement.clientWidth)
      this.widgetWidth = this.self.nativeElement.clientWidth;

    if (!this.widgetHeight)
      this.widgetHeight = this.self.nativeElement.clientHeight * 2;

    this.cdr.detectChanges();
  }

  protected validateParams(): DebugMessages {
    this.debugMessages = super.validateParams();

    let required = [
      { param: this.valueColumn, type: "object", name: "valueColumn", objectType: ": { key: string; label: string; countingMode: string;" },
      { param: this.nodeColumns, type: "object", name: "nodeColumns" },
    ];

    Array.prototype.push.apply(this.debugMessages.errors, this.dataService.checkParams(required, false));

    let optional = [
      { param: this.showValues, type: "boolean", name: "showValues" },
      { param: this.euroValue, type: "boolean", name: "euroValue" },
      { param: this.formatBigNumber, type: "boolean", name: "formatBigNumber" },
      { param: this.labelType, type: "string", name: "labelType" },
      { param: this.sort, type: "string", name: "sort" },
    ];

    Array.prototype.push.apply(this.debugMessages.warnings, this.dataService.checkParams(optional, true));

    return this.debugMessages;
  }

  protected prepareData(): void {
    console.debug("prepareData");
    this.isLoading = true;

    if (this.allData != null) {
      this.sankeyData = this.prepareDataService.aggregationNodesLinks(this.allData, this.nodeColumns, this.valueColumn.key, this.valueColumn.countingMode, this.render, this.colors.mainChartColor, this.colors.chartColors, this.sort);
      console.debug("sankey fuori", this.sankeyData);
    }

    this.isLoading = false;
  }

}
