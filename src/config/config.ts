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
        JWT_TOKEN: string;
        REDIS_USER: string;
        REDIS_PASSWORD: string;
        REDIS_HOST: string;
        REDIS_PORT: number;
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
    JWT_TOKEN: "supers3cretpleasedontsteal",
    REDIS_USER: "default",
    REDIS_PASSWORD: "password",
    REDIS_HOST: "localhost",
    REDIS_PORT: 6379,
};

export const Config = {
    Environment: Bun.env.ENV ?? defaultConfig.ENV,
    Application: {
        PORT: Bun.env.PORT ?? defaultConfig.PORT,
        JWT_TOKEN: Bun.env.JWT_TOKEN ?? defaultConfig.JWT_TOKEN,
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
    Redis: {
        USER: Bun.env.REDIS_USER ?? defaultConfig.REDIS_USER,
        PASSWORD: Bun.env.REDIS_PASSWORD ?? defaultConfig.REDIS_PASSWORD,
        HOST: Bun.env.REDIS_HOST ?? defaultConfig.REDIS_HOST,
        PORT: Bun.env.REDIS_PORT ?? defaultConfig.REDIS_PORT,
    },
};

export type Config = typeof Config;
