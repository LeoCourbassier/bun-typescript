import { Logger } from "@bogeychan/elysia-logger/types";
import { kebabCase } from "lodash";
import { ApplicationContext } from "./context";

const scopedLogger = (store: Record<string, unknown>, name: string): Logger => {
    const kebab = kebabCase(name);
        const suffix = kebab.split("-").pop();

        const newName = kebabCase(name).replace(
            `-${suffix}`,
            `.${suffix}`
        );

        return (<Logger>store["log"]).child({
            name: newName,
        });
}

export const Loggeable = () => {
    return (target: Function) => {
        const descriptors = Object.getOwnPropertyDescriptors(target.prototype);
        for (const [propName, descriptor] of Object.entries(descriptors)) {
            const isMethod =
                typeof descriptor.value == "function" &&
                propName != "constructor";
            if (!isMethod) continue;

            const originalMethod = descriptor.value;
            descriptor.value = function (...args: unknown[]) {
                const ctx = args[0] as ApplicationContext;

                const log = scopedLogger(ctx.store, target.prototype.constructor.name);

                return originalMethod.apply(this, [
                    ...args,
                    log
                ]);
            };

            Object.defineProperty(target.prototype, propName, descriptor);
        }
    };
};
