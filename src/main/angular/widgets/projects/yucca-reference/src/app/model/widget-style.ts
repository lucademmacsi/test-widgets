import { WidgetGroupStyle } from './widget-group';

export class WidgetStyle {
    name: string;
    selector: string;
    group: WidgetGroupStyle;
    example: string;
    demo: any;
    constructor(name: string, selector: string, group: WidgetGroupStyle, example: string) {
        this.name = name;
        this.selector = selector;
        this.group = group;
        this.example = example;
    }
}
