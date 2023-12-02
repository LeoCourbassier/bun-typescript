export class ApplicationError extends Error {
    recoverable?: boolean;
    additionalInfo?: unknown;
    response!: string;
    code!: number;

    constructor(msg: string, additionalInfo?: unknown) {
        super(msg);
        this.message = `${this.constructor.name}: ${msg}`;
        this.additionalInfo = additionalInfo;
    }

    static is(error: unknown): error is typeof this {
        return error instanceof this;
    }
}
