import { Router } from "express";
import { getArticles } from "../controllers/articles.controller";

export const articlesRouter = Router();

articlesRouter.get("/", getArticles);
