import {
    ApplicationResponse,
    ApplicationResponses,
    IResponse,
} from "./responses";
import { ApplicationContext } from "./context";
import {
    ApplicationRequestParser,
    ApplicationRequestType,
    ApplicationRequests,
} from "./requests";
import { Bindable } from "./bindable";
import { Logger } from "@bogeychan/elysia-logger/types";

export type ControllerMethod = (
    ctx: ApplicationContext,
    success: ApplicationResponse,
    failure: ApplicationResponse,
    body: ApplicationRequestType<never>,
    logger: Logger
) => IResponse | Promise<IResponse>;

export type IController<T> = {
    [K in keyof T]: T[K] extends Function ? ControllerMethod : T[K];
};

export abstract class ApplicationController<
    T extends IController<T>
> extends Bindable {}

export const Views = (
    requests: ApplicationRequests,
    responses: ApplicationResponses
) => {
    return (target: Function) => {
        const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
        for (const [propName, descriptor] of Object.entries(descriptors)) {
            const isMethod =
                typeof descriptor.value == "function" &&
                propName != "constructor";
            if (!isMethod) continue;

            const spec = requests[propName];
            const views = responses[propName];

            const originalMethod = descriptor.value;
            descriptor.value = function (...args: unknown[]) {
                const ctx = args[0] as ApplicationContext;
                let parsedBody = undefined;

                if (spec)
                    parsedBody = ApplicationRequestParser.parse(
                        ctx.body as Record<string, unknown>,
                        spec
                    );

                return originalMethod.apply(this, [
                    ...args,
                    views?.Success || {},
                    views?.Failure || {},
                    parsedBody || {},
                ]);
            };

            Object.defineProperty(target.prototype, propName, descriptor);
        }
    };
};
