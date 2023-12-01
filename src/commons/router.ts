import { SpawnLogger } from "@logger";
import { kebabCase } from "change-case";
import { randomUUID } from "crypto";
import Elysia, { DecoratorBase } from "elysia";
import { Token } from "typedi";
import { ApplicationContext } from "./context";

export const RouterToken = new Token<ApplicationRouter>("routers");

export type BuiltRouter = Elysia<string, DecoratorBase>;

export interface IRouter {
    register(): BuiltRouter;
}

export default class ApplicationRouter implements IRouter {
    register(): BuiltRouter {
        return this.build("");
    }

    protected build(prefix: string): BuiltRouter {
        const name = kebabCase(this.constructor.name).replace(
            "-router",
            ".router"
        );
        const log = SpawnLogger(name);

        return new Elysia({ prefix: `/${prefix}` })
            .onBeforeHandle((ctx: ApplicationContext) => {
                const rid = randomUUID();
                const scoppedLog = log.child({
                    url: `${ctx.request.method} ${ctx.path}`,
                    request_id: rid,
                });

                scoppedLog.info("Request received");

                ctx.store["time"] = Date.now();
                ctx.store["rid"] = rid;
                ctx.store["log"] = scoppedLog;
            })
            .onAfterHandle((ctx: ApplicationContext) => {
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
