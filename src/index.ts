import "reflect-metadata";
import "./autoload";
import { Server } from "./server";

const server = new Server();
server.registerRoutes();
server.start();

// TODO: add typeorm
