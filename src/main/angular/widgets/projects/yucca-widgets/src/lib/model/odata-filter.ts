
export class OdataFilter {
    plain: string;
    group: Array<OdataFilterGroup>;

    public static ODATA_LOGIC = { "AND": "and", "OR": "or" }

    public static ODATA_OPERATOR = {
        "EQUALS": "eq",
        "NOT_EQUALS": "ne",
        "GREATER_EQUALS": "ge",
        "GREATER": "gt",
        "LOWER": "lt",
        "LOWER_EQUALS": "le",
        "START_WITH": "startswith",
        "END_WITH": "endswith",
        "CONTAINS": "contains",
    }

    public static ODATA_COLUMN_TYPES = { "DATE": "date", "STRING": "string", "NUMBER": "number", "BOOLEAN": "boolean" };

}

export class OdataFilterGroup {
    conditions: Array<OdataFilterCondition>;
    logic: string;
}

export class OdataFilterCondition {
    plain: string;

    // advanced not used
    column: string;
    type: string;
    operator: string;
    value: any;
    logic: string;

    toString(): string {
        var result = ""
        if (this.type == OdataFilter.ODATA_COLUMN_TYPES.DATE) {
            var d = new Date(this.value);
            var dateToParam = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + 'T' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "%2B00:00";
            result = this.column + " " + OdataFilter.ODATA_OPERATOR[this.operator] + " datetimeoffset'" + dateToParam + "'";
        }
        else {
            switch (this.operator) {
                case OdataFilter.ODATA_OPERATOR.EQUALS:
                case OdataFilter.ODATA_OPERATOR.NOT_EQUALS:
                case OdataFilter.ODATA_OPERATOR.GREATER:
                case OdataFilter.ODATA_OPERATOR.GREATER_EQUALS:
                case OdataFilter.ODATA_OPERATOR.LOWER:
                case OdataFilter.ODATA_OPERATOR.LOWER_EQUALS:
                    if (this.type == OdataFilter.ODATA_COLUMN_TYPES.STRING || this.type == OdataFilter.ODATA_COLUMN_TYPES.BOOLEAN)
                        result = "'" + this.value + "' " + OdataFilter.ODATA_OPERATOR[this.operator] + " " + this.column;
                    else
                        result = this.value + OdataFilter.ODATA_OPERATOR[this.operator] + " " + this.column;
                    break;
                case OdataFilter.ODATA_OPERATOR.START_WITH:
                case OdataFilter.ODATA_OPERATOR.END_WITH:
                    if (this.type == OdataFilter.ODATA_COLUMN_TYPES.STRING || this.type == OdataFilter.ODATA_COLUMN_TYPES.BOOLEAN)
                        result = OdataFilter.ODATA_OPERATOR[this.operator] + "(" + this.column + ",'" + this.value + "')";
                    else
                        result = OdataFilter.ODATA_OPERATOR[this.operator] + "(" + this.column + "," + this.value + ")";
                    break;
                case OdataFilter.ODATA_OPERATOR.CONTAINS:
                    if (this.type == OdataFilter.ODATA_COLUMN_TYPES.STRING)
                        result = "(" + OdataFilter.ODATA_OPERATOR[this.operator] + "('" + this.value + "'," + this.column + ") eq true)";
                    break;
                default:
                    break;
            }
        }
        return result
    }
}
