import { Widget } from "../model/widget";
import { WidgetStyle } from '../model/widget-style';
import { WidgetParams } from './params';
import { WidgetStyles } from './styles';

let dataexplorerTable = new Widget("dataexplorerTable", "yucca-dataexplorer-table");
dataexplorerTable.addParamGroup(WidgetParams.groups.DATASET.name);
dataexplorerTable.addParamGroup(WidgetParams.groups.COMMON.name);
dataexplorerTable.addParamGroup(WidgetParams.groups.ADVANCED.name);
dataexplorerTable.addParam(WidgetParams.param_columnsToShow);
dataexplorerTable.addParam(WidgetParams.param_widgetDescription);

let discreteTable = new Widget("discreteTable", "yucca-discrete-table");
discreteTable.addParamGroup(WidgetParams.groups.DATASET.name);
discreteTable.addParamGroup(WidgetParams.groups.COMMON.name);
discreteTable.addParamGroup(WidgetParams.groups.ADVANCED.name);
discreteTable.addParamGroup(WidgetParams.groups.RENDER.name);
//discreteTable.addParamGroup(WidgetParams.groups.LEGEND.name);
discreteTable.addParam(WidgetParams.param_groupByColumn);
discreteTable.addParam(WidgetParams.param_serieColumns);
discreteTable.addStyle(WidgetStyles.style_discreteTableTd);

/* Single Data */
let singleData = new Widget("singleData", "yucca-singledata");
singleData.addParamGroup(WidgetParams.groups.DATASET.name);
singleData.addParamGroup(WidgetParams.groups.COMMON.name);
singleData.addParamGroup(WidgetParams.groups.ADVANCED.name);
singleData.addParam(WidgetParams.param_numberFormat);
singleData.addParam(WidgetParams.param_valueColumn);
singleData.addParam(WidgetParams.param_growAnimation)
singleData.addStyle(WidgetStyles.style_singleValue);
singleData.addStyle(WidgetStyles.style_singleLabel);

export const TableWidgets = {
    dataexplorerTable: dataexplorerTable, 
    discreteTable :  discreteTable, singleData : singleData
}