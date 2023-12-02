import { ApplicationController, Views } from "common/controllers";
import { ApplicationResponse, IResponse } from "common/responses";
import httpStatus from "http-status";
import { Service } from "typedi";
import { ApplicationContext } from "common/context";
import UserService from "@user/applications/user.service";
import {
    UserCreateRequest,
    UserRequests,
} from "@user/views/request/user.request";
import { ApplicationRequestType } from "common/requests";
import { UserResponses } from "@user/views/response/user.responses";
import { NotFoundError } from "@errors/http";
import { WithoutId } from "@common/models";
import { User } from "@user/models/user.model";

@Service()
@Views(UserRequests, UserResponses)
export default class UserController extends ApplicationController<UserController> {
    constructor(private userService: UserService) {
        super();
    }

    getAll(
        { store, set }: ApplicationContext,
        success?: ApplicationResponse,
        failure?: ApplicationResponse
    ): Promise<IResponse> {
        const log = this.logger(store);

        return this.userService
            .getAll(store)
            .then((users) => {
                set.status = httpStatus.OK;
                return success!(users);
            })
            .catch((_err) => {
                log.error("Failed to get all users", _err);
                set.status = httpStatus.INTERNAL_SERVER_ERROR;
                return failure!();
            });
    }

    getById(
        { store, set, params }: ApplicationContext,
        success?: ApplicationResponse,
        failure?: ApplicationResponse
    ): Promise<IResponse> {
        const log = this.logger(store);

        return this.userService
            .getById(store, params.id)
            .then((user) => {
                if (!user) {
                    set.status = httpStatus.NOT_FOUND;
                    return failure!(new NotFoundError(`user ${params.id}`));
                }

                set.status = httpStatus.OK;
                return success!(user);
            })
            .catch((_err) => {
                log.error("Failed to get user by id", _err);
                set.status = httpStatus.INTERNAL_SERVER_ERROR;
                return failure!(_err);
            });
    }

    create(
        { store, set }: ApplicationContext,
        success?: ApplicationResponse,
        failure?: ApplicationResponse,
        body?: ApplicationRequestType<UserCreateRequest>
    ): Promise<IResponse> {
        const log = this.logger(store);

        return this.userService
            .create(store, body as unknown as WithoutId<User>)
            .then((_user) => {
                set.status = httpStatus.CREATED;
                return success!(_user);
            })
            .catch((_err) => {
                log.error("Failed to create user", _err);
                set.status = httpStatus.INTERNAL_SERVER_ERROR;
                return failure!(_err);
            });
    }
}
