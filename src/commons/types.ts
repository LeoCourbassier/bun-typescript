import { Context } from "elysia";

export type Store = Record<string, unknown>;

export type ContextStore = {
    store: Store;
};

export type ApplicationContext = Context & ContextStore;
