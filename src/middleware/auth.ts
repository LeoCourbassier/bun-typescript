import { ApplicationContext } from "@common/context";
import { UnauthorizedError } from "@errors/http";
import { UserRepository } from "@user/repositories/user.repository";
import httpStatus from "http-status";
import Container from "typedi";

export const AuthMiddleware = async ({
    jwt,
    set,
    store,
    cookie: { auth },
}: ApplicationContext) => {
    const cookie = await jwt!.verify(auth);

    if (!cookie) {
        set.status = httpStatus.UNAUTHORIZED;
        throw new UnauthorizedError("not authorized");
    }

    const repo = Container.get(UserRepository);
    const user = await repo.findOne(cookie.id);
    if (!user) {
        set.status = httpStatus.UNAUTHORIZED;
        throw new UnauthorizedError("not authorized");
    }

    store["user"] = user.id;
};

export const ComposedHandler = (...handlers: Array<Function>) => {
    return async (ctx: ApplicationContext) => {
        for (const handler of handlers) {
            try {
                await handler(ctx);
            } catch (error) {
                return error;
            }
        }
    };
};
