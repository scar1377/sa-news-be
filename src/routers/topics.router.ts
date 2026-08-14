import { Router } from "express";
import { getTopics } from "../controllers/topics.controller.js";

export const topicsRouter = Router();

topicsRouter.get("/", getTopics);
