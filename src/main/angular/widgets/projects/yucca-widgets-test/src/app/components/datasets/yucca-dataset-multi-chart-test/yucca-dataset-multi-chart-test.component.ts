import { Component, OnInit } from '@angular/core';
import { DatasetColumn } from 'projects/yucca-widgets/src/lib/model/dataset-column';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';

@Component({
  selector: 'app-yucca-dataset-multi-chart-test',
  template: `
    <h1> Dataset Multichart</h1>
    <yucca-multi-chart 
      tenantcode='{{tenantcode}}'
      [datasetcode]='datasetcode'
      [groupByColumn]='groupByColumn'
      [serieColumns]='serieColumns'
      [usertoken]='usertoken'
      [groupByDatetime]='groupByDatetime'
      [debug]='debug'
    ></yucca-multi-chart>
  `,
  styles: [
  ]
})
export class YuccaDatasetMultiChartTestComponent implements OnInit {

  constructor() { }

  tenantcode: string;
  datasetcode: string;
  groupByColumn: DatasetColumn;
  serieColumns: any[];
  usertoken: string;
  groupByDatetime: boolean;
  debug: boolean;

  ngOnInit(): void {
    this.tenantcode = "smartlab";
    this.datasetcode = "ImpreseFemminiliRegistrateAttiveIscritteECessateInProvinciaDiTorino_10526";
    this.groupByColumn = { "key": "Anno", "label": "Anno", "countingMode": "sum" };
    this.serieColumns = [{ "key": "Registrate", "label": "Registrate", "countingMode": "sum", "yAxis": "1", "type": "area", "color": "#e0e0e0" }, { "key": "Attive", "label": "Attive", "countingMode": "sum", "type": "bar", "yAxis": "1", "color": "#2da9d9" }, { "key": "Iscrizioni", "label": "Iscrizioni", "countingMode": "sum", "yAxis": "1", "type": "line" }];
    this.usertoken = "LRulMu0Ie7nC2auw1q_x4MDNLkca";

    // this.numberFormat = new NumberFormat();
    // this.numberFormat = {
    //   "decimal": 0,
    //   "formatBigNumber": true,
    //   "isEuro": false,
    //   "lang": null,
    //   "textAfter": null
    // };
    this.groupByDatetime = false;
    this.debug =  true;
  }
}
