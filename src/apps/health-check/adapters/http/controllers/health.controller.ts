import HealthCheckService from "@health-check/applications/health.service";
import { ApplicationController } from "common/controllers";
import { IResponse } from "common/responses";
import httpStatus from "http-status";
import { Service } from "typedi";
import { HealthResponses } from "@health-check/views/response/health.responses";
import { ApplicationContext } from "common/context";

@Service()
export default class HealthCheckController extends ApplicationController<HealthCheckController> {
    constructor(private healthCheckService: HealthCheckService) {
        super();
    }

    getHealth({ store, set }: ApplicationContext): IResponse {
        const log = this.logger(store);
        log.info("Health check");

        const res = this.healthCheckService.getHealth(store);

        if (!res) {
            set.status = httpStatus.INTERNAL_SERVER_ERROR;
            return HealthResponses.GetHealth.Failure();
        }

        set.status = httpStatus.OK;
        return HealthResponses.GetHealth.Success();
    }
}
