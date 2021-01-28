import { Widget } from "../model/widget";
import { WidgetParams } from './params';


let controlSelectRelated = new Widget("controlSelectRelated", "yucca-pie-chart");
controlSelectRelated.addParamGroup(WidgetParams.groups.DATASET.name);
controlSelectRelated.addParamGroup(WidgetParams.groups.COMMON.name);
controlSelectRelated.addParamGroup(WidgetParams.groups.ADVANCED.name);
controlSelectRelated.addParamGroup(WidgetParams.groups.LEGEND.name);
controlSelectRelated.addParamGroup(WidgetParams.groups.RENDER.name);
controlSelectRelated.addParam(WidgetParams.param_groupByColumn);
controlSelectRelated.addParam(WidgetParams.param_valueColumn);
controlSelectRelated.addParam(WidgetParams.param_pieRender);

let filterDatasetSelectRelated = new Widget("filterDatasetSelectRelated", "yucca-pie-chart");
filterDatasetSelectRelated.addParamGroup(WidgetParams.groups.DATASET.name);
filterDatasetSelectRelated.addParamGroup(WidgetParams.groups.COMMON.name);
filterDatasetSelectRelated.addParamGroup(WidgetParams.groups.ADVANCED.name);
filterDatasetSelectRelated.addParamGroup(WidgetParams.groups.LEGEND.name);
filterDatasetSelectRelated.addParamGroup(WidgetParams.groups.ODATA.name);
filterDatasetSelectRelated.addParamGroup(WidgetParams.groups.RENDER.name);
filterDatasetSelectRelated.addParam(WidgetParams.param_groupByColumn);
filterDatasetSelectRelated.addParam(WidgetParams.param_valueColumn);
filterDatasetSelectRelated.addParam(WidgetParams.param_pieRender);

export const RelatedWidgets = {
    controlSelectRelated: controlSelectRelated,
    filterDatasetSelectRelated: filterDatasetSelectRelated,
}