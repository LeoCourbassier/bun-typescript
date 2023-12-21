import { BuiltRouter, RouterToken } from "@common/router";
import { Service } from "typedi";
import ApplicationRouter from "@common/router";
import UserController from "@user/controllers/user.controller";
import { ApplicationHandler } from "@common/context";

@Service({ id: RouterToken, multiple: true })
export default class AuthRouter extends ApplicationRouter {
    constructor(private userController: UserController) {
        super();
    }

    register(): BuiltRouter {
        return this.build("login").post("/", this.userController.login as ApplicationHandler);
    }
}
