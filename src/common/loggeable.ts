import { Logger } from "@bogeychan/elysia-logger/types";
import { Bindable } from "./bindable";
import { kebabCase } from "lodash";

export abstract class Loggeable extends Bindable {
    protected logger(store: Record<string, unknown>): Logger {
        const kebab = kebabCase(this.constructor.name);
        const suffix = kebab.split("-").pop();

        const name = kebabCase(this.constructor.name).replace(
            `-${suffix}`,
            `.${suffix}`
        );

        return (<Logger>store["log"]).child({
            name: name,
        });
    }
}
