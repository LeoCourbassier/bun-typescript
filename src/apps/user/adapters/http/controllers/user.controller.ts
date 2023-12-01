import { ApplicationController, Body } from "@commons/controllers";
import { IResponse } from "@commons/responses";
import httpStatus from "http-status";
import { Service } from "typedi";
import { HealthResponses } from "@health-check/views/response/health.responses";
import { ApplicationContext } from "@commons/context";
import UserService from "@user/applications/user.service";
import { UserRequests } from "@user/views/request/user.request";
import { ApplicationRequestType } from "@commons/requests";

@Service()
export default class UserController extends ApplicationController<UserController> {
    constructor(private userService: UserService) {
        super();
    }

    getAll = ({ store, set }: ApplicationContext): IResponse => {
        const log = this.getScoppedLogger(store);
        log.info("Get users");

        set.status = httpStatus.OK;
        return HealthResponses.GetHealth.Success();
    };

    getById = ({
        store,
        set,
        params,
    }: ApplicationContext): Promise<IResponse> => {
        const log = this.getScoppedLogger(store);
        log.info("Get user by id", params.id);

        return this.userService
            .getById(store, params.id)
            .then((user) => {
                if (!user) {
                    set.status = httpStatus.NOT_FOUND;
                    return HealthResponses.GetHealth.Failure();
                }

                set.status = httpStatus.OK;
                return HealthResponses.GetHealth.Success();
            })
            .catch((_err) => {
                set.status = httpStatus.INTERNAL_SERVER_ERROR;
                return HealthResponses.GetHealth.Failure();
            });
    };

    @Body(UserRequests.create)
    create(
        { store, set }: ApplicationContext,
        parsedBody?: ApplicationRequestType<typeof UserRequests.create>
    ): Promise<IResponse> {
        const log = this.getScoppedLogger(store);
        log.info("Create user", parsedBody);

        set.status = httpStatus.OK;
        return Promise.resolve(HealthResponses.GetHealth.Success());
        // return this.userService
        //     .create(store, body as WithoutId<User>)
        //     .then((_user) => {
        //         set.status = httpStatus.CREATED;
        //         return HealthResponses.GetHealth.Success();
        //     })
        //     .catch((_err) => {
        //         set.status = httpStatus.INTERNAL_SERVER_ERROR;
        //         return HealthResponses.GetHealth.Failure();
        //     });
    }
}
