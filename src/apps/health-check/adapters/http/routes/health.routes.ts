import IRouter, { RouterToken } from "@commons/router";
import { Service } from "typedi";
import HealthCheckController from "../controllers/health.controller";
import Elysia from "elysia";

@Service({ id: RouterToken, multiple: true })
export default class HealthCheckRouter implements IRouter {
    constructor(private healthCheckController: HealthCheckController) {}

    build(): Elysia<string> {
        console.log("Building health check router");
        return new Elysia({ prefix: "/health" }).get(
            "/",
            this.healthCheckController.getHealth
        );
    }
}
