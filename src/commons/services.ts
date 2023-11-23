import { kebabCase } from "change-case";
import { Logger } from "@bogeychan/elysia-logger/types";

export abstract class ApplicationService {
    constructor() {}

    protected getScoppedLogger = (store: Record<string, unknown>) => {
        const name = kebabCase(this.constructor.name).replace(
            "-service",
            ".service"
        );

        return (<Logger>store["log"]).child({
            name: name,
        });
    };
}
