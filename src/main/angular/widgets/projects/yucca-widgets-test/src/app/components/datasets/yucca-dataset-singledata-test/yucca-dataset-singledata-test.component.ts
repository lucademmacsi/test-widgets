import { Component, OnInit } from '@angular/core';
import { DatasetColumn } from 'projects/yucca-widgets/src/lib/model/dataset-column';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';
import { SingleDatasetColumn } from 'projects/yucca-widgets/src/lib/model/single-dataset-column';

@Component({
  selector: 'yucca-dataset-singledata-test',
  template: `
    <h1> Dataset Single Data Chart</h1>
    <yucca-singledata 
      [tenantcode]='tenantcode'
      [datasetcode]='datasetcode'
      [valueColumn]='valueColumn'
      [growAnimation]='growAnimation'
      [usertoken]='usertoken'
      [numberFormat]='numberFormat'
    ></yucca-singledata>
  `,
  styles: [
    '::ng-deep  .yucca-singledata-value {color: #0098BB; font-size: 30px; font-weight: bold; font-stretch: expanded;}',
    '::ng-deep  .yucca-singledata-label {color: black; font-size: 12px; font-weight: bold; font-stretch: expanded;}'
  ]
})
export class YuccaDatasetSingleDataTestComponent implements OnInit {

  constructor() { }
  tenantcode: string;
  datasetcode: string;
  usertoken: string;
  valueColumn: SingleDatasetColumn;
  numberFormat: NumberFormat;
  growAnimation: boolean;
  /*
  
  */
  ngOnInit(): void {
    this.tenantcode="smartlab";
    this.datasetcode = "Australianforeignstudents20072009_9501";
    this.valueColumn = {"key": "Year", "label": "Year", "countingMode": "count", "growAnimation" : true };
    this.usertoken = "LRulMu0Ie7nC2auw1q_x4MDNLkca";
    
    this.numberFormat = new NumberFormat();
    this.numberFormat = { "decimal": 0, 
                          "formatBigNumber": true, 
                          "isEuro": false, 
                          "lang": null, 
                          "textAfter": null};
    this.growAnimation = true;
  }
}
