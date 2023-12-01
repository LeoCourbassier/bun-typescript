import { InvalidTypeError } from "@errors/index";

export interface IRequest {
    Required: Record<string, unknown>;
    Optional: Record<string, unknown> | undefined;
}

export type ApplicationRequestType<T extends IRequest> = T["Required"] &
    Optional<T["Optional"]>;

export type Optional<T> = {
    [K in keyof T]?: T[K];
};

export const Class = <T>(_type: new () => T) => new _type();

export abstract class ApplicationRequest {
    static parse = (
        body: Record<string, unknown>,
        spec: IRequest
    ): ApplicationRequestType<typeof spec> => {
        if (!body || !spec || !spec.Required) {
            throw new InvalidTypeError(`Body, and Spec are required`);
        }

        const fullSpec: Record<string, unknown> = {
            ...(spec.Required as {}),
            ...(spec.Optional as {}),
        };

        const parsedBody: Record<string, unknown> = {};

        for (const key of Object.keys(spec.Required || {})) {
            const value = body[key];
            const type = fullSpec[key];

            const v = tryParse<typeof type>(value, type);
            if (v) parsedBody[key] = v;
        }

        for (const key of Object.keys(spec.Optional || {})) {
            const value = body[key];
            const type = fullSpec[key];

            const v = tryParse<typeof type>(value, type, true);
            if (v) parsedBody[key] = v;
        }

        return parsedBody as ApplicationRequestType<typeof spec>;
    };
}

const tryParse = <T>(body: T, spec: T, optional = false): T | null => {
    const parsedBody: Record<string, unknown> = {};

    switch (typeof spec) {
        case "object":
            for (const key of Object.keys(<Record<string, unknown>>spec)) {
                const value = (<Record<string, unknown>>body)[key];
                const type = (<Record<string, unknown>>spec)[key];

                const v = tryParse<typeof type>(value, type, optional);
                if (v) parsedBody[key] = v;
            }

            return parsedBody as T;
        case "string":
            if (typeof body !== "string") {
                if (optional) return null;

                throw new InvalidTypeError(
                    `Invalid type for spec: ${body}, wanted string`
                );
            }

            return body as T;
        case "number":
            if (isNaN(Number(body))) {
                if (optional) return null;

                throw new InvalidTypeError(
                    `Invalid type for spec: ${body}, wanted number`
                );
            }

            return Number(body) as T;
        case "boolean":
            if (
                body !== "true" &&
                body !== "false" &&
                body !== true &&
                body !== false
            ) {
                if (optional) return null;

                throw new InvalidTypeError(
                    `Invalid type for spec: ${body}, wanted boolean`
                );
            }

            return (body === "true" || body === true) as T;
        case "function":
            if (body instanceof spec) {
                return body as T;
            }

            if (optional) return null;

            throw new InvalidTypeError(
                `Invalid type for spec: ${body}, wanted ${spec.name}`
            );
        default:
            if (optional) return null;

            throw new InvalidTypeError(
                `Invalid type for spec: ${body}, wanted ${typeof spec}`
            );
    }
};
