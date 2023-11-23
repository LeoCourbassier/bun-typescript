import { createPinoLogger } from "@bogeychan/elysia-logger";
import { Config } from "@config";
import Chalk, { ChalkInstance } from "chalk";
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
    ignore: "pid,hostname,status,url,total_time,request_id",
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
    },
    messageFormat: (log) => buildMessage(log),
});

const totalTimePrettifier = (totalTime: unknown) =>
    parseInt(totalTime as string) < 2000
        ? `in ${Chalk.green(totalTime)}`
        : `in ${Chalk.red(totalTime)}`;

const statusPrettifier = (status: unknown) => {
    switch (httpStatus[`${status}_CLASS`]) {
        case httpStatus.classes.SUCCESSFUL:
            return Chalk.green(status, httpStatus[`${status}_NAME`]);
        default:
            return Chalk.red(status, httpStatus[`${status}_NAME`]);
    }
};

const buildMessage = (log: Record<string, unknown>) => {
    const url = log.url ?? "";
    const rid = log.request_id ?? "";
    const status = log.status ?? "";
    const total_time = log.total_time ?? "";
    const msg = log.msg ?? "";

    return [
        { arg: url, fn: (url: unknown) => Chalk.yellow(url) },
        { arg: status, fn: (status: unknown) => statusPrettifier(status) },
        {
            arg: total_time,
            fn: (total_time: unknown) => totalTimePrettifier(total_time),
        },
        { arg: msg, fn: (msg: unknown) => Chalk.whiteBright(msg) },
        { arg: rid, fn: (rid: unknown) => Chalk.grey(`[${rid}]`) },
    ]
        .map((field) => field.arg && field.fn(field.arg as string))
        .filter(Boolean)
        .join(" ");
};

export const MainLogger = createPinoLogger({
    level: Config.Logger.LEVEL,
    // @ts-expect-error T2345
    stream,
});

export const SpawnLogger = (name: string) =>
    MainLogger.child({
        name,
    });
