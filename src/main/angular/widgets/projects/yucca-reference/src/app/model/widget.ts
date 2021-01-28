import { WidgetParams } from '../configuration/params';
import { WidgetEvent } from './widget-event';
import { WidgetParam } from './widget-param';
import { WidgetStyle } from './widget-style';
import { WidgetsDemo } from '../configuration/demo'
import { UtilService } from '../services/util.service';
import { WidgetStyles } from '../configuration/styles';

export class Widget {
    key: string;
    selector: string;
    badge: string;
    params: Record<string, WidgetParam>;
    events: Record<string, Record<string, WidgetEvent>>;;
    styles: Record<string, WidgetStyle>;


    constructor(key, selector, badge = 'beta') {
        this.key = key;
        this.selector = selector;
        this.badge = badge;
        this.params = {};
        this.events = {};
        this.styles = {};
    }

    public addParam(p: WidgetParam, mandatory?: boolean): void {
        if (mandatory)
            p.mandatory = mandatory;
        this.params[p.name] = p;
    }

    public addParamGroup(groupName: string): void {
        Object.keys(WidgetParams).forEach(k => {
            const p = WidgetParams[k];
            if (p.group && p.group.name == groupName)
                this.addParam(p);
        });
    }

    public addStyle(s: WidgetStyle): void {
        this.styles[s.name] = s;
    }

    public addStyleGroup(groupName: string): void {
        Object.keys(WidgetStyles).forEach(k => {
            const p = WidgetStyles[k];
            if (p.group && p.group.name == groupName)
                this.addStyle(p);
        });
    }

    public createComponent(dataName: string, useDemoParams: boolean = true): any {
        let paramValues: Record<string, WidgetParam> = {};
        if (!useDemoParams) {
            Object.keys(this.params).forEach(s => {
                paramValues[s] = this.params[s].demo
            });
        }
        let c = ""; // code for create component
        let d = {}; // demo data 
        // formatted
        let fca = ""; // formatted code angular to show in html page
        let fda = ""; // formatted data angular
        let fcc = ""; // formatted code custom to show in html page
        let fdc = ""; // formatted data angular
        // clipboard
        let cca = ""; // code angular for clipboard
        let cda = ""; // data angular for clipboard
        let ccc = ""; // code custom for clipboard
        let cdc = ""; // data angular for clipboard


        c = "<div *ngIf='" + dataName + "'><" + this.selector;
        fca = "<span class='html-tag'>&lt;" + this.selector + "</span><br>";
        cca = "<" + this.selector + "\r\n";
        fda = "<span class='js-reserved-word'>let</span> " + dataName + "<span class='js-char'> = {</span><br>";
        cda = "let " + dataName + "  = {\r\n";
        fcc = "<span class='html-tag'>&lt;div</span> " +
            "<span class='html-attr'>id=</span>" +
            "<span class='html-attr-value'>\"my-widget-container-id\"&gt;</span><span class='html-tag'>&lt;/div&gt;";
        ccc = "<div id=\"my-widget-container-id\"></div>";
        fdc = "<span class='js-reserved-word'>let</span> <span class='js-field'>el</span> " +
            "<span class='js-char'> =</span> <span class='js-dom'>document</span>." +
            "<span class='js-function'>createElement</span>(<span class='js-attr-value'>\"" + this.selector + "\"</span>);<br>"
        cdc = "let el  = document.createElement(\"" + this.selector + "\");\r\n"
        Object.keys(this.params).forEach(s => {
            const demoParam = useDemoParams ? WidgetsDemo[this.key].params[this.params[s].name] : paramValues[this.params[s].name];
            if (demoParam) {
                c += " [" + this.params[s].name + "]='" + dataName + "." + this.params[s].name + "'";
                fca += "<span class='intent-1 html-attr'>[" + this.params[s].name + "]='</span>" +
                    "<span class='html-attr-value'>" + dataName + "." + this.params[s].name + "'</span><br>"
                cca += "  [" + this.params[s].name + "]=" + dataName + "." + this.params[s].name + "\r\n"
                if (typeof demoParam !== 'string') {
                    d[this.params[s].name] = demoParam;
                    fda += "<span class='intent-1 js-attr'>\"" + this.params[s].name + "\"</span>" +
                        "<span class='js-char'>:</span>" +
                        "<span class='js-attr-number'>" + demoParam + "</span>,<br>"
                    cda += "  \"" + this.params[s].name + "\":" + demoParam + ",\r\n"
                    fdc += "<span class='js-field'>el</span>[<span class='js-field-attr'>\"" + this.params[s].name +
                        "\"</span><span class='js-char'>] =</span><span class='js-attr-number'>" + demoParam + "</span>;<br>";
                    cdc += "el[\"" + this.params[s].name + "\"]=" + demoParam + ";\r\n";

                }
                else if (demoParam.startsWith("{") || demoParam.startsWith("[")) {
                    d[this.params[s].name] = JSON.parse(demoParam);
                    fda += "<span class='intent-1 js-attr'>\"" + this.params[s].name + "\"</span>" +
                        "<span class='js-char'>:</span>" +
                        UtilService.formatJsObject(demoParam) + ",<br>";
                    cda += "  \"" + this.params[s].name + "\":" + demoParam + ",\r\n";
                    fdc += "<span class='js-field'>el</span>[\"<span class='js-field-attr'>" +
                        this.params[s].name + "\"</span>]<span class='js-char'>=</span>" + UtilService.formatJsObject(demoParam) + ";<br>";
                    cdc += "el[\"" + this.params[s].name + "\"]=" + demoParam + ";\r\n";
                }
                else {
                    d[this.params[s].name] = demoParam;
                    fda += "<span class='intent-1 js-attr'>\"" + this.params[s].name + "\"</span>" +
                        "<span class='js-char'>:</span>" +
                        "<span class='js-attr-value'>\"" + demoParam + "\"</span>,<br>"
                    cda += "  \"" + this.params[s].name + "\":\"" + demoParam + "\",\r\n"
                    fdc += "<span class='js-field'>el</span>[<span class='js-field-attr'>\"" + this.params[s].name +
                        "\"</span><span class='js-char'>] =</span><span class='js-attr-value'>\"" + demoParam + "\"</span>;<br>";
                    cdc += "el[\"" + this.params[s].name + "\"]=\"" + demoParam + "\";\r\n";
                }
            }
        });
        c += "></" + this.selector + "></div>";
        fca += "<span class='html-tag'>&gt;&lt;/" + this.selector + "&gt;</span>";
        cca += "></" + this.selector + ">";
        fda += "<span class='js-char'>}</span>";
        cda += "}";
        fdc += "<span class='js-dom'>document</span>.<span class='js-function'>getElementById</span>(" +
            "<span class='js-attr-value'>\"my-widget-container-id\"</span>)." +
            "<span class='js-dom'>appendChild</span>(<span class='js-field'>el</span><span class='js-char'>);</span>";
        cdc += "document.getElementById(\"my-widget-container-id\").appendChild(el);";


        let s = "";
        if (this.styles) {
            Object.keys(this.styles).forEach(k => {
                const demoStyle = WidgetsDemo[this.key].styles[this.styles[k].name];
                if (demoStyle)
                    s += "::ng-deep " + this.styles[k].selector + " {" + demoStyle + "} ";
            });
        }
        return {
            "code": c,
            "data": d,
            "style": s,
            "formatted": {
                "angular": { "code": fca, "data": fda },
                "custom": { "code": fcc, "data": fdc }
            },
            "clipboard": {
                "angular": { "code": cca, "data": cda },
                "custom": { "code": ccc, "data": cdc }
            }

        };

    }

    public getParamsGrouped(): any {
        let map = {}
        Object.keys(this.params).forEach(s => {
            const p = this.params[s];
            if (!map[p.group.name])
                map[p.group.name] = { "group": p.group.name, "order": p.group.order, "params": [] };
            map[p.group.name].params.push(p);
        });

        let res = [];
        Object.keys(map).forEach(s => {
            res.push(map[s]);
        });

        res.sort(function (a, b) {
            return a.order < b.order ? -1 : 1
        });
        return res;
    }

    public getStylesGrouped(): any {
        let map = {}
        Object.keys(this.styles).forEach(k => {
            const s = this.styles[k];
            if (!map[s.group.name])
                map[s.group.name] = { "group": s.group.name, "order": s.group.order, "styles": [] };
            map[s.group.name].styles.push(s);
        });

        let res = [];
        Object.keys(map).forEach(s => {
            res.push(map[s]);
        });

        res.sort(function (a, b) {
            return a.order < b.order ? -1 : 1
        });
        return res;
    }

    public getRelatedWidget(): any {
        return WidgetsDemo[this.key].relatedWidget ? WidgetsDemo[this.key].relatedWidget : null;
    }

}

