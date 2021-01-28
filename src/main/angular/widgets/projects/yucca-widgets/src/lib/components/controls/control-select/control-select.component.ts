import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { DatasetColumn } from '../../../model/dataset-column';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';
import { BroadcastService } from '../../../services/broadcast.service';
import { Constants } from '../../../yucca-widgets.constants';
import { BaseControlWidgetComponent } from '../base-control-widget/base-control-widget.component';
import { DebugMessages } from '../../../model/debug-messages';



@Component({
  selector: 'yucca-control-select',
  templateUrl: './control-select.component.html',
  styleUrls: ['./control-select.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ControlSelectComponent extends BaseControlWidgetComponent {

  @Input() label: string;
  @Input() hint: string;
  @Input() emptyLabel: string;
  @Input() render: string; // select, radio, button
  @Input() direction: string;
  @Input() alignItems: string;
  @Input() selectedValue: string;
  @Input() groupByColumns: Array<DatasetColumn>;
  @Input() valueColumns: Array<DatasetColumn>;


  // events
  @Output() highlightEvent = new EventEmitter<any>();

  protected widgetType: string;
  //public chartId: string;
  public flexDirection: string;
  public flexAlignItems: string;
  public eventType: string;
  public eventData: string;
  public selectedIndex: number;
  public columns: Array<DatasetColumn>;
  public selected: DatasetColumn = { key: "", label: "", countingMode: "" };

  constructor(private broadcastService: BroadcastService) {
    super(broadcastService);
    this.widgetType = "YuccaControlSelect";
    console.debug("ControlSelectsComponent constructor")
  }

  ngOnInit(): void {

    //this.chartId = "chartId_" + Math.floor((Math.random() * 10000) + 1);

    this.flexDirection = this.direction == null ? '' : 'yucca-control-direction-' + this.direction;
    this.flexAlignItems = this.alignItems == null ? 'yucca-control-align-items-center' : 'yucca-control-align-items-' + this.alignItems;

    this.widgetId = this.widgetId || this.widgetType + new Date().getTime();

    if (this.groupByColumns) {
      this.columns = this.groupByColumns;
      this.eventType = Constants.EVENT_TYPES.DATASET_CHANGE_GROUP_BY_COLUMN;//"dataset.change.group_by_column";
    }
    else if (this.valueColumns) {
      this.columns = this.valueColumns;
      this.eventType = Constants.EVENT_TYPES.DATASET_CHANGE_VALUE_COLUMN; // "dataset.change.value_column";
    }

    this.selected.key = this.selectedValue;

    if (this.selected.key) {
      for (var i = 0; i < this.columns.length; i++) {
        if (this.columns[i].key == this.selected.key) {
          this.selectedIndex = i;
          break;
        }
      }
    }

  }

  protected validateParams(): DebugMessages {
    return new DebugMessages();
  }

  public select(key): void {
    console.debug("select", key);
    this.selected.key = key;
    var eventValue = null;
    for (var i = 0; i < this.columns.length; i++) {
      if (this.columns[i].key == key)
        eventValue = this.columns[i];
    }
    this.broadcastService.next(new CustomEvent(Constants.YUCCA_WIDGET_EVENT, {
      detail: new YuccaWidgetEvent(this.widgetId,
        this.widgetType,
        this.eventType,
        eventValue)
    }));
  }

}
