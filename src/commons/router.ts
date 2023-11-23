import { Spawn } from "@logger";
import { kebabCase } from "change-case";
import { randomUUID } from "crypto";
import Elysia, { Context } from "elysia";
import { Token } from "typedi";

export const RouterToken = new Token<ApplicationRouter>("routers");

export type ContextWithStore = Context & {
    store: {
        [key: string]: unknown;
    };
};

export type BuiltRouter = Elysia<
    string,
    {
        request: {};
        store: {
            [key: string]: unknown;
        };
    }
>;

export interface IRouter {
    build(): BuiltRouter;
}

export default class ApplicationRouter implements IRouter {
    build(): BuiltRouter {
        return this.prebuild("");
    }

    protected prebuild(prefix: string): BuiltRouter {
        const name = kebabCase(this.constructor.name).replace(
            "-router",
            ".router"
        );
        const log = Spawn(name);

        return new Elysia({ prefix: `/${prefix}` })
            .onBeforeHandle((ctx: ContextWithStore) => {
                const rid = randomUUID();
                const scoppedLog = log.child({
                    url: `${ctx.request.method} ${ctx.path}`,
                    request_id: ctx.store["rid"],
                });

                scoppedLog.info("Request received");

                ctx.store["time"] = Date.now();
                ctx.store["rid"] = rid;
                ctx.store["log"] = scoppedLog;
            })
            .onAfterHandle((ctx: ContextWithStore) => {
                const time = Date.now() - <number>ctx.store["time"];
                log.child({
                    url: `${ctx.request.method} ${ctx.path}`,
                    request_id: ctx.store["rid"],
                    status: ctx.set.status,
                    total_time: `${time}ms`,
                }).info("Request finished");
            });
    }
}
