import ApplicationRouter from "@commons/router";
import { RouterToken } from "@commons/router";
import { Spawn } from "@logger";
import { Elysia } from "elysia";
import Container, { Service } from "typedi";

@Service()
export class Server {
    private app: Elysia;
    private logger = Spawn("server");

    constructor() {
        this.app = new Elysia();
    }

    public registerRoutes() {
        Container.getMany(RouterToken).forEach((router: ApplicationRouter) => {
            this.app.use(router.build());
        });
    }

    public start() {
        this.app.listen(process.env.PORT || 3000, () => {
            this.logger.info(
                `Server started on port ${process.env.PORT || 3000}`
            );
        });
    }

    public stop() {
        this.app.stop();
    }
}
