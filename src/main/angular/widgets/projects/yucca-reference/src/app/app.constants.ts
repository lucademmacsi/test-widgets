//const COLLECTION_TYPE_SOURCE = { "key": "source", "colorDark": "#19aeff", "colorLight": "#bfe9ff" };

const jsTypes = {
    "tenantcode": "string",
    "datasetcode": "string",
    "inputtext": "string",
    "inputboolean": "boolean",
    "inputnumber": "number",
    "numberFormat": "object",
    "inputcolors": "object",
    "dataasetcolumn": "object",
    "dataasetcolumns": "array_of_object",
    "stringArray": "array_of_string"
}

const localStorageKeys = {
    "CONFIGURATOR_WIDGET_PREFIX": "YuccaWidgetConfigurator-"
}

export const Constants = {
    JS_TYPES: jsTypes,
    LOCALSTORAGE_KEYS: localStorageKeys

};