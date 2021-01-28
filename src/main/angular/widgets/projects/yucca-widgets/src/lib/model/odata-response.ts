export class OdataResponse {
    d: OdataResponseD;
}

export class OdataResponseD {
    __count: string;
    count: number;
    results: Array<any>;
    constructor() {
        if (this.__count)
            this.count = parseInt(this.__count);
    }
}