import ApplicationRouter from "@commons/router";
import { RouterToken } from "@commons/router";
import { Config } from "@config";
import { SpawnLogger } from "@logger";
import { Elysia } from "elysia";
import Container, { Service } from "typedi";

@Service()
export class Server {
    private app: Elysia;
    private logger = SpawnLogger("server");

    constructor() {
        this.app = new Elysia();
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
