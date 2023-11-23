import { createPinoLogger } from "@bogeychan/elysia-logger";
import Chalk, { ChalkInstance } from "chalk";
import { level } from "config/config";
import httpStatus from "http-status";
import PinoPretty from "pino-pretty";

interface Level {
    letters: string;
    icon: string;
    color: ChalkInstance;
}

interface Levels {
    [key: number]: Level;
}

const levels: Levels = {
    10: { letters: "TRACE", icon: " 🔎", color: Chalk.rgb(128, 128, 128) },
    20: { letters: "DEBUG", icon: " 🪲 ", color: Chalk.rgb(255, 255, 0) },
    30: { letters: "INFO", icon: " ℹ️ ", color: Chalk.rgb(0, 255, 0) },
    40: { letters: "WARN", icon: " ⚠️ ", color: Chalk.rgb(255, 128, 0) },
    50: { letters: "ERROR", icon: " 🔥", color: Chalk.rgb(255, 0, 0) },
    60: { letters: "FATAL", icon: " 💣", color: Chalk.bgRgb(255, 0, 0).white },
};

const stream = PinoPretty({
    colorize: true,
    sync: true,
    ignore: "pid,hostname",
    translateTime: "SYS:dd/mm/yyyy HH:MM:ss",
    customPrettifiers: {
        time: (timestamp) => Chalk.redBright(timestamp),
        level: (logLevel) => {
            const colorizedLevel = levels[logLevel as unknown as number];
            return colorizedLevel.color(
                `${colorizedLevel.icon} ${colorizedLevel.letters}`
            );
        },
        name: (name) => Chalk.blue(name),
        url: (request) => Chalk.yellow(request),
        request_id: (requestId) => Chalk.yellow(requestId),
        status: (status) => {
            switch (httpStatus[`${status}_CLASS`]) {
                case httpStatus.classes.SUCCESSFUL:
                    return Chalk.greenBright(status);
                default:
                    return Chalk.redBright(status);
            }
        },
        total_time: (totalTime) =>
            parseInt(totalTime as string) < 2000
                ? Chalk.greenBright(totalTime)
                : Chalk.redBright(totalTime),
    },
    // messageFormat: (log) => {
    //     const { name, url, request_id, status, total_time } = log;
    //     return `${name} ${url} ${request_id} ${status} ${total_time}`;
    // },
});

export const MainLogger = createPinoLogger({
    level: level,
    // @ts-expect-error T2345
    stream,
});

export const Spawn = (name: string) =>
    MainLogger.child({
        name,
    });
