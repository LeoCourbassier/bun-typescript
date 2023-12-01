export const DevelopmentEnvironment = "development";
export const ProductionEnvironment = "production";
export type Environment =
    | typeof DevelopmentEnvironment
    | typeof ProductionEnvironment;

declare module "bun" {
    interface Env {
        ENV: Environment;
        PORT: number;
        DATABASE_HOST: string;
        DATABASE_PORT: number;
        DATABASE_USER: string;
        DATABASE_NAME: string;
        DATABASE_PASSWORD: string;
        LOG_LEVEL: string;
    }
}

const defaultConfig = {
    ENV: DevelopmentEnvironment,
    PORT: 1234,
    DATABASE_HOST: "localhost",
    DATABASE_PORT: 5432,
    DATABASE_USER: "bunts",
    DATABASE_NAME: "bunts",
    DATABASE_PASSWORD: "password",
    LOG_LEVEL: "debug",
};

export const Config = {
    Environment: Bun.env.ENV ?? defaultConfig.ENV,
    Application: {
        PORT: Bun.env.PORT ?? defaultConfig.PORT,
    },
    Database: {
        HOST: Bun.env.DATABASE_HOST ?? defaultConfig.DATABASE_HOST,
        PORT: Bun.env.DATABASE_PORT ?? defaultConfig.DATABASE_PORT,
        USER: Bun.env.DATABASE_USER ?? defaultConfig.DATABASE_USER,
        NAME: Bun.env.DATABASE_NAME ?? defaultConfig.DATABASE_NAME,
        PASSWORD: Bun.env.DATABASE_PASSWORD ?? defaultConfig.DATABASE_PASSWORD,
    },
    Logger: {
        LEVEL: Bun.env.LOG_LEVEL ?? defaultConfig.LOG_LEVEL,
    },
};

export type Config = typeof Config;
