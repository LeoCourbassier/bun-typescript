import IRouter, { RouterToken } from "@commons/router";
import { Elysia } from "elysia";
import Container, { Service } from "typedi";

@Service()
export class Server {
    private app: Elysia;

    constructor() {
        this.app = new Elysia();
    }

    public registerRoutes() {
        console.log("Registering routes");
        console.log(Container.getMany(RouterToken));
        Container.getMany(RouterToken).forEach((router: IRouter) => {
            this.app.use(router.build());
        });
    }

    public start() {
        this.app.listen(process.env.PORT || 3000, () => {
            console.log(`Server started on port ${process.env.PORT || 3000}`);
        });
    }

    public stop() {
        this.app.stop();
    }
}
