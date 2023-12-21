import { Context, Handler } from "elysia";

export type Store = Record<string, unknown>;
export type Params = Record<string, string>;

export type RequestContext = {
    store: Store;
    request: Request;
} & Pick<Context, "set">;

export type ContextStore = {
    store: Store;
    params: Params;
    request: Request;
    path: string;
    jwt?: {
        sign: Function;
        verify: Function;
    };
    setCookie?: Function;
};

export type ApplicationContext = ContextStore &
    Omit<Context, keyof ContextStore>;

export type ApplicationHandler = Handler<ApplicationContext>;
