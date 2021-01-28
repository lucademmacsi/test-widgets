import { WidgetGroupStyle } from '../model/widget-group';
import { WidgetStyle } from "../model/widget-style";

const groups = {
    COMMON: new WidgetGroupStyle("common", 0),
    SPECIFIC: new WidgetGroupStyle("specific", 1),
}

// common
const widgetMain = new WidgetStyle("widgetMain", ".yucca-widget", groups.COMMON, "font-size: 1.2rem;");
const header = new WidgetStyle("header", ".yucca-widget .yucca-widget-header", groups.COMMON, "color: #bada55; font-weight: 900;");
const headerSmall = new WidgetStyle("headerSmall", ".yucca-widget .yucca-widget-header small", groups.COMMON, "font-weight: 300;");
const intro = new WidgetStyle("intro", ".yucca-widget .yucca-widget-intro", groups.COMMON, "padding: 2rem;");
const chartContent = new WidgetStyle("chartContent", ".yucca-widget .yucca-widget-chart-content", groups.COMMON, "background: #19aeff;");
const loader = new WidgetStyle("loader", ".yucca-widget .yucca-widget-loader", groups.COMMON, "text-align: right;");
const loaderSpinner = new WidgetStyle("loader", ".yucca-widget .yucca-widget-loader .spinner", groups.COMMON, "animation: spin 5s linear infinite");
const chart = new WidgetStyle("chart", ".yucca-widget .yucca-widget-chart", groups.COMMON, "border: solid 1px #004758");
const debug = new WidgetStyle("debug", ".yucca-widget .yucca-widget-debug", groups.COMMON, "color: red;");

// discretebar chart
const discretebarMain = new WidgetStyle("discretebarMain", ".yucca-dataset-discretebar-chart", groups.SPECIFIC, "border-radius: 4px;");

// distribution table
const discreteTableTd = new WidgetStyle("discreteTableTd", "td", groups.SPECIFIC, "white-space: nowrap;");

const singleValue = new WidgetStyle("singleValue", ".yucca-singledata-value", groups.SPECIFIC, "color: #0098BB; font-size: 30px; font-weight: bold; font-stretch: expanded;");
const singleLabel = new WidgetStyle("singleLabel", ".yucca-singledata-label", groups.SPECIFIC, "color: #0098BB; font-size: 30px; font-weight: bold; font-stretch: expanded;");

// pie chart
const pieChartMain = new WidgetStyle("pieChartMain", ".yucca-dataset-pie-chart", groups.SPECIFIC, "border-radius: 4px;");

// choroplet map
const choropletMapMain = new WidgetStyle("choropletMapMain", ".yucca-dataset-choropleth-map", groups.SPECIFIC, "border-radius: 4px;");

// horizontal barchart
const horizontalChartMain = new WidgetStyle("horizontalChartMain", ".yucca-dataset-horizontalmultibar-chart", groups.SPECIFIC, "border-radius: 4px;");

// line chart
const lineChartMain = new WidgetStyle("lineChartMain", ".yucca-dataset-line-chart", groups.SPECIFIC, "border-radius: 4px;");

// multi chart
const multiChartMain = new WidgetStyle("multiChartMain", ".yucca-dataset-multi-chart", groups.SPECIFIC, "border-radius: 4px;");

// sankey diagram
const sankeyMain = new WidgetStyle("sankeyMain", ".yucca-dataset-sankey-diagram", groups.SPECIFIC, "border-radius: 4px;");

// treemap
const treemapMain = new WidgetStyle("treemapMain", ".yucca-dataset-treemap-chart", groups.SPECIFIC, "border-radius: 4px;");

export const WidgetStyles = {
    groups: groups,
    style_widgetMain: widgetMain,
    style_header: header,
    style_headerSmall: headerSmall,
    style_intro: intro,
    style_chartContent: chartContent,
    style_loader: loader,
    style_loaderSpinner: loaderSpinner,
    style_chart: chart,
    style_debug: debug,
    style_discretebarMain: discretebarMain,
    style_discreteTableTd : discreteTableTd,
    style_pieChartMain: pieChartMain,
    style_choropletMapMain: choropletMapMain,
    style_horizontalChartMain: horizontalChartMain,
    style_lineChartMain: lineChartMain,
    style_multiChartMain: multiChartMain,
    style_sankeyMain: sankeyMain,
    style_treemapMain: treemapMain,
    style_singleValue: singleValue,
    style_singleLabel: singleLabel
}
