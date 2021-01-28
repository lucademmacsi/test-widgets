import { Directive, Input, OnInit } from '@angular/core';
import { SafeNumberPipe } from '../../../pipes/safe-number.pipe';
import { BroadcastService } from '../../../services/broadcast.service';
import { DataService } from '../../../services/data.service';
import { MetadataService } from '../../../services/metadata.service';
import { PrepareDataService } from '../../../services/prepare-data.service';
import { BaseDatasetWidgetC3Component } from '../base-dataset-widget-c3/base-dataset-widget-c3.component';

@Directive()
export abstract class BaseDatasetWidgetAxisC3Component extends BaseDatasetWidgetC3Component implements OnInit {

  @Input() protected axisRotated: boolean;
  @Input() protected xAxis: c3.XAxisConfiguration;
  @Input() protected yAxis: c3.YAxisConfiguration;
  @Input() protected xAxisTick: c3.XTickConfiguration;
  @Input() protected yAxisTick: c3.YTickConfiguration;
  @Input() protected showGridX: boolean;
  @Input() protected showGridY: boolean;
  @Input() protected subchart: c3.SubchartOptions;

  constructor(protected dataService: DataService, protected metadataService: MetadataService,
    protected prepareDataService: PrepareDataService, protected safeNumberPipe: SafeNumberPipe, protected broadcastService: BroadcastService) {
    super(dataService, metadataService, prepareDataService, safeNumberPipe, broadcastService);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  protected abstract prepareData(): void;

  protected setAxisChartOptions(): void {
    this.chartOptions.axis = {};
    this.chartOptions.axis = {
      x: {
        type: 'category',
      },
      y: {
      }
    }

    this.chartOptions.grid = {
      x: {
        show: false
      },
      y: {
        show: false
      }
    }

    this.chartOptions.subchart = {
      show: false
    }

    if (this.axisRotated) {
      this.chartOptions.axis.rotated = true;
    }

    if (this.xAxis) {
      this.chartOptions.axis.x = this.xAxis;
      if (!this.chartOptions.axis.x.type) {
        this.chartOptions.axis.x["type"] = "category";
      }
    }

    if (this.yAxis) {
      this.chartOptions.axis.y = this.yAxis;
    }

    if (this.xAxisTick) {
      this.chartOptions.axis.x.tick = this.xAxisTick;
    }

    if (this.yAxisTick) {
      this.chartOptions.axis.y.tick = this.yAxisTick;
      const format = (value) => {
        return this.safeNumberPipe.transform(value, this.numberFormat);
      }
      this.chartOptions.axis.y.tick.format = format;
    }

    if (this.showGridX) {
      this.chartOptions.grid.x.show = true;
    }

    if (this.showGridY) {
      this.chartOptions.grid.y.show = true;
    }

    if (this.subchart) {
      this.chartOptions.subchart = this.subchart;
    }
  }
}
