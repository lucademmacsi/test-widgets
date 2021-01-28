import { Component, OnInit, Input, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { BaseDatasetWidgetComponent } from '../base-dataset-widget/base-dataset-widget.component';
import { DatasetColumn } from '../../../model/dataset-column';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { DebugMessages } from '../../../model/debug-messages';

import { NumberFormat } from '../../../model/number-format';
import { RenderService } from '../../../services/render.service';
import { BoxRadius } from '../../../model/box-radius';
import { BroadcastService } from '../../../services/broadcast.service';
import { Constants } from '../../../yucca-widgets.constants';
import { YuccaWidgetEvent } from '../../../model/yucca-widget-event';


@Component({
  selector: 'yucca-treemap-chart',
  templateUrl: './treemap-chart.component.html',
  styleUrls: ['./treemap-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class TreemapChartComponent extends BaseDatasetWidgetComponent {

  @Input() valueColumn: DatasetColumn;
  @Input() treeColumns: Array<DatasetColumn>;
  @Input() rootLabel: string;
  @Input() valueColumn2: DatasetColumn;
  @Input() valueFormat: NumberFormat;
  @Input() valueFormat2: NumberFormat;
  @Input() boxRadius: BoxRadius;


  constructor(private dataService: DataService, private metadataService: MetadataService,
    private prepareDataService: PrepareDataService, private renderService: RenderService, private cdr: ChangeDetectorRef, protected broadcastService: BroadcastService) {
    super(dataService, metadataService, prepareDataService, broadcastService)
    this.widgetType = "YuccaTreemapChart";
    console.debug("TreemapChartComponent constructor")

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
      this.widgetWidth = this.self.nativeElement.clientWidth - 10;

    if (!this.widgetHeight)
      this.widgetHeight = this.self.nativeElement.clientHeight * 3;

    this.cdr.detectChanges();
  }

  protected validateParams(): DebugMessages {
    this.debugMessages = super.validateParams();

    let required = [
      { param: this.valueColumn, type: "object", name: "valueColumn", objectType: ": { key: string; label: string; countingMode: string;" },
      { param: this.valueColumn2, type: "object", name: "valueColumn", objectType: ": { key: string; label: string; countingMode: string;" },
      { param: this.treeColumns, type: "object", name: "treeColumns", objectType: ": [{ key: string; label: string; countingMode: string;]" },
    ];

    Array.prototype.push.apply(this.debugMessages.errors, this.dataService.checkParams(required, false));

    let optional = [
      { param: this.valueFormat, type: "object", name: "valueFormat", objectType: ": decimal: number; isEuro: boolean; formatBigNumber: boolean; textAfter: string; lang: string" },
      { param: this.valueFormat2, type: "object", name: "valueFormat", objectType: ": decimal: number; isEuro: boolean; formatBigNumber: boolean; textAfter: string; lang: string" },
      { param: this.boxRadius, type: "object", name: "boxRadius", objectType: ": rx: number; ry: number;" },
      { param: this.rootLabel, type: "string", name: "rootLabel" },
    ];

    Array.prototype.push.apply(this.debugMessages.warnings, this.dataService.checkParams(optional, true));

    return this.debugMessages;
  }

  protected prepareData(): void {
    console.debug("TreemapChartComponent prepareData");
    this.isLoading = true;

    this.chartData = this.prepareDataService.aggregationTree(this.rootLabel, this.allData, this.treeColumns, this.valueColumn,
      this.valueColumn2, this.valueFormat, this.valueFormat2);

    this.safeColors = this.renderService.safeColors(this.colors.mainChartColor, this.colors.chartColors, this.chartData.children.length);
    console.debug("TreemapChartComponent safeColors", this.safeColors);
    for (let i = 0; i < this.chartData.children.length; i++) {
      this.chartData.children[i].color = this.safeColors[i];
    }
    console.debug("TreemapChartComponent prepareData result", this.chartData);

    this.isLoading = false;

  }

}
