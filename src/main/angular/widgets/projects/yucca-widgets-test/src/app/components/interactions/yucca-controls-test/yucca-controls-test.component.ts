import { Component, OnInit } from '@angular/core';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';
import { ChartColors } from 'dist/yucca-widgets/lib/model/chart-colors';
import { BoxRadius } from 'projects/yucca-widgets/src/lib/model/box-radius';

@Component({
  selector: 'app-yucca-interactions-controls-test',
  template: `
  <div class='container'>
    <h1> Dataset Discrete Table</h1>
    <yucca-filter-data-select 
      label='{{alabel}}'
      hint='{{ahint}}'
      [filters]="afilters"
      render='{{arender}}'
      direction='{{adirection}}'
      alignItems='{{aalignItems}}'
      [singleSelection]='asingleSelection'
      
    ></yucca-filter-data-select>
    <div>
      <h1> Dataset Discrete Table</h1>
      <yucca-control-select 
        label='{{label}}'
        hint='{{hint}}'
        [valueColumns]="valueColumn"
        render='{{render}}'
        direction='{{direction}}'
        alignItems='{{alignItems}}'
        selectedValue='{{selectedValue}}'
      ></yucca-control-select>
    </div>
    <div>
      <h1> Dataset Choropleth Map</h1>
      <yucca-choropleth-map
      tenantcode='tenantcode'
      datasetcode='{{datasetcode}}' 
      widgetTitle='{{widgetTitle}}' 
      widgetIntro='{{widgetIntro}}' 
      [valueColumn]='cvalueColumn'
      [colors]='colors'
      [groupByColumn]='groupByColumn'
      usertoken='{{usertoken}}'
      widgetWidth='{{width}}'
      widgetHeight='{{height}}'
      [numberFormat] ='numberFormat'
      [geojsons] = 'geojsons'    
      ></yucca-choropleth-map>
    </div>
  </div>
  
  `,
  styles: [
    '.container{display: flex; flex-direction: column}'
  ]
})
export class YuccaInteractionsControlsTestComponent implements OnInit {

  constructor() { }

  afilters: any;
  awidgetId: string;
  alabel: string;
  ahint: string;
  aselectEmptyLabel: string;
  arender: string; // select, radio, button
  adirection: string;
  aalignItems: string;
  asingleSelection: boolean;

  // filter
  valueColumn: any;
  filterGroupByColumn: any;
  widgetId: string;
  label: string;
  hint: string;
  selectEmptyLabel: string;
  render: string; // select, radio, button
  direction: string;
  alignItems: string;
  selectedValue: string;

  // chart
  tenantcode: string;
  datasetcode: string;
  widgetTitle: string;
  widgetIntro: string;
  cvalueColumn: any;
  groupByColumn: any;
  rootLabel: string;
  usertoken: string;
  width: number;
  height: number;
  colors: any;
  numberFormat: NumberFormat;
  geojsons: any;

  ngOnInit(): void {
    // odata
    this.afilters = [{ label: 'Torino', condition: "'TO' eq provincia" },
    { label: 'Alessandria', condition: "'AL' eq provincia" },
    { label: 'Asti', condition: "'AT' eq provincia" }]
    this.alabel = 'Odata'
    this.ahint = 'Scegli anno'
    this.aselectEmptyLabel = 'Scegli il tipo'
    this.arender = 'button'
    this.asingleSelection = false;
    this.adirection = 'row'
    this.aalignItems = 'start'

    /** chart **/
    this.tenantcode= "smartlab";
    this.datasetcode = 'Produzione_r_5700'
    this.cvalueColumn = { "key": "Rifiuti_Tot_kg_ab", "label": "Rifiuti totale in kg", "countingMode": "sum" };
    this.groupByColumn = { "key": "PROVCM", "label": "PROVCM" };
    this.widgetTitle = 'Valore dei rifiuti totali per abitanti a livello Provinciale';
    this.widgetIntro = 'Valori espressi in kg';
    this.geojsons = [{ "url": "/assets/geojson/piemonte_province_geojson.json" }];
    this.usertoken = 'LRulMu0Ie7nC2auw1q_x4MDNLkca';
    this.colors = { mainChartColor: "#8f5902" };

    /** filter **/
    this.valueColumn = [{ key: 'Numeroscuole', label: 'Numero scuole' }, { key: 'Rifiuti_Tot_kg_ab', label: 'Rifiuti totale in kg' }]
    this.label = 'Arrivi'
    this.hint = 'Flussi turistici per qualifica e per Provincia'
    this.selectEmptyLabel = 'Scegli il tipo'
    this.render = 'button'
    this.direction = 'row'
    this.alignItems = 'start'
    this.selectedValue = 'Rifiuti_Tot_kg_ab'

  }

}
