import { Component, OnInit } from '@angular/core';
import { DatasetColumn } from 'projects/yucca-widgets/src/lib/model/dataset-column';

@Component({
  selector: 'app-yucca-events-test',
  template: `
    <div class='container'>
      <div>
        <h1>Eventi widget</h1>
        <h2>Multi chart</h2>
        <yucca-multi-chart 
          tenantcode='{{tenantcode}}'
          [datasetcode]='datasetcode'
          [groupByColumn]='groupByColumn'
          [serieColumns]='serieColumns'
          [usertoken]='usertoken'
          [groupByDatetime]='groupByDatetime'
          [debug]='debug'
        ></yucca-multi-chart>
      </div>
      <div>
        <h2> Line Chart</h2>
        <yucca-line-chart
          [tenantcode] = 'tenantcode2' 
          [datasetcode]='datasetcode2'
          [groupByColumn]='groupByColumn2'
          [serieColumns]='serieColumns2'
          [usertoken]='usertoken2'
          [groupByDatetime]='groupByDatetime2'
          [axisRotated]='axisRotated'
          [xAxis]='xAxis'
          [yAxis]='yAxis'
          [xAxisTick]='xAxisTick'
          [yAxisTick]='xAxisTick'
          [showGridX]='showGridX'
          [showGridY]='showGridY'
          [subchart]='subchart'
          [showLabels]='showLabels'
          [debug] = 'debug2'
        ></yucca-line-chart>
      </div>
      <div>
        <h2>DiscreteBar chart</h2>
        <yucca-discretebar-chart
          [tenantcode] = 'tenantcode' 
          [datasetcode]='datasetcode'
          [groupByColumn]='groupByColumn'
          [serieColumns]='serieColumns'
          [usertoken]='usertoken'
          [xAxisTick]='xAxisTick'
          [yAxisTick]='xAxisTick'
          [showGridX]='showGridX'
          [showGridY]='showGridY'
          [showLabels]='showLabels'
          [debug]='debug'
        ></yucca-discretebar-chart>
      </div>
      <div>
        <h2>Discrete Table</h2>
        <yucca-discrete-table
          [tenantcode] = 'tenantcode' 
          [datasetcode]='datasetcode'
          [groupByColumn]='groupByColumn'
          [serieColumns]='serieColumns'
          [usertoken]='usertoken'
          [debug]='debug'
        ></yucca-discrete-table>
      </div>
      <div>
        <h2>Horizontal bar chart</h2>
        <yucca-horizontalmultibar-chart
          [tenantcode] = 'tenantcode' 
          [datasetcode]='datasetcode'
          [groupByColumn]='groupByColumn'
          [serieColumns]='serieColumns'
          [usertoken]='usertoken'
          [xAxisTick]='xAxisTick'
          [yAxisTick]='xAxisTick'
          [showGridX]='showGridX'
          [showGridY]='showGridY'
          [showLabels]='showLabels'
          [debug]='debug'
        ></yucca-horizontalmultibar-chart>
      </div>
      <div>
        <h2>Dataexplorer</h2>
        <yucca-dataexplorer-table
          [tenantcode]='tenantcode'
          datasetcode='{{datasetcode}}'
        ></yucca-dataexplorer-table>
      </div>
      <div>
        <h2>Sankey</h2>
        <yucca-sankey-diagram
          [tenantcode]='tenantcode'
          datasetcode='{{datasetcode}}'
          [valueColumn]='valueColumnSK'
          [nodeColumns]='nodeColumns'
        ></yucca-sankey-diagram>
      </div>



      <div>
        <h2>PieChart</h2>
        <yucca-pie-chart
          [tenantcode] = 'tenantcode' 
          [datasetcode]='datasetcode'
          [groupByColumn]='groupByColumn'
          [usertoken]='usertoken'
          [showLabels]='showLabels'
          [valueColumn]='valueColumn'
          [debug]='debug'
        ></yucca-pie-chart>
      </div>
    </div>
  `,
  styles: [
    '.container{display: flex; flex-direction: column}'
  ]
})
export class YuccaEventsTestComponent implements OnInit {

  constructor() { }

  // MultiChart
  tenantcode: string;
  datasetcode: string;
  groupByColumn: DatasetColumn;
  serieColumns: any[];
  usertoken: string;
  groupByDatetime: boolean;
  debug: boolean;

  // Linechart
  datasetcode2: string;
  tenantcode2: string;
  groupByColumn2: DatasetColumn;
  serieColumns2: any[];
  usertoken2: string;
  groupByDatetime2: boolean;

  //Piechart
  valueColumn: any;

  axisRotated: boolean;
  xAxis: c3.XAxisConfiguration;
  yAxis: c3.YAxisConfiguration;
  showLabels: boolean;
  yAxisTick: c3.YTickConfiguration;
  xAxisTick: c3.XTickConfiguration;
  showGridY: boolean;
  showGridX: boolean;
  subchart: any;
  debug2: boolean;

  // Sankey
  nodeColumns;
  valueColumnSK;

  ngOnInit(): void {
    //MultiChart
    this.tenantcode = "smartlab";
    this.datasetcode = "ImpreseFemminiliRegistrateAttiveIscritteECessateInProvinciaDiTorino_10526";
    this.groupByColumn = { "key": "Anno", "label": "Anno", "countingMode": "sum" };
    this.serieColumns = [{ "key": "Registrate", "label": "Registrate", "countingMode": "sum", "yAxis": "1", "type": "area", "color": "#e0e0e0" }, { "key": "Attive", "label": "Attive", "countingMode": "sum", "type": "bar", "yAxis": "1", "color": "#2da9d9" }, { "key": "Iscrizioni", "label": "Iscrizioni", "countingMode": "sum", "yAxis": "1", "type": "line" }];
    this.usertoken = "LRulMu0Ie7nC2auw1q_x4MDNLkca";
    this.groupByDatetime = false;
    this.debug = true;

    //LineChart
    this.tenantcode2 = "smartlab";
    this.datasetcode2 = "ImpreseFemminiliRegistrateAttiveIscritteECessateInProvinciaDiTorino_10526";
    this.groupByColumn2 = { "key": "Anno", "label": "Anno", "countingMode": "sum" };
    this.serieColumns2 = [{ "key": "Registrate", "label": "Registrate", "countingMode": "sum", "type": "line", "color": "#641E16", "yAxis": "1" },
    { "key": "Attive", "label": "Attive", "countingMode": "sum", "type": "line", "color": "#2da9d9", "yAxis": "1" },
    { "key": "Iscrizioni", "label": "Iscrizioni", "countingMode": "sum", "type": "line", "color": "#cc0000", "yAxis": "1" },
    { "key": "Cessazioni", "label": "Cessazioni", "countingMode": "sum", "type": "line", "color": "#009900", "yAxis": "1" }];
    this.usertoken2 = "LRulMu0Ie7nC2auw1q_x4MDNLkca";
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
    this.groupByDatetime2 = false;
    this.debug2 = true;
    this.valueColumn = { "key": "Anno", "label": "Anno" };

    // Sankey
    this.nodeColumns = [{ "key": "Anno", "label": "Anno" }, { "key": "Provincia", "label": "Provincia" }, { "key": "Trimestre", "label": "Trimestre" }];
    this.valueColumnSK = { "key": "Attive", "label": "Attive", "countingMode": "sum" };
  }

}
