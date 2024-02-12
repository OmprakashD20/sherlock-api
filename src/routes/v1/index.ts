import express, { Request, Response } from "express";

const v1Router = express.Router();

import authRouter from "./auth.route";
import sherlockRouter from "./sherlock.route";
import watsonRouter from "./watson.route";
import teamRouter from "./team.route";
import round2Router from "./round2.route";

v1Router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "You hit the v1 API route" });
});

v1Router.use("/", authRouter);
v1Router.use("/sherlock", sherlockRouter);
v1Router.use("/watson", watsonRouter);
v1Router.use("/round2", round2Router);
v1Router.use("/team", teamRouter);

export default v1Router;
