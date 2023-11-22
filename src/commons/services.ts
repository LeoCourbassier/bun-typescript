import { IResponse } from "./responses";

export type IService<T> = {
    [K in keyof T]: T[K] extends Function ? (...args: any) => IResponse : T[K];
};

export abstract class ApplicationService<T>
    implements IService<ApplicationService<T>>
{
    constructor() {}
}
