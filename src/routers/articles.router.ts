import { Router } from "express";
import {
  getArticleById,
  getArticles,
  patchArticleById,
} from "../controllers/articles.controller";

export const articlesRouter = Router();

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
