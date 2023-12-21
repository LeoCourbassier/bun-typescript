import "reflect-metadata";
import "./autoload";

import { Server } from "./server";
import { DatabaseConnect } from "@data-source";
import { RedisService } from "@common/redis";

await DatabaseConnect();

await new RedisService();

const server = new Server();
server.registerRoutes();
server.start();
