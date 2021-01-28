import { Component, OnInit } from '@angular/core';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';

@Component({
  selector: 'app-yucca-dataset-choropleth-map-test',
  template: `
  <h1> Dataset Choropleth Map</h1>
  <yucca-choropleth-map
  tenantcode='tenantcode'
  datasetcode='{{datasetcode}}' 
  widgetTitle='{{widgetTitle}}' 
  widgetIntro='{{widgetIntro}}' 
  [valueColumn]='valueColumn'
  [colors]='colors'
  [groupByColumn]='groupByColumn'
  usertoken='{{usertoken}}'
  widgetWidth='{{width}}'
  widgetHeight='{{height}}'
  [numberFormat] ='numberFormat'
  [geojsons] = 'geojsons'

  ></yucca-choropleth-map>
  `,
  styles: [
  ]
})
export class YuccaDatasetChoroplethMapTestComponent implements OnInit {

  constructor() { }
  tenantcode: string;
  datasetcode: string;
  widgetTitle: string;
  widgetIntro: string;
  valueColumn: any;
  groupByColumn: any;
  rootLabel: string;
  usertoken: string;
  width: number;
  height: number;
  colors: any;
  numberFormat: NumberFormat;
  geojsons: any;

  ngOnInit(): void {
    this.tenantcode= "smartlab";
    this.datasetcode = 'Produzione_r_5700'
    this.valueColumn = { "key": "Rifiuti_Tot_kg_ab", "label": "Rifiuti totale in kg", "countingMode": "sum" };
    this.groupByColumn = { "key": "PROVCM", "label": "PROVCM" };
    this.widgetTitle = 'Valore dei rifiuti totali per abitanti a livello Provinciale';
    this.widgetIntro = 'Valori espressi in kg';
    this.geojsons = [{ "url": "/assets/geojson/piemonte_province_geojson.json" }];
    this.usertoken = 'LRulMu0Ie7nC2auw1q_x4MDNLkca';
    // this.width = 500;
    // this.height = 400;
    this.colors = { mainChartColor: "#8f5902" };
  }
}
