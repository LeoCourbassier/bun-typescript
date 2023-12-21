import { BuiltRouter, RouterToken } from "@common/router";
import { Service } from "typedi";
import ApplicationRouter from "@common/router";
import UserController from "@user/controllers/user.controller";
import { ApplicationHandler } from "@common/context";
import { AuthMiddleware } from "@middleware/auth";

@Service({ id: RouterToken, multiple: true })
export default class UserRouter extends ApplicationRouter {
    constructor(private userController: UserController) {
        super();
    }

    register(): BuiltRouter {
        return this.build("users")
            .get("/", this.userController.getAll as ApplicationHandler)
            .get("/:id", this.userController.getById as ApplicationHandler)
            .post("/", this.userController.create as ApplicationHandler)
            .guard(
                {
                    beforeHandle: AuthMiddleware,
                },
                (app) =>
                    app.get("/me", this.userController.me as ApplicationHandler)
            );
    }
}
