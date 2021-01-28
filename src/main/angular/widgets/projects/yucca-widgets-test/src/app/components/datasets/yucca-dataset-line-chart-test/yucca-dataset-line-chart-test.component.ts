import { Component, OnInit } from '@angular/core';
import { DatasetColumn } from 'projects/yucca-widgets/src/lib/model/dataset-column';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';

@Component({
  selector: 'yucca-dataset-line-chart-test',
  template: `
    <h1> Dataset Line Chart</h1>
    <yucca-line-chart
      [tenantcode] = 'tenantcode' 
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
      [debug] = 'debug'
    ></yucca-line-chart>
  `,
  styles: [
  ]
})
export class YuccaDatasetLineChartTestComponent implements OnInit {

  constructor() { }

  datasetcode: string;
  tenantcode: string;
  groupByColumn: DatasetColumn;
  serieColumns: any[];
  usertoken: string;
  groupByDatetime: boolean;

  axisRotated: boolean;
  xAxis: c3.XAxisConfiguration;
  yAxis: c3.YAxisConfiguration;
  showLabels: boolean;
  yAxisTick: c3.YTickConfiguration;
  xAxisTick: c3.XTickConfiguration;
  showGridY: boolean;
  showGridX: boolean;
  subchart: any;
  debug: boolean;
  /*
  
  */
  ngOnInit(): void {
    this.tenantcode = "smartlab";
    this.datasetcode = "ImpreseFemminiliRegistrateAttiveIscritteECessateInProvinciaDiTorino_10526";
    this.groupByColumn = { "key": "Anno", "label": "Anno", "countingMode": "sum" };
    this.serieColumns = [{ "key": "Registrate", "label": "Registrate", "countingMode": "sum", "type": "line", "color": "#641E16", "yAxis": "1" },
    { "key": "Attive", "label": "Attive", "countingMode": "sum", "type": "line", "color": "#2da9d9", "yAxis": "1" },
    { "key": "Iscrizioni", "label": "Iscrizioni", "countingMode": "sum", "type": "line", "color": "#cc0000", "yAxis": "1" },
    { "key": "Cessazioni", "label": "Cessazioni", "countingMode": "sum", "type": "line", "color": "#009900", "yAxis": "1" }];
    this.usertoken = "LRulMu0Ie7nC2auw1q_x4MDNLkca";

    this.axisRotated = false;
    this.showLabels = true;
    this.showGridY = true;
    this.showGridX = true;
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

    // this.numberFormat = new NumberFormat();
    // this.numberFormat = {
    //   "decimal": 0,
    //   "formatBigNumber": true,
    //   "isEuro": false,
    //   "lang": null,
    //   "textAfter": null
    // };

    this.groupByDatetime = false;
    this.debug = true;
  }
}
