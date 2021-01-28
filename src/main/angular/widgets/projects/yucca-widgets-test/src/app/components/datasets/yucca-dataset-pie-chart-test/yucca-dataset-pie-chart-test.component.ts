import { Component, OnInit } from '@angular/core';
import { DatasetColumn } from 'dist/yucca-widgets/lib/model/dataset-column';
import { ChartColors } from 'projects/yucca-widgets/src/lib/model/chart-colors';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';


@Component({
  selector: 'app-yucca-dataset-pie-chart-test',
  template: `
    <h1> Dataset Pie Chart</h1>
    <yucca-pie-chart 
    tenantcode='smartlab'
    datasetcode='{{datasetcode}}'
    [valueColumn]='valueColumn'
    [groupByColumn]='groupByColumn'
    [render]='render'
    [colors]='colors'
    filter='{{filter}}'
    [numberFormat]='numberFormat'
    usertoken='{{usertoken}}'
    ></yucca-pie-chart>
  `,
  styles: [
  ]
})
export class YuccaDatasetPieChartTestComponent implements OnInit {

  constructor() { }
  tenantcode: string;
  datasetcode: string;
  valueColumn: any;
  groupByColumn: DatasetColumn;
  render: any;
  labelSunbeamLayout: any;
  colors: ChartColors;
  filter: string;
  numberFormat: NumberFormat;
  usertoken: string;

  ngOnInit(): void {
    this.tenantcode = "smartlab";
    this.colors = { mainChartColor: null, chartColors: ['#422901', '#5c3901', '#754902', '#8f5902', '#a3772f', '#b7955d', '#ccb38b', '#e0d1b8'] };
    this.datasetcode = "NobelPrizeByWinner_9081";
    this.valueColumn = { "key": "id", "label": "id" };
    this.groupByColumn = { "key": "category", "label": "Category", "countingMode": "count" };
    this.render = { "type": "donut", "title": "Nobel Prize", "donutRatio": 0.6 };
    this.labelSunbeamLayout = false;
    this.filter = "(%27IT%27 eq bornCountryCode)";
    this.numberFormat = {
      "decimal": 0,
      "formatBigNumber": false,
      "isEuro": false,
      "lang": null,
      "textAfter": null
    };
    this.usertoken = "LRulMu0Ie7nC2auw1q_x4MDNLkca";
  }

}
