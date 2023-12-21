import { Logger } from "@bogeychan/elysia-logger/types";
import { ApplicationContext, RequestContext } from "@common/context";
import { randomUUID } from "crypto";

export const RequestMiddleware = (logger: Logger) => (ctx: RequestContext) => {
    const rid = randomUUID();
    const path = new URL(ctx.request.url).pathname;
    const scoppedLog = logger.child({
        url: `${ctx.request.method} ${path}`,
        request_id: rid,
    });

    scoppedLog.info("Request received");

    ctx.store["time"] = Date.now();
    ctx.store["rid"] = rid;
    ctx.set.headers["X-Request-ID"] = rid;
    ctx.store["log"] = scoppedLog;
};

export const AfterHandleMiddleware =
    (logger: Logger) => (ctx: ApplicationContext) => {
        const time = Date.now() - <number>ctx.store["time"];
        logger
            .child({
                url: `${ctx.request.method} ${ctx.path}`,
                request_id: ctx.store["rid"],
                status: ctx.set.status,
                total_time: `${time}ms`,
            })
            .info("Request finished");
    };
