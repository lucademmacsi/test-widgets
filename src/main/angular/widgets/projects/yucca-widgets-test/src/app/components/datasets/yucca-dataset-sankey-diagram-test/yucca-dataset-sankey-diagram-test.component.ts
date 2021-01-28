import { Component, OnInit } from '@angular/core';
import { ChartColors } from 'dist/yucca-widgets/lib/model/chart-colors';

@Component({
  selector: 'app-yucca-dataset-sankey-diagram-test',
  template: `
    <h1> Dataset Sankey Diagram</h1>
    <yucca-sankey-diagram 
    [tenantcode]='tenantcode'
    [datasetcode]='datasetcode' 
    [widgetTitle]='widgetTitle' 
    [widgetIntro]='widgetIntro'
    [valueColumn]='valueColumn'
    [nodeColumns]='nodeColumns'
    [widgetWidth]='widgetWidth'
    [widgetHeight]='widgetHeight'
    [colors]='colors'
    [showValues]='showValues'
    [labelType]='labelType'
    [euroValue]='euroValue'
    [formatBigNumber]='formatBigNumber'
    [sort]='sort'
    [usertoken]='usertoken' 
    [widgetFooter]='footer' 
    [debug]='debug'>
    </yucca-sankey-diagram>
  `,
  styles: [
  ]
})
export class YuccaDatasetSankeyDiagramTestComponent implements OnInit {

  constructor() { }
  tenantcode: string;
  datasetcode: string;
  valueColumn: any;
  nodeColumns: Object;
  widgetTitle: string;
  widgetIntro: string;
  widgetWidth: number;
  widgetHeight: number;
  colors: ChartColors;
  showValues: boolean;
  labelType: string;
  euroValue: boolean;
  formatBigNumber: boolean;
  usertoken: string;
  sort: string;
  render: any;
  footer: string;
  debug: boolean;

  ngOnInit(): void {
    this.debug = true;
    this.tenantcode = "smartlab";
    this.datasetcode = 'Flussi_turistici_provincia_6054';
    this.valueColumn = { "key": "arrivi_totali", "label": "Arrivi totali", "countingMode": "sum" };
    this.nodeColumns = [{ "key": "anno", "label": "Anno" }, { "key": "provincia", "label": "Provincia" }, { "key": "qualifica", "label": "Qualifica" }];
    // this.widgetWidth = 904;
    // this.widgetHeight = 800;
    this.colors = { "mainChartColor": "#04d442", "chartColors": [] };
    this.widgetTitle = "Flussi turistici per qualifica e per Provincia"
    this.widgetIntro = 'Numero di arrivi totali dei flussi turistici sul territorio piemontese'
    this.usertoken = 'LRulMu0Ie7nC2auw1q_x4MDNLkca'
    this.sort = 'anno'
    this.footer = "footer";
  }
}
