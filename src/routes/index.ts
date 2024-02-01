import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "You hit the Sherlock API route" });
});

import v1Router from "./v1";

//v1 routes
router.use("/v1", v1Router);

export default router;
