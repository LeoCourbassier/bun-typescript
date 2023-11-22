import { Context } from "elysia";
import { IResponse } from "./responses";

export type IController<T> = {
    [K in keyof T]: T[K] extends Function
        ? (params: Context) => IResponse
        : T[K];
};

export abstract class ApplicationController<T>
    implements IController<ApplicationController<T>>
{
    constructor() {}
}
