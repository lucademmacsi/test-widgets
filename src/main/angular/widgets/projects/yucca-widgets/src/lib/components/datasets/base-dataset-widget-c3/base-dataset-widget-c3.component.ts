import { AfterViewChecked, Directive, Input, OnInit } from '@angular/core';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';
import { SafeNumberPipe } from '../../../pipes/safe-number.pipe';
import { BroadcastService } from '../../../services/broadcast.service';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { Constants } from '../../../yucca-widgets.constants';
import { BaseDatasetWidgetComponent } from '../base-dataset-widget/base-dataset-widget.component';

@Directive()
export abstract class BaseDatasetWidgetC3Component extends BaseDatasetWidgetComponent implements OnInit, AfterViewChecked {

  @Input() protected showLabels: boolean;

  protected chartOptions: c3.ChartConfiguration = { data: {} };
  protected chart: c3.ChartAPI;

  constructor(protected dataService: DataService, protected metadataService: MetadataService,
    protected prepareDataService: PrepareDataService, protected safeNumberPipe: SafeNumberPipe,
    protected broadcastService: BroadcastService) {
    super(dataService, metadataService, prepareDataService, broadcastService);

    broadcastService.getEvents(event).subscribe(eventValue => {
      if (!YuccaWidgetEvent.ignoreEvent(eventValue, this.widgetId)) {
        if (eventValue["detail"].eventType == Constants.EVENT_TYPES.DATASET_HIGHLIGHT_GROUP_BY_COLUMN) {
          this.chart.focus(eventValue["detail"].data);
        } else if (eventValue["detail"].eventType == Constants.EVENT_TYPES.DATASET_DEHIGHLIGHT_GROUP_BY_COLUMN) {
          this.chart.revert();
        }
      }
    });
  }

  ngAfterViewChecked(): void {
    this.setEvents();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected abstract prepareData(): void;

  private setEvents(): void {

    const ON_DATASET_CHANGE_GROUP_BY_COLUMN = (d: any) => {
      console.debug("onclickEvent", d);
      this.broadcastService.next(new CustomEvent(Constants.YUCCA_WIDGET_EVENT, {
        detail: new YuccaWidgetEvent(this.widgetId,
          this.widgetType,
          Constants.EVENT_TYPES.DATASET_CHANGE_GROUP_BY_COLUMN,
          d.name)
      }));
    };

    const ON_DATASET_HIGHLIGHT_GROUP_BY_COLUMN = (d: any) => {
      console.debug("onmouseoverEvent", d);
      var columnLabel = d.value ? d.name : d;  //If true event is triggered from data, from legend otherwise.

      this.broadcastService.next(new CustomEvent(Constants.YUCCA_WIDGET_EVENT, {
        detail: new YuccaWidgetEvent(this.widgetId,
          this.widgetType,
          Constants.EVENT_TYPES.DATASET_HIGHLIGHT_GROUP_BY_COLUMN,
          columnLabel)
      }));
    };

    const ON_DATASET_DEHIGHLIGHT_GROUP_BY_COLUMN = (d: any) => {
      console.debug("onmouseoutEvent", d);
      var columnLabel = d.value ? d.name : d;  //If true event is triggered from data, from legend otherwise.

      this.broadcastService.next(new CustomEvent(Constants.YUCCA_WIDGET_EVENT, {
        detail: new YuccaWidgetEvent(this.widgetId,
          this.widgetType,
          Constants.EVENT_TYPES.DATASET_DEHIGHLIGHT_GROUP_BY_COLUMN,
          columnLabel)
      }));
    };

    this.chartOptions.legend = { item: {} };

    this.chartOptions.tooltip = {
      contents: function (d, defaultTitleFormat, defaultValueFormat, color) {
        let content = this.getTooltipContent(d, defaultTitleFormat, defaultValueFormat, color);
        if (content)
          content = content.replace("</table>", "<caption>Info values</caption></table>")
        return content;
      },
    }

    // Events for data
    this.chartOptions.data.onclick = ON_DATASET_CHANGE_GROUP_BY_COLUMN;
    this.chartOptions.data.onmouseover = ON_DATASET_HIGHLIGHT_GROUP_BY_COLUMN;
    this.chartOptions.data.onmouseout = ON_DATASET_DEHIGHLIGHT_GROUP_BY_COLUMN;

    // Events for legend
    this.chartOptions.data.onmouseover = ON_DATASET_HIGHLIGHT_GROUP_BY_COLUMN;
    this.chartOptions.legend.item.onmouseover = ON_DATASET_HIGHLIGHT_GROUP_BY_COLUMN;
    this.chartOptions.legend.item.onmouseout = ON_DATASET_DEHIGHLIGHT_GROUP_BY_COLUMN;
  }
}
