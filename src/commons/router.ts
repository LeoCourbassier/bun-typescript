import Elysia from "elysia";
import { Token } from "typedi";

export const RouterToken = new Token<IRouter>("routers");

export default interface IRouter {
    build(): Elysia<string>;
}
