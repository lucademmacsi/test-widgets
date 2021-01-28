import { Component, Input, OnInit } from '@angular/core';
import { DebugMessages } from '../../../model/debug-messages';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';
import { BroadcastService } from '../../../services/broadcast.service';
import { Constants } from '../../../yucca-widgets.constants';
import { BaseControlWidgetComponent } from '../base-control-widget/base-control-widget.component';

@Component({
  selector: 'yucca-filter-data-select',
  templateUrl: './filter-data-select.component.html',
  styleUrls: ['./filter-data-select.component.css']
})
export class FilterDataSelectComponent extends BaseControlWidgetComponent {
  @Input() label: string;
  @Input() hint: string;
  @Input() emptyLabel: string;
  @Input() render: string = 'button'; // select, radio, button
  @Input() singleSelection: boolean = true;
  @Input() direction: string;
  @Input() alignItems: string;
  @Input() filters: Array<FilterInput>;

  flexDirection: string;
  flexAlignItems: string;
  index: number;
  //selected: any = {};
  constructor(private broadcastService: BroadcastService) {
    super(broadcastService);
    this.widgetType = "YuccaFilterDataSelect";
    console.debug("FilterDataSelectComponent constructor")
  }

  ngOnInit(): void {
    console.debug("filters", this.filters);
    if (this.render != 'button') {
      this.singleSelection = false;
    }

    this.flexDirection = this.direction == null ? '' : 'yucca-control-direction-' + this.direction;
    this.flexAlignItems = this.alignItems == null ? 'yucca-control-align-items-center' : 'yucca-control-align-items-' + this.alignItems;

    this.widgetId = this.widgetId || this.widgetType + new Date().getTime();

  }

  protected validateParams(): DebugMessages {
    return new DebugMessages();
  }

  public select(index, add): void {
    console.debug("select", index, add);
    let conditions = this.filters[index].condition;
    if (!this.singleSelection && add) {
      this.filters[index].selected = !this.filters[index].selected;
      conditions = this.filters.filter(function (el) {
        return el.selected;
      }).map(function (el) {
        return el.condition;
      }).join(' or ');;
    }
    else {
      for (let i in this.filters) {
        this.filters[i].selected = false;
      }
      this.filters[index].selected = true;
    }
    console.debug("conditions", conditions);
    console.debug("filters", this.filters);
    this.broadcastService.next(new CustomEvent(Constants.YUCCA_WIDGET_EVENT, {
      detail: new YuccaWidgetEvent(this.widgetId,
        this.widgetType,
        Constants.EVENT_TYPES.DATASET_FILTER_ODATA,
        conditions)
    }));
  }
}

type FilterInput = { label: string, condition: string, selected: boolean };    // Specified format
