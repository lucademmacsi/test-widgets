import { Widget } from "../model/widget";
import { WidgetGroupStyle } from '../model/widget-group';
import { WidgetParam } from '../model/widget-param';
import { WidgetStyle } from '../model/widget-style';
import { WidgetParams } from './params';
import { WidgetStyles } from './styles';

/* discretebarChart */
let discretebarChart = new Widget("discretebarChart", "yucca-discretebar-chart");
discretebarChart.addParamGroup(WidgetParams.groups.DATASET.name);
discretebarChart.addParamGroup(WidgetParams.groups.COMMON.name);
discretebarChart.addParamGroup(WidgetParams.groups.ODATA.name);
discretebarChart.addParamGroup(WidgetParams.groups.ADVANCED.name);
discretebarChart.addParamGroup(WidgetParams.groups.RENDER.name);
discretebarChart.addParamGroup(WidgetParams.groups.LEGEND.name);
discretebarChart.addParam(WidgetParams.param_groupByColumn);
discretebarChart.addParam(WidgetParams.param_serieColumns);
discretebarChart.addParam(WidgetParams.param_barRatio);
discretebarChart.addParam(WidgetParams.param_barWidth);
discretebarChart.addParam(WidgetParams.param_zerobased);
discretebarChart.addParam(WidgetParams.param_valuesAsCategory);
discretebarChart.addParam(WidgetParams.param_axisRotated);
discretebarChart.addParam(WidgetParams.param_xAxis);
discretebarChart.addParam(WidgetParams.param_yAxis);
discretebarChart.addParam(WidgetParams.param_xAxisTick);
discretebarChart.addParam(WidgetParams.param_yAxisTick);

discretebarChart.addStyleGroup(WidgetStyles.groups.COMMON.name);
discretebarChart.addStyle(WidgetStyles.style_discretebarMain);

/* pieChart */
let pieChart = new Widget("pieChart", "yucca-pie-chart");
pieChart.addParamGroup(WidgetParams.groups.DATASET.name);
pieChart.addParamGroup(WidgetParams.groups.COMMON.name);
pieChart.addParamGroup(WidgetParams.groups.ADVANCED.name);
pieChart.addParamGroup(WidgetParams.groups.LEGEND.name);
pieChart.addParamGroup(WidgetParams.groups.RENDER.name);
pieChart.addParam(WidgetParams.param_groupByColumn);
pieChart.addParam(WidgetParams.param_valueColumn);
pieChart.addParam(WidgetParams.param_pieRender);

pieChart.addStyleGroup(WidgetStyles.groups.COMMON.name);
pieChart.addStyle(WidgetStyles.style_pieChartMain);

/* sankeyDiagram */
let sankeyDiagram = new Widget("sankeyDiagram", "yucca-sankey-diagram");
sankeyDiagram.addParamGroup(WidgetParams.groups.DATASET.name);
sankeyDiagram.addParamGroup(WidgetParams.groups.COMMON.name);
sankeyDiagram.addParamGroup(WidgetParams.groups.ADVANCED.name);
sankeyDiagram.addParamGroup(WidgetParams.groups.ODATA.name);
sankeyDiagram.addParamGroup(WidgetParams.groups.RENDER.name);
sankeyDiagram.addParam(WidgetParams.param_valueColumn);
sankeyDiagram.addParam(WidgetParams.param_nodeColumns);
sankeyDiagram.addParam(WidgetParams.param_sort);
//sankeyDiagram.addParam(WidgetParams.param_mainChartColor);

sankeyDiagram.addStyleGroup(WidgetStyles.groups.COMMON.name);
sankeyDiagram.addStyle(WidgetStyles.style_sankeyMain);

/* horizontalMultiBarChart */
let horizontalMultiBarChart = new Widget("horizontalMultiBarChart", "yucca-horizontalmultibar-chart");
horizontalMultiBarChart.addParamGroup(WidgetParams.groups.DATASET.name);
horizontalMultiBarChart.addParamGroup(WidgetParams.groups.COMMON.name);
horizontalMultiBarChart.addParamGroup(WidgetParams.groups.RENDER.name);
horizontalMultiBarChart.addParamGroup(WidgetParams.groups.ADVANCED.name);
horizontalMultiBarChart.addParamGroup(WidgetParams.groups.AXIS.name);
horizontalMultiBarChart.addParam(WidgetParams.param_groupByColumn);
horizontalMultiBarChart.addParam(WidgetParams.param_serieColumns);
horizontalMultiBarChart.addParam(WidgetParams.param_yAxisTick);
horizontalMultiBarChart.addParam(WidgetParams.param_barRatio);
horizontalMultiBarChart.addParam(WidgetParams.param_barWidth);

horizontalMultiBarChart.addStyleGroup(WidgetStyles.groups.COMMON.name);
horizontalMultiBarChart.addStyle(WidgetStyles.style_horizontalChartMain);

/* choroplethMap */
let choroplethMap = new Widget("choroplethMap", "yucca-choropleth-map");
choroplethMap.addParamGroup(WidgetParams.groups.DATASET.name);
choroplethMap.addParamGroup(WidgetParams.groups.COMMON.name);
choroplethMap.addParamGroup(WidgetParams.groups.ADVANCED.name);
choroplethMap.addParamGroup(WidgetParams.groups.MAP.name);
choroplethMap.addParam(WidgetParams.param_groupByColumn);
choroplethMap.addParam(WidgetParams.param_valueColumn);
choroplethMap.addParam(WidgetParams.param_colors);
choroplethMap.addParam(WidgetParams.param_noDataColor);
choroplethMap.addParam(WidgetParams.param_rangeColors);

choroplethMap.addStyleGroup(WidgetStyles.groups.COMMON.name);
choroplethMap.addStyle(WidgetStyles.style_choropletMapMain);

/* treemapChart */
let treemapChart = new Widget("treemapChart", "yucca-treemap-chart");
treemapChart.addParamGroup(WidgetParams.groups.DATASET.name);
treemapChart.addParamGroup(WidgetParams.groups.COMMON.name);
treemapChart.addParamGroup(WidgetParams.groups.ADVANCED.name);
treemapChart.addParamGroup(WidgetParams.groups.RENDER.name);
treemapChart.addParam(WidgetParams.param_treeColumns);
treemapChart.addParam(WidgetParams.param_valueColumn);
treemapChart.addParam(WidgetParams.param_valueColumn2);
treemapChart.addParam(WidgetParams.param_numberFormat);
treemapChart.addParam(WidgetParams.param_rootLabel);
treemapChart.addParam(WidgetParams.param_boxRadius);

treemapChart.addStyleGroup(WidgetStyles.groups.COMMON.name);
treemapChart.addStyle(WidgetStyles.style_treemapMain);

/* multiChart */
let multiChart = new Widget("multiChart", "yucca-multi-chart");
multiChart.addParamGroup(WidgetParams.groups.DATASET.name);
multiChart.addParamGroup(WidgetParams.groups.COMMON.name);
multiChart.addParamGroup(WidgetParams.groups.ADVANCED.name);
multiChart.addParamGroup(WidgetParams.groups.AXIS.name);
multiChart.addParamGroup(WidgetParams.groups.LEGEND.name);
multiChart.addParamGroup(WidgetParams.groups.RENDER.name);
multiChart.addParam(WidgetParams.param_groupByColumn);
multiChart.addParam(WidgetParams.param_serieColumns);
multiChart.addParam(WidgetParams.param_groupByDatetime);

multiChart.addStyleGroup(WidgetStyles.groups.COMMON.name);
multiChart.addStyle(WidgetStyles.style_multiChartMain);

/* lineChart */
let lineChart = new Widget("lineChart", "yucca-line-chart");
lineChart.addParamGroup(WidgetParams.groups.DATASET.name);
lineChart.addParamGroup(WidgetParams.groups.COMMON.name);
lineChart.addParamGroup(WidgetParams.groups.ADVANCED.name);
lineChart.addParamGroup(WidgetParams.groups.AXIS.name);
lineChart.addParamGroup(WidgetParams.groups.LEGEND.name);
lineChart.addParamGroup(WidgetParams.groups.RENDER.name);
lineChart.addParam(WidgetParams.param_groupByColumn);
lineChart.addParam(WidgetParams.param_serieColumns);
lineChart.addParam(WidgetParams.param_groupByDatetime);

lineChart.addStyleGroup(WidgetStyles.groups.COMMON.name);
lineChart.addStyle(WidgetStyles.style_lineChartMain);


export const DatasetWidgets = {
    discretebarChart: discretebarChart,
    pieChart: pieChart,
    sankeyDiagram: sankeyDiagram,
    horizontalMultiBarChart: horizontalMultiBarChart,
    choroplethMap: choroplethMap,
    treemapChart: treemapChart,
    multiChart: multiChart,
    lineChart: lineChart,
}