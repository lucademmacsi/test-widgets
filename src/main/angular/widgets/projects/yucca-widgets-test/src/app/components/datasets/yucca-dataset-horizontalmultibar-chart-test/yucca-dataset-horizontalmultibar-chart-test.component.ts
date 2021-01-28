import { Component, OnInit } from '@angular/core';
import { DatasetColumn } from 'projects/yucca-widgets/src/lib/model/dataset-column';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';

@Component({
  selector: 'yucca-dataset-horizontalmultibar-chart-test',
  template: `
    <h1> Dataset HorizontalMultiBarchart</h1>
    <yucca-horizontalmultibar-chart 
      [tenantcode]='tenantcode'
      [datasetcode]='datasetcode'
      [groupByColumn]='groupByColumn'
      [serieColumns]='serieColumns'
      [usertoken]='usertoken'
      [groupByDatetime]='groupByDatetime'
      [axisRotated]='axisRotated'
      [xAxis]='xAxis'
      [yAxis]='yAxis'
      [xAxisTick]='xAxisTick'
      [yAxisTick]='xAxisTick'
      [showGridX]='showGridX'
      [showGridY]='showGridY'
      [subchart]='subchart'
      [showLabels]='showLabels'
      [numberFormat]='numberFormat'></yucca-horizontalmultibar-chart>
  `,
  styles: [
  ]
})
export class YuccaDatasetHorizontalMultiBarTestComponent implements OnInit {

  constructor() { }
  tenantcode: string;
  datasetcode: string;
  groupByColumn: DatasetColumn;
  serieColumns: any[];
  usertoken: string;
  groupByDatetime: boolean;
  numberFormat: NumberFormat;

  axisRotated: boolean;
  xAxis: c3.XAxisConfiguration;
  yAxis: c3.YAxisConfiguration;
  showLabels: boolean;
  yAxisTick: c3.YTickConfiguration;
  xAxisTick: c3.XTickConfiguration;
  showGridY: boolean;
  showGridX: boolean;
  subchart: any;

  ngOnInit(): void {
    this.tenantcode="smartlab";
    this.datasetcode = "ImpreseFemminiliRegistrateAttiveIscritteECessateInProvinciaDiTorino_10526";
    this.groupByColumn = { "key": "Anno", "label": "Anno", "countingMode": "sum" };
    this.serieColumns = [{ "key": "Registrate", "label": "Registrate", "countingMode": "sum", "type": "bar", "yAxis": "1", "color": "#e0e0e0", "side": "L" },
    { "key": "Attive", "label": "Attive", "countingMode": "sum", "type": "bar", "yAxis": "1", "color": "#2da9d9", "side": "R" }];
    this.usertoken = "LRulMu0Ie7nC2auw1q_x4MDNLkca";

    this.numberFormat = new NumberFormat();
    this.numberFormat = {
      "decimal": 0,
      "formatBigNumber": true,
      "isEuro": false,
      "lang": null,
      "textAfter": null
    };
    this.groupByDatetime = false;

    this.axisRotated = false;
    this.showLabels = true;
    this.showGridY = true;
    this.showGridX = true;
    this.subchart = {
      show: false,
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