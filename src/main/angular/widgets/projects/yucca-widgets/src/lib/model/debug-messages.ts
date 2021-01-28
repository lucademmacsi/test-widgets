export class DebugMessages {
    errors: string[];
    warnings: string[];
    info: string[];
    constructor() { this.errors = []; this.warnings = []; this.info = []; }

    public addError(message: string) {
        this.errors.push(message);
    }
    public addWarning(message: string) {
        this.warnings.push(message);
    }
    public addInfo(message: string) {
        this.info.push(message);
    }
}