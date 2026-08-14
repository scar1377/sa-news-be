import { Router } from "express";
import {
  getArticleById,
  getArticles,
  patchArticleById,
} from "../controllers/articles.controller.js";
import {
  getCommentsByArticleId,
  postCommentByArticleId,
} from "../controllers/comments.controller.js";

export const articlesRouter = Router();

articlesRouter.get("/", getArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.patch("/:article_id", patchArticleById);
articlesRouter.get("/:article_id/comments", getCommentsByArticleId);
articlesRouter.post("/:article_id/comments", postCommentByArticleId);
