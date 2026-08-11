import { NextFunction, Request, Response } from "express";
import { selectCommentsByArticleId } from "../models/comments.model";
import { selectArticleById } from "../models/articles.model";

export const getCommentsByArticleId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { article_id } = req.params;
  const parsedArticle_id = Number(article_id);
  selectArticleById(parsedArticle_id)
    .then(() => {
      return selectCommentsByArticleId(parsedArticle_id);
    })

    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
