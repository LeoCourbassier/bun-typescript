import { BuiltRouter, RouterToken } from "@common/router";
import { Service } from "typedi";
import HealthCheckController from "@health-check/controllers/health.controller";
import ApplicationRouter from "@common/router";
import { ApplicationHandler } from "@common/context";

@Service({ id: RouterToken, multiple: true })
export default class HealthCheckRouter extends ApplicationRouter {
    constructor(private healthCheckController: HealthCheckController) {
        super();
    }

    register(): BuiltRouter {
        return this.build("health-check").get(
            "/",
            this.healthCheckController.getHealth as ApplicationHandler
        );
    }
}
