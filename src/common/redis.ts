import { Logger } from "@bogeychan/elysia-logger/types";
import { Config } from "@config";
import { SpawnLogger } from "@logger";
import { RedisClientType, createClient } from "redis";
import { Service } from "typedi";

@Service()
export class RedisService {
    client: RedisClientType;
    logger: Logger;

    constructor() {
        this.logger = SpawnLogger("redis");
        this.client = createClient({
            url: `redis://${Config.Redis.USER}:${Config.Redis.PASSWORD}@${Config.Redis.HOST}:${Config.Redis.PORT}`,
        });

        this.client.connect().then(() => {
            this.logger.info("Redis connected");
        });
    }

    set(key: string, value: unknown) {
        this.logger.debug(`Setting key ${key} with value ${value}`);
        // @ts-expect-error There's no type here
        return this.client.hSet(key, value);
    }

    get(key: string) {
        this.logger.debug(`Getting key ${key}`);
        // @ts-expect-error There's no type here
        return this.client.hGet(key);
    }
}
