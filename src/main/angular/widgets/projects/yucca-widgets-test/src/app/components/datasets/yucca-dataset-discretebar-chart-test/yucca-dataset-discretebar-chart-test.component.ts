import { Component, OnInit } from '@angular/core';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';

@Component({
  selector: 'app-yucca-dataset-discretebar-chart-test',
  template: `
    <div role="main">
    <h1> Dataset Discrete Barchart</h1>
    <yucca-discretebar-chart datasetcode='{{datasetcode}}' 
    tenantcode='{{tenantcode}}'
    [groupByColumn]='groupByColumn' [serieColumns]='serieColumns' usertoken='{{usertoken}}'
    [colors]='chartColors' [debug]='debug'
    [numberFormat]='numberFormat' 
    [widgetFooter]='footer'
    [showLabels]='showLabels'
    [yAxisTick]='yAxisTick'
    [xAxisTick]='xAxisTick'
    [showGridY]='showGridY'
    [showGridX]='showGridY'
    [subchart]='subchart'
    [debug]='debug'
    ></yucca-discretebar-chart></div>
  `,
  styles: [
  ]
})
export class YuccaDatasetDiscretebarChartTestComponent implements OnInit {

  constructor() { }

  tenantcode: string;
  datasetcode: string;
  serieColumns: any;
  groupByColumn: any;
  rootLabel: string;
  usertoken: string;
  width: number;
  height: number;
  chartColors: any;
  numberFormat: NumberFormat;
  ratio: number;
  footer: string;
  debug: boolean;
  showLabels: boolean;
  yAxisTick: c3.YTickConfiguration;
  xAxisTick: c3.XTickConfiguration;
  showGridY: boolean;
  showGridX: boolean;
  subchart: any;

  ngOnInit(): void {
    this.tenantcode = 'smartlab'
    this.datasetcode = 'Australianforeignstudents20072009_9501'
    this.serieColumns = [{ "key": "Total", "label": "Total", "countingMode": "sum", "yAxis": "1", "type": "area", "color": "#e0e0e0" }, { "key": "GenderMale", "label": "Male", "countingMode": "sum", "yAxis": "1", "type": "bar", "color": "#2da9d9" }, { "key": "GenderFemale", "label": "Female", "countingMode": "sum", "yAxis": "1", "type": "bar", "color": "#b73377" }, { "key": "SudAmerica", "label": "Sud America", "countingMode": "sum", "yAxis": "1", "type": "line", "color": "#ff8585", "strokeWidth": 4, "classed": "solid", "interpolate": "basis" }, { "key": "NorthAmerica", "label": "North America", "countingMode": "sum", "yAxis": "1", "type": "line", "color": "#dc0000", "strokeWidth": 4, "classed": "solid", "interpolate": "basis" }, { "key": "Europe", "label": "Europe", "countingMode": "sum", "yAxis": "1", "type": "line", "color": "#9ade00", "strokeWidth": 4, "classed": "solid", "interpolate": "basis" }, { "key": "Africa", "label": "Africa", "countingMode": "sum", "yAxis": "1", "type": "line", "color": "#333333", "strokeWidth": 4, "classed": "solid", "interpolate": "basis" }, { "key": "Asia", "label": "Asia", "countingMode": "sum", "yAxis": "1", "type": "line", "color": "#fbb32e", "strokeWidth": 4, "classed": "solid", "interpolate": "basis" }];
    //this.serieColumns = [{ "key": "Total", "label": "Total", "countingMode": "sum", "yAxis": "1", "type": "area", "color": "#e0e0e0" }];
    this.groupByColumn = { "key": "Year", "label": "Year" };
    this.footer = "footer";
    this.debug = true;


    this.rootLabel = 'Nobel Prize';
    //main_chart_color='#0066cc'
    //decimal_value='0'
    this.usertoken = 'LRulMu0Ie7nC2auw1q_x4MDNLkca';
    this.width = 800;
    this.height = 400;
    this.chartColors = { chartColors: ['#422901', '#5c3901', '#754902', '#8f5902', '#a3772f', '#b7955d', '#ccb38b', '#e0d1b8'] };
    this.ratio = .5;
    //this.chartColors = { mainChartColor: "#777700" };
    this.numberFormat = new NumberFormat();
    this.numberFormat.isEuro = true;
    this.numberFormat.formatBigNumber = true;
    this.numberFormat.decimal = 2;
    this.numberFormat.lang = null;
    this.numberFormat.textAfter = "%";
    this.showLabels = true;
    this.yAxisTick = { "count": 5 };
    this.xAxisTick = { "count": 6 };

    this.showGridX = true;
    this.showGridY = true;
    this.subchart = {
      show: true,
      size: {
        height: 100
      },
      axis: {
        x: {
          show: false
        }
      }
    };
  }
}
