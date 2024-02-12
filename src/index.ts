import "dotenv/config";

import express, { Request, Response } from "express";

import cors from "cors";
import helmet from "helmet";

import "./paths";

import AppDataSource from "@/data-source";

import router from "@/routes";

AppDataSource.initialize()
  .then(() => {
    console.log("✅ Database connected successfully!!");
    const app = express();

    //middlewares
    app.use(cors());
    app.use(
      helmet({
        crossOriginEmbedderPolicy: false,
        crossOriginResourcePolicy: false,
      })
    );
    app.disable("x-powered-by");
    app.use(express.json());

    app.get("/", (req: Request, res: Response) => {
      res.status(200).json({ message: "Backend for Sherlock '24!!" });
    });

    //api routes
    app.use("/api", router);

    //404 handler
    app.all("*", (req: Request, res: Response) => {
      res.status(404).json({ message: "Route not found" });
    });

    app.listen(process.env.PORT, () => {
      console.log(`✅ Server listing on port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.error("❌ Database connection failed");
  });
