import { Router } from "express";
import { getTopics } from "../controllers/topics.controller";

export const topicsRouter = Router();

topicsRouter.get("/", getTopics);
