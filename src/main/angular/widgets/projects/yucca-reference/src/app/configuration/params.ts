import { InputBooleanComponent } from '../components/configurator/paramtypes/input-boolean/input-boolean.component';
import { InputColorComponent } from '../components/configurator/paramtypes/input-color/input-color.component';
import { InputColorsComponent } from '../components/configurator/paramtypes/input-colors/input-colors.component';
import { InputDatasetcodeComponent } from '../components/configurator/paramtypes/input-datasetcode/input-datasetcode.component';
import { InputDatasetcolumnComponent } from '../components/configurator/paramtypes/input-datasetcolumn/input-datasetcolumn.component';
import { InputDatasetcolumnsComponent } from '../components/configurator/paramtypes/input-datasetcolumns/input-datasetcolumns.component';
import { InputTenantcodeComponent } from '../components/configurator/paramtypes/input-tenantcode/input-tenantcode.component';
import { InputTextComponent } from '../components/configurator/paramtypes/input-text/input-text.component';
import { WidgetGroupParam } from '../model/widget-group';
import { WidgetParam } from "../model/widget-param";

const groups = {
    DATASET: new WidgetGroupParam("dataset", 0),
    SPECIFIC: new WidgetGroupParam("specific", 1),
    MAP: new WidgetGroupParam("map", 3),
    COMMON: new WidgetGroupParam("common", 4),
    RENDER: new WidgetGroupParam("render", 5),
    AXIS: new WidgetGroupParam("axis", 6),
    LEGEND: new WidgetGroupParam("legend", 7),
    ODATA: new WidgetGroupParam("odata", 8),
    ADVANCED: new WidgetGroupParam("advanced", 9)
}

const paramTypes = {
    "inputText": { "component": InputTextComponent, "modalSize": "lg", "modalParams": {} },
    "inputBoolean": { "component": InputBooleanComponent, "modalSize": "lg", "modalParams": {} },
    // "inputTexts": {"component":InputTextsComponent, "modalSize":"lg", "modalParams":{}},
    "inputColor": { "component": InputColorComponent, "modalSize": "lg", "modalParams": {} },
    "inputTenantcode": { "component": InputTenantcodeComponent, "modalSize": "lg", "modalParams": {} },
    "inputDatasetcode": { "component": InputDatasetcodeComponent, "modalSize": "lg", "modalParams": {} },
    // "inputNumber": {"component":InputNumberComponent, "modalSize":"lg", "modalParams":{}},
    // "inputNumberFormat": {"component":InputNumberFormatComponent, "modalSize":"lg", "modalParams":{}},
    "inputColors": { "component": InputColorsComponent, "modalSize": "xl", "modalParams": {} },
    // "inputAxis": {"component":InputAxisComponent, "modalSize":"lg", "modalParams":{}},
    // "inputAxisTick": {"component":InputAxisTickComponent, "modalSize":"lg", "modalParams":{}},
    // "inputSubchart": {"component":InputSubchartComponent, "modalSize":"lg", "modalParams":{}},
    // "inputLegend": {"component":InputLegendComponent, "modalSize":"lg", "modalParams":{}},
    // "inputGeojsons": {"component":InputGeojsonsComponent, "modalSize":"lg", "modalParams":{}},
    // "inputOdataFilter": {"component":InputOdataFilterComponent, "modalSize":"lg", "modalParams":{}},
    // "inputSelect": {"component":InputSelectComponent, "modalSize":"lg", "modalParams":{}},
    "inputDatasetcolumnGroupBy": { "component": InputDatasetcolumnComponent, "modalSize": "lg", "modalParams": { "hasCountingMode": false } },
    "inputDatasetcolumns": { "component": InputDatasetcolumnsComponent, "modalSize": "xl", "modalParams": {} },
    "inputDatasetcolumnValue": { "component": InputDatasetcolumnComponent, "modalSize": "lg", "modalParams": { "hasCountingMode": true } },
    // "inputPiechartRender": {"component":InputPiechartRenderComponent, "modalSize":"lg", "modalParams":{}},
    // "inputRangeColors": {"component":InputRangeColorsComponent, "modalSize":"lg", "modalParams":{}}
}


// base
const tenantcode = new WidgetParam("tenantcode", "inputTenantcode", groups.DATASET, true, "smartlab");
const datasetcode = new WidgetParam("datasetcode", "inputDatasetcode", groups.DATASET, true, "NobelPrizeByWinner_9081");

// common
const widgetTitle = new WidgetParam("widgetTitle", "inputText", groups.COMMON, false, "Nobel Winners"); // string;
const widgetSubtitle = new WidgetParam("widgetSubtitle", "inputText", groups.COMMON, false, "Statistics by country"); // string;
const widgetIntro = new WidgetParam("widgetIntro", "inputText", groups.COMMON, false, "In this chart ..."); // string;
const widgetWidth = new WidgetParam("widgetWidth", "inputNumber", groups.COMMON, false, "600"); // number;
const widgetHeight = new WidgetParam("widgetHeight", "inputNumber", groups.COMMON, false, "500"); // number;

// advanced
const widgetId = new WidgetParam("widgetId", "inputText", groups.ADVANCED, false, "stats_widget_2020"); // string;
const usertoken = new WidgetParam("usertoken", "inputText", groups.ADVANCED, false, "21d612a9a1cec5e98e9e33d05251229c"); // string;
const apiDataUrl = new WidgetParam("apiDataUrl", "inputText", groups.ADVANCED, false, "https://nobel.stats.com/yucca"); // string;
const acceptedEventIds = new WidgetParam("acceptedEventIds", "inputTexts", groups.ADVANCED, false, "['filterOnYear','filterOnGender']"); // string;
const cache = new WidgetParam("cache", "inputBoolean", groups.ADVANCED, false, "false"); // boolean;
const debug = new WidgetParam("debug", "inputBoolean", groups.ADVANCED, false, "false"); // boolean;

// odata
const filter = new WidgetParam("filter", "inputOdataFilter", groups.ODATA, false, "(year gt 1980)"); // string;
const otherFilterLogic = new WidgetParam("otherFilterLogic", "inputSelect", groups.ODATA, false, "or"); // string;
const orderby = new WidgetParam("orderby", "inputText", groups.ODATA, false, "firstname"); // string;
const top = new WidgetParam("top", "inputNumber", groups.ODATA, false, "10"); // number = 1000;
const skip = new WidgetParam("skip", "inputNumber", groups.ODATA, false, "2"); // number = 1;

// render
const numberFormat = new WidgetParam("numberFormat", "inputNumberformat", groups.RENDER, false, '{decimal: "2", isEuro: "true", formatBigNumber: "false", textAfter: "", lang: ""}'); // NumberFormat;
const colors = new WidgetParam("colors", "inputColors", groups.RENDER, false, '{ chartColors: ["#422901", "#5c3901", "#754902", "#8f5902", "#a3772f", "#b7955d", "#ccb38b", "#e0d1b8"] }'); // ChartColors;
//const mainChartColor = new WidgetParam("mainChartColor", "string", groups.RENDER, false, '#ce5c00'); // string;
//const chartColors = new WidgetParam("chartColors", "chartColors", groups.RENDER, false, '{ mainChartColor: "#729fcf" }'); // ChartColors;

// axis
const axisRotated = new WidgetParam("axisRotated", "inputBoolean", groups.AXIS, false, 'false');
const xAxis = new WidgetParam("xAxis", "inputAxis", groups.AXIS, false, '{"show":"true", "label": {"text": "Your X Axis", "position": "outer-center"}}');
const yAxis = new WidgetParam("yAxis", "inputAxis", groups.AXIS, false, '{"show":"true", "label": "Your Y Axis"}');
const xAxisTick = new WidgetParam("xAxisTick", "inputAxisTick", groups.AXIS, false, '{"rotate":60, "multiline":true, "centered":true, "culling": {max: 5}}');
const yAxisTick = new WidgetParam("yAxisTick", "inputAxisTick", groups.AXIS, false, '{"outer":false, "count":5}');
const showGridX = new WidgetParam("showGridX", "inputBoolean", groups.AXIS, false, "true");
const showGridY = new WidgetParam("showGridY", "inputBoolean", groups.AXIS, false, "false");
const subchart = new WidgetParam("subchart", "inputSubchart", groups.AXIS, false, '{ "show": false, "size": { "height": 100}, "axis": {"x": {"how": false}}}');
const showLabels = new WidgetParam("showLabels", "inputBoolean", groups.AXIS, false, "true");

// legend
const legend = new WidgetParam("legend", "inputLegend", groups.LEGEND, false, '{"show":"true", "position": "bottom"}');

// map 
const borderColor = new WidgetParam("borderColor", "inputColor", groups.MAP, false, '"#ffffff"'); //color;
const geojsons = new WidgetParam("geojsons", "inputGeojsons", groups.MAP, false, '[{ "url": "/assets/geojson/piemonte_province_geojson.json" }]'); //number;
const geoprojection = new WidgetParam("geoprojection", "inputSelect", groups.MAP, false, '"orthographic"'); //number;

// specific
const groupByColumn = new WidgetParam("groupByColumn", "inputDatasetcolumnGroupBy", groups.SPECIFIC, false, '{"key":"category","label":"Category"}'); //DatasetColumn;
const valueColumn = new WidgetParam("valueColumn", "inputDatasetcolumnValue", groups.SPECIFIC, false, '{"key":"id", "label":"id", "countingMode":"count"}'); //DatasetColumn;
const serieColumns = new WidgetParam("serieColumns", "inputDatasetcolumns", groups.SPECIFIC, false, '[{"key":"id", "label":"id", "countingMode":"count"}]'); //DatasetColumn;

// sankey
const nodeColumns = new WidgetParam("nodeColumns", "inputDatasetcolumns", groups.SPECIFIC, false, '[{"key":"anno","label":"Anno"},{"key":"provincia","label":"Provincia"},{"key":"qualifica","label":"Qualifica"}]'); //DatasetColumn;
const sort = new WidgetParam("sort", "inputDatasetcolumnValue", groups.SPECIFIC, false, 'anno'); //DatasetColumn;

// barchart
const zerobased = new WidgetParam("zerobased", "inputBoolean", groups.SPECIFIC, false, "true"); //boolean;
const barRatio = new WidgetParam("barRatio", "inputNumber", groups.SPECIFIC, false, "0.7"); //number;
const valuesAsCategory = new WidgetParam("valuesAsCategory", "inputBoolean", groups.SPECIFIC, false, "true"); //boolean;
const barWidth = new WidgetParam("barWidth", "inputNumber", groups.SPECIFIC, false, "20"); //number;

// piechart
const pieRender = new WidgetParam("render", "inputPiechartRender", groups.SPECIFIC, false, '{"type":"donut", "title": "My Beautiful Pie", "donutRatio":0.5}'); //number;

// choropleth map
const noDataColor = new WidgetParam("noDataColor", "inputColor", groups.SPECIFIC, false, '"#dddddd"'); //color;
const rangeColors = new WidgetParam("rangeColors", "inputRangeColors", groups.SPECIFIC, false, '[{"color":"#f57900","limit":10},{"limit":25},{"color":"#cc0000","limit":50}])'); //number;

// treemap
const valueColumn2 = new WidgetParam("valueColumn", "inputDatasetcolumnValue", groups.SPECIFIC, false, '{ "key": "Attive", "label": "Attive", "countingMode": "sum" }'); //DatasetColumn;
const treeColumns = new WidgetParam("treeColumns", "inputDatasetcolumns", groups.SPECIFIC, false, '[{ "key": "Comune", "label": "Comune" }, { "key": "Anno", "label": "Anno" }, { "key": "Trimestre", "label": "Trimestre" }]'); //DatasetColumn;
const rootLabel = new WidgetParam("rootLabel", "inputText", groups.SPECIFIC, false, 'All Categories'); //DatasetColumn;
const boxRadius = new WidgetParam("boxRadius", "inputNumber", groups.SPECIFIC, false, "4"); //number;

// multichart
const groupByDatetime = new WidgetParam("groupByDatetime", "inputBoolean", groups.SPECIFIC, false, "false"); // boolean;

// dataexplorer
const columnsToShow = new WidgetParam("columnsToShow", "inputTexts", groups.SPECIFIC, false, "['provincia', 'anno', 'totale']");
const widgetDescription = new WidgetParam("widgetDescription", "inputText", groups.SPECIFIC, false, "La tabella mostra i dati ...");



// control-select
const controlLabel = new WidgetParam("label", "inputText", groups.SPECIFIC, false, 'Provincia'); //DatasetColumn;
const controlHint = new WidgetParam("hint", "inputText", groups.SPECIFIC, false, 'Seleziona la provincia'); //DatasetColumn;
const controlEmptyLabel = new WidgetParam("emptyLabel", "inputText", groups.SPECIFIC, false, 'Seleziona la provincia'); //DatasetColumn;
const controlSelectRender = new WidgetParam("render", "inputText", groups.SPECIFIC, false, 'button'); //DatasetColumn;
const controlSelectDirection = new WidgetParam("direction", "inputText", groups.SPECIFIC, false, 'row'); //DatasetColumn;
const controlSelectAlignItems = new WidgetParam("alignItems", "inputText", groups.SPECIFIC, false, 'start'); //DatasetColumn;
const controlSelectSelectedValue = new WidgetParam("selectedValue", "inputText", groups.SPECIFIC, false, 'provincia_colonna'); //DatasetColumn;
const controlSelectValueColumns = new WidgetParam("valueColumns", "inputDatasetcolumns", groups.SPECIFIC, false, '[{"key":"id", "label":"id"}]'); //DatasetColumn;
const controlSelectGroupByColumns = new WidgetParam("groupByColumns", "inputDatasetcolumns", groups.SPECIFIC, false, '[{"key":"id", "label":"id"}]'); //DatasetColumn;

// filter data select
const filters = new WidgetParam("filters", "inputOdataFilter", groups.SPECIFIC, false, '[{"label": "2021", "condition": "\'2021\' eq year" },{"label": "2020", "condition": "\'2020\' eq year"},{"label": "2019", "condition": "\'2019\' eq year" }]');
const singleSelection = new WidgetParam("singleSelection", "inputBoolean", groups.SPECIFIC, false, "false"); // boolean;

const growAnimation = new WidgetParam("growAnimation", "inputBoolean", groups.SPECIFIC, false, "false"); // boolean;

export const WidgetParams = {
    groups: groups,
    paramTypes: paramTypes,
    param_tenantcode: tenantcode,
    param_datasetcode: datasetcode,
    param_widgetId: widgetId,
    param_widgetTitle: widgetTitle,
    param_widgetSubtitle: widgetSubtitle,
    param_widgetIntro: widgetIntro,
    param_widgetWidth: widgetWidth,
    param_widgetHeight: widgetHeight,
    param_usertoken: usertoken,
    param_apiDataUrl: apiDataUrl,
    param_acceptedEventIds: acceptedEventIds,
    param_cache: cache,
    param_debug: debug,
    param_filter: filter,
    param_otherFilterLogic: otherFilterLogic,
    param_orderby: orderby,
    param_top: top,
    param_skip: skip,
    param_numberFormat: numberFormat,
    param_colors: colors,
    param_axisRotated: axisRotated,
    param_xAxis: xAxis,
    param_yAxis: yAxis,
    param_xAxisTick: xAxisTick,
    param_yAxisTick: yAxisTick,
    param_legend: legend,
    param_borderColor: borderColor,
    param_geojsons: geojsons,
    param_geoprojection: geoprojection,
    param_noDataColor: noDataColor,
    param_rangeColors: rangeColors,

    param_groupByColumn: groupByColumn,
    param_valueColumn: valueColumn,
    param_serieColumns: serieColumns,
    param_valueColumn2: valueColumn2,
    param_treeColumns: treeColumns,
    param_rootLabel: rootLabel,
    param_boxRadius: boxRadius,
    param_nodeColumns: nodeColumns,
    param_sort: sort,
    //param_mainChartColor: mainChartColor,
    param_zerobased: zerobased,
    param_barRatio: barRatio,
    param_barWidth: barWidth,
    param_valuesAsCategory: valuesAsCategory,
    param_pieRender: pieRender,
    //param_chartColors: chartColors,
    param_groupByDatetime: groupByDatetime,
    param_columnsToShow: columnsToShow,
    param_widgetDescription: widgetDescription,

    param_controlLabel: controlLabel,
    param_controlHint: controlHint,
    param_controlEmptyLabel: controlEmptyLabel,
    param_controlSelectRender: controlSelectRender,
    param_controlSelectDirection: controlSelectDirection,
    param_controlSelectAlignItems: controlSelectAlignItems,
    param_controlSelectSelectedValue: controlSelectSelectedValue,
    param_controlSelectValueColumns: controlSelectValueColumns,
    param_controlSelectGroupByColumns: controlSelectGroupByColumns,

    param_growAnimation: growAnimation,

    param_showGridX: showGridX,
    param_showGridY: showGridY,
    param_subchart: subchart,
    param_showLabels: showLabels,
    param_singleSelection: singleSelection,
    param_filters: filters,
}
