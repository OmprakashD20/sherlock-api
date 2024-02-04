import express from "express";

//middleware
import { verifyToken } from "@/middlewares";

//controllers
import { getLeaderboard, getTeamDetails } from "@/controllers";

const teamRouter = express.Router();

//GET -get team details
teamRouter.get("/details", verifyToken, getTeamDetails);

//GET - leaderboard
teamRouter.get("/leaderboard", verifyToken, getLeaderboard);

export default teamRouter;
