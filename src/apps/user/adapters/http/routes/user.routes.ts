import { BuiltRouter, RouterToken } from "@commons/router";
import { Service } from "typedi";
import ApplicationRouter from "@commons/router";
import UserController from "@user/controllers/user.controller";

@Service({ id: RouterToken, multiple: true })
export default class UserRouter extends ApplicationRouter {
    constructor(private userController: UserController) {
        super();
    }

    register(): BuiltRouter {
        return this.build("users")
            .get("/", this.userController.getAll)
            .get("/:id", this.userController.getById)
            .post("/", this.userController.create);
    }
}
