import { Context } from "elysia";
import { IResponse } from "./responses";
import { Logger } from "@bogeychan/elysia-logger/types";
import { kebabCase } from "change-case";

export type LoggeableContext = Context & {
    store: {
        [key: string]: unknown;
    };
};

export type IController<T> = {
    [K in keyof T]: T[K] extends Function
        ? (ctx: LoggeableContext) => IResponse
        : T[K];
};

export abstract class ApplicationController<T>
    implements IController<ApplicationController<T>>
{
    protected getScoppedLogger = (store: Record<string, unknown>) => {
        const name = kebabCase(this.constructor.name).replace(
            "-controller",
            ".controller"
        );

        return (<Logger>store["log"]).child({
            name: name,
        });
    };
}
