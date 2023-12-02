import { Context } from "elysia";

export type Store = Record<string, unknown>;
export type Params = Record<string, string>;

export type RequestContext = {
    store: Store;
    request: Request;
};

export type ContextStore = {
    store: Store;
    params: Params;
    request: Request;
    path: string;
};

export type ApplicationContext = ContextStore &
    Omit<Context, keyof ContextStore>;
