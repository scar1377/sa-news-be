import { NextFunction, Request, Response } from "express";
import { selectCommentsByArticleId } from "../models/comments.model";

export const getCommentsByArticleId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { article_id } = req.params;
  const parsedArticle_id = Number(article_id);
  selectCommentsByArticleId(parsedArticle_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};
