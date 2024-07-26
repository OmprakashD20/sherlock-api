import express from "express";

//middleware
import { verifyToken } from "@/middlewares";

//controllers
import {
  getCharacterDetails,
  getRound1Leaderboard,
  getTeamDetails,
} from "@/controllers";

const teamRouter = express.Router();

teamRouter.use(verifyToken);

//GET - get team details
teamRouter.get("/details", getTeamDetails);

//GET - get character details
teamRouter.get("/character", getCharacterDetails);

//GET - leaderboard
teamRouter.get("/leaderboard", getRound1Leaderboard);

export default teamRouter;
