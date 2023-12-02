import "reflect-metadata";
import { DataSource } from "typeorm";
import { Config, DevelopmentEnvironment } from "@config";
import Container from "typedi";
import { SpawnLogger } from "@logger";
import { entities } from "./entities";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const DatabaseConnect = async () => {
    const ds = new DataSource({
        type: "postgres",
        host: Config.Database.HOST,
        port: Config.Database.PORT,
        username: Config.Database.USER,
        password: Config.Database.PASSWORD,
        database: Config.Database.NAME,
        synchronize: true,
        logging:
            Config.Logger.LEVEL === "debug"
                ? "all"
                : Config.Environment === DevelopmentEnvironment,
        entities: entities,
        migrations: ["../db/migrations/*.ts"],
        subscribers: [],
        namingStrategy: new SnakeNamingStrategy(),
    });
    await ds.initialize();
    await ds.runMigrations();
    Container.set(DataSource, ds);

    SpawnLogger("database").info("Database connected");
};
