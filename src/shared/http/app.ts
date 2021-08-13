import "reflect-metadata";
import "@shared/typeorm";
import "express-async-errors";
import cors from "cors";
import routes from "@MainRoutes";
import AppError from "@shared/errors/AppError";
import express, { Express, NextFunction, Request, Response } from "express";
import { isCelebrateError } from "celebrate";
import { pagination } from "typeorm-pagination";

class AppController {
  express: Express;
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(pagination);
  }

  routes() {
    this.express.use(routes);
  }

  errorHandler() {
    this.express.use(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        if (error instanceof AppError) {
          return res.status(error.statusCode).json({
            status: "error",
            message: error.message,
          });
        }
        if (isCelebrateError(error)) {
          const errorBody = error.details.get("body");
          const celebrateErrorMessage =
            errorBody != undefined ? errorBody.message : undefined;
          return res.status(401).json({
            status: "error",
            message: celebrateErrorMessage,
          });
        }
        console.log(error);
        return res.status(500).json({
          status: "error",
          message: "Internal server error",
        });
      },
    );
  }
}

export default new AppController().express;
