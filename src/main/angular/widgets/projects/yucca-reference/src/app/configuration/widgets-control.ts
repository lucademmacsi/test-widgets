import { Widget } from "../model/widget";
import { WidgetParam } from '../model/widget-param';
import { WidgetParams } from './params';

let controlSelect = new Widget("controlSelect", "yucca-control-select");
controlSelect.addParam(WidgetParams.param_controlLabel);
controlSelect.addParam(WidgetParams.param_controlHint);
controlSelect.addParam(WidgetParams.param_controlEmptyLabel);
controlSelect.addParam(WidgetParams.param_controlSelectRender);
controlSelect.addParam(WidgetParams.param_controlSelectDirection);
controlSelect.addParam(WidgetParams.param_controlSelectAlignItems);
controlSelect.addParam(WidgetParams.param_controlSelectSelectedValue);
controlSelect.addParam(WidgetParams.param_controlSelectValueColumns);
controlSelect.addParam(WidgetParams.param_controlSelectGroupByColumns);

let filterDatasetSelect = new Widget("filterDatasetSelect", "yucca-filter-data-select");
filterDatasetSelect.addParam(WidgetParams.param_controlLabel);
filterDatasetSelect.addParam(WidgetParams.param_controlHint);
filterDatasetSelect.addParam(WidgetParams.param_controlEmptyLabel);
filterDatasetSelect.addParam(WidgetParams.param_controlSelectRender);
filterDatasetSelect.addParam(WidgetParams.param_controlSelectDirection);
filterDatasetSelect.addParam(WidgetParams.param_controlSelectAlignItems);
filterDatasetSelect.addParam(WidgetParams.param_singleSelection);
filterDatasetSelect.addParam(WidgetParams.param_filters);

export const ControlWidgets = {
    controlSelect: controlSelect,
    filterDatasetSelect: filterDatasetSelect,
}