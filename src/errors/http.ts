import httpStatus from "http-status";
import { ApplicationError } from ".";

export class NotFoundError extends ApplicationError {
    response: string = "Not Found";
    code: number = httpStatus.NOT_FOUND;

    constructor(msg: string, additionalInfo?: unknown) {
        super(msg, additionalInfo);
    }
}

export class InternalServerError extends ApplicationError {
    response: string = "Internal Server Error";
    code: number = httpStatus.INTERNAL_SERVER_ERROR;

    constructor(msg: string, additionalInfo?: unknown) {
        super(msg, additionalInfo);
    }
}

export class BadRequestError extends ApplicationError {
    response: string = "Bad Request";
    code: number = httpStatus.BAD_REQUEST;

    constructor(msg: string, additionalInfo?: unknown) {
        super(msg, additionalInfo);
    }
}

export class UnauthorizedError extends ApplicationError {
    response: string = "Unauthorized";
    code: number = httpStatus.UNAUTHORIZED;

    constructor(msg: string, additionalInfo?: unknown) {
        super(msg, additionalInfo);
    }
}

export class ForbiddenError extends ApplicationError {
    response: string = "Forbidden";
    code: number = httpStatus.FORBIDDEN;

    constructor(msg: string, additionalInfo?: unknown) {
        super(msg, additionalInfo);
    }
}

export class TooManyRequestsError extends ApplicationError {
    response: string = "Too Many Requests";
    code: number = httpStatus.TOO_MANY_REQUESTS;

    constructor(msg: string, additionalInfo?: unknown) {
        super(msg, additionalInfo);
    }
}

export class UnprocessableEntityError extends ApplicationError {
    response: string = "Unprocessable Entity";
    code: number = httpStatus.UNPROCESSABLE_ENTITY;

    constructor(msg: string, additionalInfo?: unknown) {
        super(msg, additionalInfo);
    }
}
