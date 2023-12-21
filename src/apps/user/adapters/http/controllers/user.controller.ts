import { ApplicationController, Views } from "@common/controllers";
import { ApplicationResponse, IResponse } from "@common/responses";
import httpStatus from "http-status";
import { Service } from "typedi";
import { ApplicationContext } from "@common/context";
import UserService from "@user/applications/user.service";
import {
    UserCreateRequest,
    UserLoginRequest,
    UserRequests,
} from "@user/views/request/user.request";
import { ApplicationRequestType } from "@common/requests";
import { UserResponses } from "@user/views/response/user.responses";
import { NotFoundError } from "@errors/http";
import { WithoutId } from "@common/models";
import { User } from "@user/models/user.model";
import { Loggeable } from "@common/loggeable";
import { Logger } from "@bogeychan/elysia-logger/types";

@Service()
@Views(UserRequests, UserResponses)
@Loggeable()
export default class UserController extends ApplicationController<UserController> {
    constructor(private userService: UserService) {
        super();
    }

    getAll(
        ctx: ApplicationContext,
        success: ApplicationResponse,
        failure: ApplicationResponse,
        _body: never,
        logger: Logger
    ): Promise<IResponse> {
        return this.userService
            .getAll(ctx)
            .then((users) => {
                ctx.set.status = httpStatus.OK;
                return success(users);
            })
            .catch((err) => {
                logger.error(`Failed to get all users: ${err}`);
                ctx.set.status = httpStatus.INTERNAL_SERVER_ERROR;
                return failure();
            });
    }

    getById(
        ctx: ApplicationContext,
        success: ApplicationResponse,
        failure: ApplicationResponse,
        _body: never,
        logger: Logger
    ): Promise<IResponse> {
        return this.userService
            .getById(ctx, ctx.params.id)
            .then((user) => {
                if (!user) {
                    ctx.set.status = httpStatus.NOT_FOUND;
                    return failure(new NotFoundError(`user ${ctx.params.id}`));
                }

                ctx.set.status = httpStatus.OK;
                return success(user);
            })
            .catch((err) => {
                logger.error(`Failed to get user by id ${err}`);
                ctx.set.status = httpStatus.INTERNAL_SERVER_ERROR;
                return failure(err);
            });
    }

    create(
        ctx: ApplicationContext,
        success: ApplicationResponse,
        failure: ApplicationResponse,
        body: ApplicationRequestType<UserCreateRequest>,
        logger: Logger
    ): Promise<IResponse> {
        return this.userService
            .create(ctx, body as unknown as WithoutId<User>)
            .then((user) => {
                ctx.set.status = httpStatus.CREATED;
                return success(user);
            })
            .catch((err) => {
                logger.error(`Failed to create user ${err}`);
                ctx.set.status = httpStatus.INTERNAL_SERVER_ERROR;
                return failure(err);
            });
    }

    login(
        ctx: ApplicationContext,
        success: ApplicationResponse,
        failure: ApplicationResponse,
        body: ApplicationRequestType<UserLoginRequest>,
        logger: Logger
    ): Promise<IResponse> {
        return this.userService
            .login(ctx, body.email, body.password)
            .then((user) => {
                ctx.set.status = httpStatus.OK;
                return success(user);
            })
            .catch((err) => {
                logger.error(`Failed to login user ${err}`);
                ctx.set.status = httpStatus.UNAUTHORIZED;
                return failure(err);
            });
    }

    me(
        ctx: ApplicationContext,
        success: ApplicationResponse,
        failure: ApplicationResponse,
        _body: never,
        logger: Logger
    ): Promise<IResponse> {
        const id = ctx.store["user"];
        return this.userService
            .getById(ctx, id as string)
            .then((user) => {
                if (!user) {
                    ctx.set.status = httpStatus.NOT_FOUND;
                    return failure(new NotFoundError(`user ${id}`));
                }

                ctx.set.status = httpStatus.OK;
                return success(user);
            })
            .catch((err) => {
                logger.error(`Failed to get user by id ${err}`);
                ctx.set.status = httpStatus.INTERNAL_SERVER_ERROR;
                return failure(err);
            });
    }
}
