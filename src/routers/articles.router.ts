import { Router } from "express";
import {
  getArticleById,
  getArticles,
} from "../controllers/articles.controller";

export const articlesRouter = Router();

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
