import { Injectable } from '@angular/core';
import { DatasetColumn } from '../model/dataset-column';
import { SafeNumberPipe } from '../pipes/safe-number.pipe';
import { NumberFormat } from '../model/number-format';

@Injectable({
  providedIn: 'root'
})
export class PrepareDataService {
  constructor(private safeNumberPipe: SafeNumberPipe) { }

  public aggregationSerieKeyValue(rows: Array<any>, valueColumn: DatasetColumn, groupByColumn: string,
    chartColors: Array<string>, mainChartColor: string, seriesDescriptionColumn: DatasetColumn) {
    console.debug("aggregationSeriesKeyValue", valueColumn, groupByColumn);
    //					[{
    //					"key": "Arrivi totali",
    //					"values": [
    //					{
    //					"key": "BI",
    //					"label": "BI",
    //					"value": 962010,
    //					"color": "#0b001a"
    //					},
    //					{
    //					"key": "NO",
    //					"label": "NO",
    //					"value": 5233298,
    //					"color": "#250059"
    //					},
    //					...

    let dataMap = {};
    let descriptionsMap = {};
    let sliceCount = 0;


    let max = {};
    let min = {};

    for (let j = 0; j < rows.length; j++) {
      if (!dataMap[rows[j][groupByColumn]]) {
        dataMap[rows[j][groupByColumn]] = [0];
        if (seriesDescriptionColumn)
          descriptionsMap[rows[j][groupByColumn]] = rows[j][seriesDescriptionColumn.key];
        sliceCount++;
      }
      if (valueColumn.countingMode == 'sum')
        dataMap[rows[j][groupByColumn]][0] += parseFloat(rows[j][valueColumn.key]);
      else if (valueColumn.countingMode == 'max') {
        if (!max[valueColumn.key])
          max[valueColumn.key] = parseFloat(rows[j][valueColumn.key]);
        else if (max[valueColumn.key] > parseFloat(rows[j][valueColumn.key]))
          max[valueColumn.key] = parseFloat(rows[j][valueColumn.key]);
        dataMap[rows[j][groupByColumn]][0] = parseFloat(rows[j][valueColumn.key]);
      }
      else if (valueColumn.countingMode == 'min') {
        if (!min[valueColumn.key])
          min[valueColumn.key] = parseFloat(rows[j][valueColumn.key]);
        else if (min[valueColumn.key] > parseFloat(rows[j][valueColumn.key]))
          min[valueColumn.key] = parseFloat(rows[j][valueColumn.key]);
        dataMap[rows[j][groupByColumn]][0] = parseFloat(rows[j][valueColumn.key]);
      }
      else
        dataMap[rows[j][groupByColumn]][0]++;
    }

    console.debug("dentro", dataMap);
    const colors = ["#ff0000", "00ff00"];
    console.debug("colors", colors);
    let chartData = new Array();
    let serie: any = Object.assign({}, valueColumn);
    serie.realKey = serie.key;
    serie.key = serie.label;
    serie.values = new Array();
    chartData.push(serie);
    let sIndex = 0;

    for (var key in dataMap) {
      if (dataMap.hasOwnProperty(key)) {
        var d: any = { "key": key, "label": key, "value": dataMap[key][0] };
        if (colors && colors.length > 0 && typeof serie.color == 'undefined') {
          d.color = colors[sIndex];
        }
        if (seriesDescriptionColumn) {
          d.description = descriptionsMap[key];
        }

        chartData[0].values.push(d);
        sIndex++;
      }
    }
    return chartData;
  }

  public aggregationSeriesKeyValue(rows: Array<any>, valueColumns: Array<DatasetColumn>, groupByColumn: string, format: string = "columns") {
    console.debug("PrepareDataService - aggregationSeriesKeyValue", valueColumns, groupByColumn);

    // [
    //   ['serie1', 30, 200, 100, 400, 150, 250],
    //   ['serie2', 130, 100, 140, 200, 150, 50]
    // ]



    let dataMap = {};
    let chartData = [];
    let chartSeries = [];
    if (!valueColumns || valueColumns == null || valueColumns.length == 0 || !valueColumns[0]) {
      valueColumns = [];
      valueColumns.push(new DatasetColumn());
    }

    let max = {};
    let min = {};

    for (let j = 0; j < rows.length; j++) {
      if (!dataMap[rows[j][groupByColumn]]) {
        dataMap[rows[j][groupByColumn]] = Array(valueColumns.length).fill(0);
      }
      for (let i = 0; i < valueColumns.length; i++) {
        if (valueColumns[i].countingMode == 'sum')
          dataMap[rows[j][groupByColumn]][i] += parseFloat(rows[j][valueColumns[i].key]);
        else if (valueColumns[i].countingMode == 'max') {
          if (!max[valueColumns[i].key])
            max[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
          else if (max[valueColumns[i].key] > parseFloat(rows[j][valueColumns[i].key]))
            max[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
          dataMap[rows[j][groupByColumn]][i] = parseFloat(rows[j][valueColumns[i].key]);
        }
        else if (valueColumns[i].countingMode == 'min') {
          if (!min[valueColumns[i].key])
            min[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
          else if (min[valueColumns[i].key] > parseFloat(rows[j][valueColumns[i].key]))
            min[valueColumns[i].key] = parseFloat(rows[j][valueColumns[i].key]);
          dataMap[rows[j][groupByColumn]][i] = parseFloat(rows[j][valueColumns[i].key]);
        } else {
          dataMap[rows[j][groupByColumn]][i]++;
        }
      }
    }

    if (valueColumns.length > 1) {
      for (let k = 0; k < valueColumns.length; k++) {

        let serie = [valueColumns[k].label];
        chartSeries = [];
        Object.keys(dataMap).forEach(e => {
          serie.push(dataMap[e][k]);
          chartSeries.push(e);
        }
        );

        chartData.push(serie);
      }
    }
    else {
      chartSeries.push(valueColumns[0].label);
      if (format == "json") {
        Object.keys(dataMap).forEach(e => {
          chartData.push({ "label": e, "value": dataMap[e][0] });
        }
        );
      }
      else {
        Object.keys(dataMap).forEach(e => {
          chartData.push([e, dataMap[e][0]]);
        }
        );
      }




    }

    console.debug("PrepareDataService - aggregationSeriesKeyValue chartData", chartData);

    return {
      data: chartData, series: chartSeries
    }
  }


  public mongoDate2millis(dateIn) {
    var time = null;
    if (dateIn) {
      var parts = /\/Date\((-?\d+)([+-]\d{4})?.*/.exec(dateIn);

      if (parts[2] == undefined)
        parts[2] = "0";
      var p = parseInt(parts[2]);
      time = new Date(<any>parts[1] - (p * 60000));
    }
    return time;
  }

  public aggregationSeriesXY(rows: any, xColumn: DatasetColumn, serieColumns: any, isDate: boolean) {

    console.debug("ROWS---DEBUG", rows);
    console.debug("xCOLUMN---DEBUG", xColumn);
    console.debug("SERIE_COLUMNS---DEBUG", serieColumns);
    console.debug("isDate---DEBUG", isDate);
    var chartData = new Array();
    for (var s = 0; s < serieColumns.length; s++) {
      var dataMap = {};
      var serie = serieColumns[s];
      serie.values = new Array();

      for (var i = 0; i < rows.length; i++) {
        if (!dataMap[rows[i][xColumn.key]]) {
          dataMap[rows[i][xColumn.key]] = 0;
        }
        if (serieColumns[s].countingMode == 'sum')
          dataMap[rows[i][xColumn.key]] += parseFloat(rows[i][serieColumns[s].key]);
        else
          dataMap[rows[i][xColumn.key]]++;
      }

      for (var key in dataMap) {
        if (dataMap.hasOwnProperty(key)) {
          var x;
          if (isDate)
            x = this.mongoDate2millis(key);
          else
            x = parseFloat(key);

          var d = { "x": x, "y": dataMap[key], "shape": null };

          if (serie.shape)
            d.shape = serie.shape;
          serie.values.push(d);
        }
      }

      console.debug("linechart serie", serie);
      serie.key = serie.label;
      chartData.push(serie);
    }

    // Data obj to use in C3js
    var dataObj = {
      "columns": [],
      "type": "bar",
      "types": {

      },
      "xLabels": [],
      "colors": []
    }

    for (let d of chartData) {
      let line = new Array();
      line.push(d["key"]);
      for (let v of d.values) {
        line.push(v["y"]);
      }
      dataObj["types"][d["key"]] = d["type"];
      dataObj["columns"].push(line);
      dataObj["colors"].push(d["color"]);
    }
    console.debug(dataObj);


    // Assigning x axis labels
    for (let v of chartData[0]["values"]) {
      dataObj["xLabels"].push(v["x"]);
    }
    console.debug("DATAOBJ---DEBUG", dataObj);

    return dataObj;
  }

  public aggregationTree(rootLabel: string, rows: Array<any>, columns: Array<DatasetColumn>, valueColumn: DatasetColumn,
    valueColumn2: DatasetColumn, valueFormat: NumberFormat, valueFormat2: NumberFormat) {
    console.debug("PrepareData - aggregationTree", columns);
    let tree: any = { "name": rootLabel, column: "", absolutedepth: 0, children: new Array(), valueLabel: valueColumn.label };
    if (!valueColumn.countingMode)
      valueColumn.countingMode = 'count';

    if (valueColumn2) {
      tree.valueLabel2 = valueColumn2.label;
      if (!valueColumn2.countingMode)
        valueColumn2.countingMode = 'count'

    }
    for (let r = 0; r < rows.length; r++) {
      let keys = new Array();

      for (var c = 0; c < columns.length; c++) {
        keys.push({ k: rows[r][columns[c].key], c: columns[c], d: c });
      }
      let value = 1;
      if (valueColumn.countingMode == 'sum')
        value = rows[r][valueColumn.key];

      let value2: number;
      if (valueColumn2) {
        value2 = 1;
        if (valueColumn2.countingMode == 'sum')
          value2 = rows[r][valueColumn2.key];
      }
      tree = this.initTreeNode(tree, keys, value, value2, valueFormat, valueFormat2);
    }
    return tree;
  };

  private initTreeNode(tree: any, keys: Array<any>, value: number, value2: number, valueFormat: NumberFormat, valueFormat2: NumberFormat) {
    let cur = tree;
    for (let k = 0; k < keys.length; k++) {
      let key = keys[k].k;
      let col = keys[k].c.key;
      let label = keys[k].c.label;
      let direction = keys[k].c.direction ? keys[k].c.direction : "none";

      let childIndex = this.hasNameInArray(cur.children, key);
      if (childIndex == -1) {
        if (k == keys.length - 1) {
          if (value2)
            childIndex = cur.children.push({ "name": "" + key, "column": col, "label": label, "direction": direction, "absolutedepth": k + 1, "value": 0, "value2": 0 }) - 1;
          else
            childIndex = cur.children.push({ "name": "" + key, "column": col, "label": label, "direction": direction, "absolutedepth": k + 1, "value": 0 }) - 1;
        }
        else
          childIndex = cur.children.push({ "name": "" + key, "column": col, "label": label, "direction": direction, "absolutedepth": k + 1, children: new Array() }) - 1;
      }
      cur = cur.children[childIndex];

    };

    cur.value += typeof (value) != "number" ? parseFloat(value) : value;
    if (valueFormat)
      cur.formattedValue = this.safeNumberPipe.transform(cur.value, valueFormat);
    else
      cur.formattedValue = cur.value;
    if (value2) {
      cur.value2 += typeof (value2) != "number" ? parseFloat(value2) : value2;
      if (typeof valueFormat2 != 'undefined' && valueFormat2)
        cur.formattedValue = this.safeNumberPipe.transform(cur.value2, valueFormat2);
      else
        cur.formattedValue2 = cur.value2;

    }

    return tree;
  }

  private hasNameInArray(arr: Array<any>, name: string) {
    let result = -1;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].name == name) {
        result = i;
        break;
      }
    }
    return result;
  }

  public aggregationNodesLinks(rows: any, columns: any, columnValue: any, countingMode: any, render: any, mainColor: string, colors: string[], sort: string) {
    console.debug("aggregationNodesLinks");
    var uniqueNode = {};
    var nodes = [];
    var matrix = [];
    var links = [];
    var linksDictionary = [];
    var nodeIndex = 0;

    if (sort) {
      rows = this.sortByName(rows, sort)
    }

    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < columns.length; j++) {
        if (typeof (matrix[columns[j].key]) == "undefined")
          matrix[columns[j].key] = [];
        if (typeof (uniqueNode[columns[j].key + "_" + rows[i][columns[j].key]]) == "undefined") {
          var c = mainColor;
          if (colors && colors[j])
            c = colors[j];
          var node = { "name": "" + rows[i][columns[j].key], "index": nodeIndex, "label": "" + rows[i][columns[j].key], "color": c, "fades": true };
          console.debug("render", columns[j] + "_" + node.name);
          if (typeof render != 'undefined' && typeof render[columns[j].key + "_" + node.name] != 'undefined') {
            var r = render[columns[j].key + "_" + node.name];
            if (typeof r.label != undefined)
              node.label = r.label;
            if (typeof r.color != undefined)
              node.color = r.color;
            if (r.fades == "true")
              node.fades = true;
            else
              node.fades = false;
          }
          nodes.push(node);
          matrix[columns[j].key].push({ "node": rows[i][columns[j].key], "index": nodeIndex });
          nodeIndex++;
        }
        uniqueNode[columns[j].key + "_" + rows[i][columns[j].key]] = 0;
      }
    }
    console.debug("nodes", nodes);
    console.debug("matrix", matrix);

    for (var i = 0; i < rows.length; i++) {
      for (var j = 0; j < columns.length; j++) {
        if (j < columns.length - 1) {
          var key = columns[j].key;
          for (var k = 0; k < matrix[key].length; k++) {
            var source = matrix[key][k];
            for (var m = 0; m < matrix[columns[j + 1].key].length; m++) {
              var target = matrix[columns[j + 1].key][m];
              if (typeof (linksDictionary[key + "|" + source.node + "|" + target.node]) == "undefined")
                linksDictionary[key + "|" + source.node + "|" + target.node] = { "source": source.index, "target": target.index, "value": 0 };
              if (rows[i][columns[j].key] == source.node && rows[i][columns[j + 1].key] == target.node) {
                var add = countingMode == 'sum' ? parseFloat(rows[i][columnValue]) : 1;
                linksDictionary[key + "|" + source.node + "|" + target.node].value += add;
              }
            }
          }

        }

      }

    }

    console.debug("linksDictionary", linksDictionary);
    var i = 0;
    for (var newKey in linksDictionary) {
      if (linksDictionary[newKey].value != 0) {
        linksDictionary[newKey].id = i;
        links.push(linksDictionary[newKey]);
        i++
      }
    }

    return { "nodes": nodes, "links": links };
  }

  public aggregationKeyValue(rows: Array<any>, valueColumn: DatasetColumn, groupByColumn: string, countingMode: any/*, chartColors: any, mainChartColor: string*/) {  // TODO manage colors
    var seriesData = this.aggregationSeriesKeyValue(rows, [valueColumn], groupByColumn, countingMode/*, chartColors, mainChartColor*/);
    return seriesData;
  }

  public transposeMatrix(a: any) {
    return Object.keys(a[0]).map(function (c) {
      return a.map(function (r) { return r[c]; });
    });
  }

  private sortByName(items, sort) {
    let result = items.sort((a, b) => {
      a = a[sort];
      b = b[sort];

      return a > b ? 1 : -1;
    });

    return result;
  }

  public aggregationSeriesHorizontalBar(rows: any, xColumn: DatasetColumn, serieColumns: any, isDate: boolean) {

    /* Sample data for horizontal bar
    this.serieColumns = [{ "key": "Registrate", "label": "Registrate", "countingMode": "sum", "type": "bar", "yAxis": "1", "color": "#e0e0e0", "side" : "L" }, 
                         { "key": "Attive",     "label": "Attive",     "countingMode": "sum", "type": "bar", "yAxis": "1", "color": "#2da9d9", "side" : "R" }];

    */
    console.debug("start aggregationSeriesHorizontalBar ----------- *")
    console.debug("ROWS------------DEBUG", rows);
    console.debug("xCOLUMN---------DEBUG", xColumn);
    console.debug("SERIE_COLUMNS---DEBUG", serieColumns);
    console.debug("isDate----------DEBUG", isDate);

    var chartData = new Array();
    var group = new Array();
    var xValue = new Array("x");

    for (var s = 0; s < serieColumns.length; s++) {
      group.push(serieColumns[s].label);
    }
    console.debug("Group----------DEBUG", group);

    for (var s = 0; s < serieColumns.length; s++) {
      var dataMap = {};
      var serie = serieColumns[s];
      serie.values = new Array();

      for (var i = 0; i < rows.length; i++) {
        if (!dataMap[rows[i][xColumn.key]]) {
          dataMap[rows[i][xColumn.key]] = 0;
        }
        if (!serieColumns[s].dataFilter || serieColumns[s].dataFilter == rows[i][serieColumns[s].key]) {
          if (serieColumns[s].countingMode == 'sum')
            dataMap[rows[i][xColumn.key]] += parseFloat(rows[i][serieColumns[s].key]);
          else
            dataMap[rows[i][xColumn.key]]++;
        }
      }


      for (var key in dataMap) {
        if (dataMap.hasOwnProperty(key)) {
          var x;
          if (isDate)
            x = this.mongoDate2millis(key);
          else
            x = parseFloat(key);

          var d = { "x": x, "y": (serieColumns[s].side == 'L' ? -1 * dataMap[key] : dataMap[key]), "shape": null, "label": serieColumns[s].label };

          if (serie.shape)
            d.shape = serie.shape;

          serie.values.push(d);

          if (xValue.indexOf(key) < 0) {
            xValue.push(key);
          }
        }
      }

      //console.debug("serie", serie);
      serie.key = serie.label;
      chartData.push(serie);

    }

    console.debug("xValue", xValue);
    console.debug("chartData", chartData);

    var dataObj = {
      "data": [],
      "group": group
    }

    for (let d of chartData) {
      let line = new Array();
      line.push(d["key"]);
      for (let v of d.values) {
        //console.debug("d.values -> " + v["y"]);
        line.push(v["y"]);
      }
      dataObj.data.push(line);
    }

    dataObj.data.push(xValue);

    console.debug("DATAOBJ---DEBUG", dataObj.data);

    console.debug("end aggregationSeriesHorizontalBar ----------- *")

    /* esempio di dataObj: [["x", "2010", "2015"], ["Registrate", 2000, 100], ["Attive", 500, 300]] */
    return dataObj;
  }


  // data: Array(8)
  //  0: (7) ["Total", 21087, 20131, 19425, 21249, 20154, 19406]
  //  1: (7) ["Male", 10925, 10379, 9982, 11066, 10384, 9951]
  //  2: (7) ["Female", 10162, 9752, 9443, 10183, 9770, 9455]
  //  3: (7) ["Sud America", 205, 266, 322, 194, 261, 315]
  //  4: (7) ["North America", 11431, 10993, 10686, 11530, 10983, 10647]
  //  5: (7) ["Europe", 970, 949, 921, 946, 931, 926]
  //  6: (7) ["Africa", 47, 42, 34, 42, 33, 26]
  //  7: (7) ["Asia", 8434, 7881, 7462, 8556, 7940, 7435]
  // length: 8
  // __proto__: Array(0)
  // series: Array(6)
  //  0: "2007"
  //  1: "2008"
  //  2: "2009"
  //  3: "2010"
  //  4: "2011"
  //  5: "2012"
  public prepareSeriesKeyValue(column, dataObj) {
    console.debug(dataObj);
    var csv = column;
    if (dataObj) {
      for (var j = 0; j < dataObj.series.length; j++)
        csv += ";" + dataObj.series[j];
      csv += "\r\n";
      for (var i = 0; i < dataObj.data.length; i++) {
        csv += dataObj.data[i][0];
        for (var j = 1; j < dataObj.data[i].length; j++) {
          if (dataObj.data[i][j] && !isNaN(dataObj.data[i][j]))
            csv += ";" + parseFloat(dataObj.data[i][j]).toLocaleString();
          else
            csv += ";" + dataObj.data[i][j];
        }
        csv += "\r\n";
      }
    }
    return csv;
  };

  // axis:
  //  rotated: true
  //  x:
  //    categories: (4) [2017, 2018, 2019, 2020]
  //    type: "category"
  //    __proto__: Object
  //  y:
  //    __proto__: Object
  //    __proto__: Object
  // bindto: "#chartId_9629"
  // color: {pattern: Array(4)}
  // data:
  //  columns: Array(4)
  //    0: (5) ["Registrate", 49153, 49165, 49072, 72872.664]
  //    1: (5) ["Attive", 43700, 43643, 43580, 65474.191]
  //    2: (5) ["Iscrizioni", 3782, 3599, 3834, 1599]
  //    3: (5) ["Cessazioni", 3815, 3821, 4040, 1902]
  public prepareLineCSV(column, data) {
    var series;
    if (data.axis.x.categories)
      series = data.axis.x.categories;
    else if (data.axis.y.categories)
      series = data.axis.x.categories;

    var csvObj = {
      "data": data.data.columns,
      "series": series
    }
    return this.prepareSeriesKeyValue(column, csvObj);
  };

  // data: Array(6)
  //  0: (2) ["physics", 5]
  //  1: (2) ["literature", 6]
  //  2: (2) ["medicine", 6]
  //  3: (2) ["peace", 1]
  //  4: (2) ["chemistry", 1]
  //  5: (2) ["economics", 1]
  // length: 6
  // __proto__: Array(0)
  // series: Array(1)
  //  0: "Category"
  public preparePieCSV(column, data) {
    if (data.series.length == 1 && data.series[0] == column)
      data.series[0] = "Values";

    return this.prepareSeriesKeyValue(column, data);
  };

  // 0:
  //  countingMode: "sum"
  //  key: "Rifiuti totale in kg"
  //  label: "Rifiuti totale in kg"
  //  realKey: "Rifiuti_Tot_kg_ab"
  //  values: Array(9)
  //    0: {key: "TO CM", label: "TO CM", value: 147468, color: "#ff0000"}
  //    1: {key: "CN", label: "CN", value: 257706, color: "00ff00"}
  //    2: {key: "AL", label: "AL", value: 187623, color: undefined}
  //    3: {key: "VCO", label: "VCO", value: 76747, color: undefined}
  //    4: {key: "VC", label: "VC", value: 81040, color: undefined}
  //    5: {key: "NO", label: "NO", value: 88647, color: undefined}
  //    6: {key: "AT", label: "AT", value: 89780, color: undefined}
  //    7: {key: "BI", label: "BI", value: 72327, color: undefined}
  //    8: {key: "TO", label: "TO", value: 157982, color: undefined}
  public prepareMapCSV(column, data) {
    var series = [];
    series[0] = data[0].label; // Rifiuti totale in kg
    var values = [];
    data[0].values.forEach(item => {
      values.push([item.label, item.value]);
    });

    var csvObj = {
      "data": values,
      "series": series
    }
    return this.prepareSeriesKeyValue(column, csvObj);
  };

  // data: Array(3)
  //   0: (5) ["Registrate", -49153, -49165, -49072, -72872.664]
  //   1: (5) ["Attive", 43700, 43643, 43580, 65474.191]
  //   2: (5) ["x", "2017", "2018", "2019", "2020"]
  // length: 3
  // __proto__: Array(0)
  // group: Array(2)
  //   0: "Registrate"
  //   1: "Attive"
  public prepareHorizontalCSV(column, data) {
    var values = data.data;
    var series = data.data[2];
    values.splice(2, 1);
    series.splice(0, 1);
    for (let i = 1; i < values[0].length; i++) {
      values[0][i] = values[0][i] * -1;
    }
    var csvObj = {
      "data": values,
      "series": series
    }
    return this.prepareSeriesKeyValue(column, csvObj);
  };

}
