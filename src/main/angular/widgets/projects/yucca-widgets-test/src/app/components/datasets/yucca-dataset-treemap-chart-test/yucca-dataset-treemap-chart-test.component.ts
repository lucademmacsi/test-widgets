import { Component, OnInit } from '@angular/core';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';
import { BoxRadius } from 'projects/yucca-widgets/src/lib/model/box-radius';

@Component({
  selector: 'app-yucca-dataset-treemap-chart-test',
  template: `
    <h1> Dataset Treemap Chart</h1>
    <div style=' border: solid 1px #ddd;'>
    <yucca-treemap-chart 
    [tenantcode]='tenantcode'
    datasetcode='{{datasetcode}}' 
    widgetTitle='{{widgetTitle}}' 
    widgetSubtitle='{{widgetSubtitle}}' 
    [valueColumn]='valueColumn'
    [valueColumn2]='valueColumn2'
    [treeColumns]='treeColumns'
    usertoken='{{usertoken}}'
    widgetWidth='{{width}}'
    widgetHeight='{{height}}'
    [colors]='chartColors'
    [numberFormat] ='numberFormat'
    [boxRadius] = 'boxRadius'

    ></yucca-treemap-chart>
    </div>
  `,
  styles: [
  ]
})
export class YuccaDatasetTreemapChartTestComponent implements OnInit {

  constructor() { }
  tenantcode: string;
  datasetcode: string;
  widgetIntro: string;
  widgetTitle: string;
  widgetSubtitle: string;
  valueColumn: any;
  valueColumn2: any;
  treeColumns: any;
  rootLabel: string;
  usertoken: string;
  width: number;
  height: number;
  chartColors: any;
  numberFormat: NumberFormat;
  boxRadius: BoxRadius;

  ngOnInit(): void {
    this.tenantcode="smartlab";
    this.datasetcode = 'StudentiPiemontesiAnnoScolastico20192020_14606'
    this.widgetTitle = 'Studenti piemontesi'
    this.widgetSubtitle = 'Anni 2010-2020'
    this.valueColumn = { key: "Numeroscuole", "label": "Numero scuole", "countingMode": "sum", };
    this.valueColumn2 = { key: "Numtotaleiscritti","label":"Numero totale iscritti", "countingMode":"sum", };
    this.treeColumns = [ { key: "Provincia","label":"Provincia"},{"key":"Gradoscolastico","label":"Grado scolastico"},{"key":"Annoscolastico","label":"Anno scolastico"},{"key":"Comune","label":"Comune" }, ];
    // this.rootLabel = 'Grafico';
    //main_chart_color='#0066cc'
    //decimal_value='0'
    this.usertoken = 'LRulMu0Ie7nC2auw1q_x4MDNLkca';
    // this.width = 1097;
    // this.height = 500;
    this.chartColors = { mainChartColor: "#36a0e2" };
    this.numberFormat = new NumberFormat();
    this.numberFormat.isEuro = false;
    this.numberFormat.formatBigNumber = false;
    this.numberFormat.decimal = 0;
    this.numberFormat.lang = null;
    // this.numberFormat.textAfter = "";
    // this.boxRadius = new BoxRadius();
    // this.boxRadius.rx = 4;
    // this.boxRadius.ry = 4;
  }

  }
