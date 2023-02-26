import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
//import routes from "./routes/franchise.js"
import routes from "./routes.js";

export default class Service {
  app: Express;
  private port?: string;

  constructor() {
    this.app = express();
    dotenv.config();
    this.port = process.env.PORT_NUMBER;
  }

  init() {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: `http://localhost:${this.port}`,
      })
    );
  }

  start() {
    this.setRoutes();
    const server = this.app.listen(this.port, () => {
      console.log(`⚡️ Server is running at http://localhost:${this.port}`);
    });

    return server;
  }

  setRoutes() {
    const v1Routes = routes.v1(this);

    this.app.use("/api/v1", Object.values(v1Routes));
  }
}
