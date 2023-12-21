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

    logger.error(`Error: ${error.message} => ${error}`);

    // Route not found
    if (error.message === "NOT_FOUND") {
        set.status = httpStatus.NOT_FOUND;
        return {
            message: "Not Found",
        };
    }

    if (error instanceof ApplicationError) {
        set.status = error.code;
        return {
            message: error.message,
        };
    }

    set.status = httpStatus.BAD_REQUEST;
    return {
        message: "Bad Request",
    };
};
