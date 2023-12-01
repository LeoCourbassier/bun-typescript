import { IResponse } from "./responses";
import { ApplicationContext } from "@commons/context";
import { Loggeable } from "./loggeable";
import { ApplicationRequest, IRequest } from "./requests";

export type ControllerMethod = (
    ctx: ApplicationContext
) => IResponse | Promise<IResponse>;

export type IController<T> = {
    [K in keyof T]: T[K] extends Function ? ControllerMethod : T[K];
};

export class ApplicationController<
    T extends IController<T>
> extends Loggeable {}

export const Body = (spec: IRequest) => {
    return (
        target: Object,
        propertyKey: string | symbol,
        descriptor: PropertyDescriptor
    ) => {
        //const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);
        console.log(target);
        console.log(propertyKey);
        console.log(descriptor);

        const originalMethod = descriptor.value;

        descriptor.value = function (...args: unknown[]) {
            const ctx = args[0] as ApplicationContext;
            const parsedBody = ApplicationRequest.parse(
                ctx.body as Record<string, unknown>,
                spec
            );

            return originalMethod.apply(this, [...args, parsedBody]);
        };
    };
};
