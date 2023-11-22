import HealthCheckService from "@apps/health-check/application/health.service";
import { ApplicationController } from "@commons/controllers";
import { IResponse } from "@commons/responses";
import { Context } from "elysia";
import httpStatus from "http-status";
import { Service } from "typedi";

@Service()
export default class HealthCheckController extends ApplicationController<HealthCheckController> {
    constructor(private healthCheckService: HealthCheckService) {
        super();
    }

    getHealth = ({ set }: Context): IResponse => {
        set.status = httpStatus.OK;
        return this.healthCheckService.getHealth();
    };
}
