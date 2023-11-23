import HealthCheckService from "@health-check/applications/health.service";
import { ApplicationController, LoggeableContext } from "@commons/controllers";
import { IResponse } from "@commons/responses";
import httpStatus from "http-status";
import { Service } from "typedi";
import { HealthResponses } from "@health-check/views/response/health.responses";

@Service()
export default class HealthCheckController extends ApplicationController<HealthCheckController> {
    constructor(private healthCheckService: HealthCheckService) {
        super();
    }

    getHealth = ({ store, set }: LoggeableContext): IResponse => {
        const log = this.getScoppedLogger(store);
        log.info("Health check");

        set.status = httpStatus.OK;
        const res = this.healthCheckService.getHealth(store);

        if (!res) return HealthResponses.GetHealth.Failure();

        return HealthResponses.GetHealth.Success();
    };
}
