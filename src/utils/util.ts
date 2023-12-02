import { camelCase, isArray, transform, isObject, snakeCase } from "lodash";

export const camelize = (obj: Record<string, unknown>) =>
    transform(
        obj,
        (
            result: Record<string, unknown>,
            value: unknown,
            key: string,
            target
        ) => {
            const camelKey = isArray(target) ? key : camelCase(key);
            result[camelKey] = isObject(value)
                ? camelize(value as Record<string, unknown>)
                : value;
        }
    );

export const snakeize = (obj: Record<string, unknown>) =>
    transform(
        obj,
        (
            result: Record<string, unknown>,
            value: unknown,
            key: string,
            target
        ) => {
            const snakeKey = isArray(target) ? key : snakeCase(key);
            result[snakeKey] = isObject(value)
                ? snakeize(value as Record<string, unknown>)
                : value;
        }
    );
