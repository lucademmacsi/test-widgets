import { Component, OnInit } from '@angular/core';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';

@Component({
  selector: 'app-yucca-interactions-odata-discrete',
  template: `
  <div class='container'>
    <div>
      <h1> Dataset Discrete Table</h1>
      <div style='display: flex'>
      <div>
        <yucca-filter-data-select 
          [label]='labelOne'
          [widgetId]='eventSourceIdOne'
          [filters]="filtersOne"
          hint='{{hintOne}}'
          render='{{render}}'
          direction='{{direction}}'
          alignItems='{{alignItems}}'
          [singleSelection]='singleSelection'
          
        ></yucca-filter-data-select>
      </div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
      <div>
        <yucca-filter-data-select 
          [label]='labelTwo'
          [widgetId]='eventSourceIdTwo'
          [filters]="filtersTwo"
          hint='{{hintTwo}}'
          render='{{render}}'
          direction='{{direction}}'
          alignItems='{{alignItems}}'
          [singleSelection]='singleSelection'
        ></yucca-filter-data-select>
      </div>
    </div>
    <div>
      <h1> Dataset Discrete Barchart</h1>
      <yucca-discretebar-chart 
      tenantcode='{{tenantcode}}'
      datasetcode='{{datasetcode}}' 
      [groupByColumn]='groupByColumn' [serieColumns]='serieColumns' usertoken='{{usertoken}}'
      [colors]='chartColors' [barRatio]='ratio' widgetTitle='{{widgetTitle}}' widgetSubtitle='{{widgetSubtitle}}'
      [numberFormat]='numberFormat' counting_mode="count" showValues="showValues" 
      show_legend='true' [widgetWidth]='width' [widgetHeight]='height'
      show_x_axis='true'
      show_y_axis='true'
      [debug] = true
      [filter] = 'filter'
      [otherFilterLogic] = 'otherFilterLogic'
      x_axis_label='Provincie'
      y_axis_label='Arrivi Totali'
      [acceptedEventIds]='acceptedEventIds'
      ></yucca-discretebar-chart>
    </div>
  </div>
  
  `,
  styles: [
    '.container{display: flex; flex-direction: column}'
  ]
})
export class YuccaInteractionsOdataDiscreteComponent implements OnInit {

  constructor() { }

  // filter one
  filtersOne: any;
  labelOne: string;
  eventSourceIdOne: string;
  hintOne: string;

  // filter two
  filtersTwo: any;
  labelTwo: string;
  eventSourceIdTwo: string;
  hintTwo: string;

  widgetId: string;
  selectEmptyLabel: string;
  render: string; // select, radio, button
  direction: string;
  alignItems: string;
  selectedValue: string;

  // chart
  widgetTitle: string;
  datasetcode: string;
  tenantcode: string;
  widgetSubtitle: string;
  serieColumns: any;
  groupByColumn: any;
  rootLabel: string;
  usertoken: string;
  width: number;
  height: number;
  chartColors: any;
  numberFormat: NumberFormat;
  ratio: number;
  showValues: boolean;
  singleSelection: boolean;
  filter: string;
  otherFilterLogic: string;
  acceptedEventIds: Array<string>

  ngOnInit(): void {
    /** chart **/
    this.tenantcode = 'regpie'
    this.datasetcode = 'Flussi_turistici_provincia_6054'
    this.widgetTitle = 'Flussi'
    this.widgetSubtitle = 'Grafico a barre'
    //this.filter = "'NO' eq provincia"
    this.otherFilterLogic = "or"
    this.serieColumns = [{ "key": "arrivi_totali", "label": "Arrivi Totali", "countingMode": "sum" }];
    //this.serieColumns = [{ "key": "Total", "label": "Total", "countingMode": "sum", "yAxis": "1", "type": "area", "color": "#e0e0e0" }];
    this.groupByColumn = { "key": "provincia", "label": "Provincia" };
    this.showValues = true;
    //main_chart_color='#0066cc'
    //decimal_value='0'
    this.usertoken = 'LRulMu0Ie7nC2auw1q_x4MDNLkca';
    this.width = 800;
    this.height = 400;
    this.chartColors = { chartColors: ['#422901', '#5c3901', '#754902', '#8f5902', '#a3772f', '#b7955d', '#ccb38b', '#e0d1b8'] };
    this.ratio = .5;
    //this.chartColors = { mainChartColor: "#777700" };
    this.numberFormat = new NumberFormat();
    this.numberFormat.isEuro = false;
    this.numberFormat.formatBigNumber = true;
    this.numberFormat.decimal = 2;
    this.numberFormat.lang = null;
    this.numberFormat.textAfter = null;

    /** filter **/
    this.labelOne = 'Odata filterOne'
    this.eventSourceIdOne = 'filterOne';
    this.filtersOne = [{ label: 'Torino', condition: "'TO' eq provincia" },
    { label: 'Alessandria', condition: "'AL' eq provincia" },
    { label: 'Asti', condition: "'AT' eq provincia" }]
    this.hintOne = 'Scegli anno - questo widget viene ascoltato'

    this.labelTwo = 'Odata filterTwo'
    this.eventSourceIdTwo = 'filterTwo';
    this.filtersTwo = [{ label: 'Cuneo', condition: "'CN' eq provincia" },
    { label: 'Novara', condition: "'NO' eq provincia" },
    { label: 'Vercelli', condition: "'VC' eq provincia" }]
    this.hintOne = 'Scegli anno - questo widget viene ignorato'


    this.selectEmptyLabel = 'Scegli il tipo'
    this.render = 'button'
    this.singleSelection = false;
    this.direction = 'row'
    this.alignItems = 'start'
    this.selectedValue = 'arrivi_totali'
    //this.acceptedEventIds = []

  }

}

