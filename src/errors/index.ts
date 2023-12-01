export class ApplicationError extends Error {
    recoverable?: boolean;
    additionalInfo?: unknown;

    constructor(msg: string, recoverable?: boolean, additionalInfo?: unknown) {
        super(msg);
        this.message = `${this.constructor.name}: ${msg}`;
        this.recoverable = recoverable;
        this.additionalInfo = additionalInfo;
    }

    static is(error: unknown): error is typeof this {
        return error instanceof this;
    }
}

// http errors
export class NotFoundError extends ApplicationError {}
export class InternalServerError extends ApplicationError {}
export class BadRequestError extends ApplicationError {}
export class UnauthorizedError extends ApplicationError {}
export class ForbiddenError extends ApplicationError {}
export class ConflictError extends ApplicationError {}
export class UnprocessableEntityError extends ApplicationError {}
export class TooManyRequestsError extends ApplicationError {}
export class ServiceUnavailableError extends ApplicationError {}
export class GatewayTimeoutError extends ApplicationError {}
export class BadGatewayError extends ApplicationError {}

// validation errors
export class InvalidTypeError extends ApplicationError {}
