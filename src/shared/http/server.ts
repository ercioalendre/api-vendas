import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import routes from "./routes";
import AppError from "@shared/errors/AppError";
import "@shared/typeorm";
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.log(error);
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});
app.listen(3000, () => {
  console.log("[api-vendas] Server is running at localhost:3000");
});
