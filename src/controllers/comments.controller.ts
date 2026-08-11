import { NextFunction, Request, Response } from "express";
import {
  addCommentByArticleId,
  selectCommentsByArticleId,
} from "../models/comments.model";
import { selectArticleById } from "../models/articles.model";
import { isValidId } from "../utils/helper-function";

export const getCommentsByArticleId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { article_id } = req.params;
  const parsedArticle_id = Number(article_id);
  if (!isValidId(parsedArticle_id)) {
    return next({
      status: 400,
      msg: "Bad request - invalid article_id",
    });
  }
  selectArticleById(parsedArticle_id)
    .then(() => {
      return selectCommentsByArticleId(parsedArticle_id);
    })

    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

export const postCommentByArticleId = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { article_id } = req.params;
  const parsedArticle_id = Number(article_id);
  const body = req.body;
  let msg = "";
  if (!("username" in body) || !("body" in body)) {
    msg = "Bad request - missing required field";
  }
  if (msg) {
    return next({
      status: 400,
      msg,
    });
  }
  addCommentByArticleId(parsedArticle_id, body)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
