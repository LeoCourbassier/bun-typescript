import Elysia, { DecoratorBase } from "elysia";
import { kebabCase } from "lodash";
import { Token } from "typedi";

export const RouterToken = new Token<ApplicationRouter>("routers");

export type BuiltRouter = Elysia<string, DecoratorBase>;

export interface IRouter {
    register(): BuiltRouter;
}

export default class ApplicationRouter implements IRouter {
    register(): BuiltRouter {
        return this.build(kebabCase(this.constructor.name));
    }

    protected build(prefix: string): BuiltRouter {
        return new Elysia({ prefix: `/${prefix}` });
    }
}
