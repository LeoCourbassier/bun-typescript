import ApplicationRouter from "common/router";
import { RouterToken } from "common/router";
import { Config } from "@config";
import { SpawnLogger } from "@logger";
import { Elysia } from "elysia";
import Container, { Service } from "typedi";
import { ErrorMiddleware } from "middleware/error";
import { AfterHandleMiddleware, RequestMiddleware } from "@middleware/request";

@Service()
export class Server {
    private app: Elysia;
    private logger = SpawnLogger("server");

    constructor() {
        this.app = new Elysia()
            .onError(ErrorMiddleware)
            .onRequest(RequestMiddleware(this.logger))
            .onAfterHandle(AfterHandleMiddleware(this.logger));
    }

    public registerRoutes() {
        Container.getMany(RouterToken).forEach((router: ApplicationRouter) => {
            this.app.use(router.register());
        });
    }

    public start() {
        this.app.listen(Config.Application.PORT, () => {
            this.logger.info(
                `Server started on port ${Config.Application.PORT}`
            );
        });
    }

    public stop() {
        this.app.stop();
    }
}
