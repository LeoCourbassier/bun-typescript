import { Logger } from "@bogeychan/elysia-logger/types";
import { Store } from "@common/context";
import { ApplicationError } from "@errors/index";
import { SpawnLogger } from "@logger";
import { Context } from "elysia";
import httpStatus from "http-status";

type MiddlewareArgs = {
    code: string;
    error: Error;
    set: Context["set"];
    store: Store;
};

export const ErrorMiddleware = ({
    code: _code,
    error,
    set,
    store,
}: MiddlewareArgs) => {
    let logger: Logger;
    const name = "error.middleware";

    if (!store["log"]) logger = SpawnLogger(name);
    else
        logger = (<Logger>store["log"]).child({
            name,
        });

    logger.error(`Error: ${error.message}`, error);

    if (error instanceof ApplicationError) {
        set.status = error.code;
        return {
            message: error.message,
        };
    }

    if (error.name !== "SyntaxError") {
        set.status = httpStatus.INTERNAL_SERVER_ERROR;
        return {
            message: "Internal Server Error",
        };
    }

    set.status = httpStatus.UNPROCESSABLE_ENTITY;
    return {
        message: "Unprocessable Entity",
    };
};
