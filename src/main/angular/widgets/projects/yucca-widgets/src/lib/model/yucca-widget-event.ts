import { Constants } from '../yucca-widgets.constants';

export class YuccaWidgetEvent {
    sourceId: string;
    widgetType: string;
    eventType: string;
    data: any;


    constructor(sourceId: string, widgetType: string, eventType: string, data: any) {
        this.sourceId = sourceId;
        this.widgetType = widgetType;
        this.eventType = eventType;
        this.data = data;
    }

    static ignoreEvent(eventValue: Event, sourceId: string, acceptedEventIds?: Array<string>): boolean {
        let ignoreSpecificId = false;
        if (acceptedEventIds) {
            ignoreSpecificId = true;
            for (let i = 0; i < acceptedEventIds.length; i++) {
                if (eventValue["detail"].sourceId == acceptedEventIds[i]) {
                    ignoreSpecificId = false;
                    break;
                }
            }
        }

        return ((eventValue.type != Constants.YUCCA_WIDGET_EVENT && eventValue["detail"].sourceId != sourceId)
            || ignoreSpecificId);
    }
}