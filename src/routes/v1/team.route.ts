import express from "express";

//middleware
import { verifyToken } from "@/middlewares";

//controllers
import { getRound1Leaderboard, getTeamDetails } from "@/controllers";

const teamRouter = express.Router();

//GET -get team details
teamRouter.get("/details", verifyToken, getTeamDetails);

//GET - leaderboard
teamRouter.get("/leaderboard", verifyToken, getRound1Leaderboard);

export default teamRouter;
