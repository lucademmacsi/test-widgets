import { Component, OnInit } from '@angular/core';
import { NumberFormat } from 'projects/yucca-widgets/src/lib/model/number-format';

@Component({
  selector: 'app-yucca-dataset-exploredata-table-test',
  template: `
  <h1> Dataset Exploredata Table</h1>
  <div class="widget-container">
  <yucca-dataexplorer-table
    [tenantcode]='tenantcode'
    datasetcode='{{datasetcode}}'
    filter='{{filter}}'
    usertoken='{{usertoken}}'
    [evt_filtertext]='evt_filtertext'
    [evt_highlight_groupbycolumn]='evt_highlight_groupbycolumn'
    [columnsToShow]='columnsToShow'
    widgetTitle='{{title}}'
    widgetSubtitle='{{subtitle}}'
    widgetDescription='{{description}}'
  ></yucca-dataexplorer-table></div>
  `,
  styles: [`.widget-container{width: 800px;}`
  ]
})
export class YuccaDatasetExploredataTableTestComponent implements OnInit {

  constructor() { }
  tenantcode: string;
  datasetcode: string;
  filter: string;
  usertoken: string;
  evt_filtertext: string;
  evt_highlight_groupbycolumn: string;
  columnsToShow: string[];
  title: string;
  subtitle: string;
  description: string;

  ngOnInit(): void {
    this.tenantcode="smartlab";
    this.datasetcode = 'Flussi_turistici_provincia_6054';
    this.filter = '';
    this.usertoken = "";
    this.evt_filtertext = '{"enabled":true}';
    this.evt_highlight_groupbycolumn = '{"enabled":true}';
    this.columnsToShow = ["anno", "provincia", "qualifica", "settore", "arrivi_stranieri", "presenza_totali"];
    this.title = "Titolo di prova";
    this.subtitle = "Sottotitolo di prova";
    this.description = "descrizione di prova"
  }

}
