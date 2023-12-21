import HealthCheckService from "@health-check/applications/health.service";
import { ApplicationController, Views } from "@common/controllers";
import { ApplicationResponse, IResponse } from "@common/responses";
import httpStatus from "http-status";
import { Service } from "typedi";
import { HealthResponses } from "@health-check/views/response/health.responses";
import { ApplicationContext } from "@common/context";
import { Loggeable } from "@common/loggeable";
import { HealthRequests } from "@health-check/views/request/health.requests";

@Service()
@Views(HealthRequests, HealthResponses)
@Loggeable()
export default class HealthCheckController extends ApplicationController<HealthCheckController> {
    constructor(private healthCheckService: HealthCheckService) {
        super();
    }

    getHealth(
        ctx: ApplicationContext,
        success: ApplicationResponse,
        failure: ApplicationResponse
    ): IResponse {
        const res = this.healthCheckService.getHealth(ctx);

        if (!res) {
            ctx.set.status = httpStatus.INTERNAL_SERVER_ERROR;
            return failure();
        }

        ctx.set.status = httpStatus.OK;
        return success();
    }
}
