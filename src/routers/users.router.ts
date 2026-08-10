import { Router } from "express";
import { getTopics } from "../controllers/topics.controller";
import { getUsers } from "../controllers/users.controller";

export const usersRouter = Router();

usersRouter.get("/", getUsers);
