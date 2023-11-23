declare module "bun" {
    interface Env {
        ENV: "development" | "production";
        PORT: number;
        DATABASE_HOST: string;
        DATABASE_PORT: number;
        DATABASE_USER: string;
        DATABASE_NAME: string;
        DATABASE_PASSWORD: string;
        LOG_LEVEL: string;
    }
}

export const Config = {
    Application: {
        ENV: Bun.env.ENV ?? "development",
        PORT: Bun.env.PORT ?? 1234,
    },
    Database: {
        HOST: Bun.env.DATABASE_HOST ?? "localhost",
        PORT: Bun.env.DATABASE_PORT ?? 5432,
        USER: Bun.env.DATABASE_USER ?? "postgres",
        NAME: Bun.env.DATABASE_NAME ?? "postgres",
        PASSWORD: Bun.env.DATABASE_PASSWORD ?? "postgres",
    },
    Logger: {
        LEVEL: Bun.env.LOG_LEVEL ?? "debug",
    },
};
