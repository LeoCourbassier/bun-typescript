import { Logger } from "@bogeychan/elysia-logger/types";
import { kebabCase } from "change-case";

export abstract class Loggeable {
    protected getScoppedLogger = (store: Record<string, unknown>) => {
        const kebab = kebabCase(this.constructor.name);
        const suffix = kebab.split("-").pop();

        const name = kebabCase(this.constructor.name).replace(
            `-${suffix}`,
            `.${suffix}`
        );

        return (<Logger>store["log"]).child({
            name: name,
        });
    };
}
