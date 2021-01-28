const API_METADATA_URL = "//api.smartdatanet.it/metadataapi/api/";
const API_DATA_URL = "//api.smartdatanet.it/api/";

const DEFAULT_CHART_COLOR = "#006f89";

// datacat color #008faf #006F89
// light blue #00bbf0 
// yellow-green #dbdb00
// green #00973a

const YUCCA_WIDGET_EVENT = "yucca.widget.event";
const EVENT_TYPES = {
    DATASET_DEHIGHLIGHT_GROUP_BY_COLUMN: "dataset.dehighlight.group_by_column",
    DATASET_HIGHLIGHT_GROUP_BY_COLUMN: "dataset.highlight.group_by_column",
    DATASET_CHANGE_GROUP_BY_COLUMN: "dataset.change.group_by_column",
    DATASET_CHANGE_VALUE_COLUMN: "dataset.change.value_column",
    DATASET_FILTER_TEXT: "dataset.filter.text",
    DATASET_FILTER_ODATA: "dataset.filter.odata",
    DATASET_BROWSE: "dataset.browse"
}

export const Constants = {
    API_METADATA_URL: API_METADATA_URL,
    API_DATA_URL: API_DATA_URL,
    DEFAULT_CHART_COLOR: DEFAULT_CHART_COLOR,
    YUCCA_WIDGET_EVENT: YUCCA_WIDGET_EVENT,
    EVENT_TYPES: EVENT_TYPES
}