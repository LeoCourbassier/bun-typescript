import "reflect-metadata";
import "./autoload";

import { Server } from "./server";
import { DatabaseConnect } from "@data-source";

await DatabaseConnect();

const server = new Server();
server.registerRoutes();
server.start();
