import { IResponse } from "./responses";
import { Logger } from "@bogeychan/elysia-logger/types";
import { kebabCase } from "change-case";
import { ApplicationContext } from "./types";

export type ControllerMethod = (ctx: ApplicationContext) => IResponse;

export type IController<T> = {
    [K in keyof T]: T[K] extends Function ? ControllerMethod : T[K];
};

export abstract class ApplicationController<T extends IController<T>> {
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
