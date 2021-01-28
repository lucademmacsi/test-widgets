import { Constants } from '../app.constants';
import { WidgetGroupParam } from './widget-group';

export class WidgetParam {
    name: string;
    type: string;
    jsType: string;
    group: WidgetGroupParam;
    mandatory: boolean;
    example: string;
    demo: any;
    constructor(name: string, type: string, group: WidgetGroupParam, mandatory: boolean, example: string) {
        this.name = name;
        this.type = type;
        this.group = group;
        this.mandatory = mandatory;
        this.example = example;
        this.jsType = Constants.JS_TYPES[type] || "object";
    }

}
