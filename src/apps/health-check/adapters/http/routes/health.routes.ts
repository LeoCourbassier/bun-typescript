import { BuiltRouter, RouterToken } from "@commons/router";
import { Service } from "typedi";
import HealthCheckController from "@health-check/controllers/health.controller";
import ApplicationRouter from "@commons/router";

@Service({ id: RouterToken, multiple: true })
export default class HealthCheckRouter extends ApplicationRouter {
    constructor(private healthCheckController: HealthCheckController) {
        super();
    }

    build(): BuiltRouter {
        return this.prebuild("health-check").get(
            "/",
            this.healthCheckController.getHealth
        );
    }
}
