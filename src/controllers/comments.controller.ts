import { NextFunction, Request, Response } from "express";
import {
  addCommentByArticleId,
  removeCommentById,
  selectCommentsByArticleId,
} from "../models/comments.model";
import { selectArticleById } from "../models/articles.model";
import { checkUserExists, isValidId } from "../utils/helper-function";

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

  if (!isValidId(parsedArticle_id)) {
    return next({
      status: 400,
      msg: "Bad request - invalid article_id",
    });
  }
  if (!("username" in body) || !("body" in body)) {
    msg = "Bad request - missing required field";
  } else if (
    typeof body.username !== "string" ||
    typeof body.body !== "string"
  ) {
    msg = "Bad request - wrong value type";
  }
  if (msg) {
    return next({
      status: 400,
      msg,
    });
  }
  selectArticleById(parsedArticle_id)
    .then(() => {
      return checkUserExists(body.username);
    })
    .then(() => {
      return addCommentByArticleId(parsedArticle_id, body);
    })

    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

export const deleteCommentById = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { comment_id } = req.params;
  const parsedComment_id = Number(comment_id);
  if (!isValidId(parsedComment_id)) {
    return next({
      status: 400,
      msg: "Bad request - invalid comment_id",
    });
  }
  removeCommentById(parsedComment_id)
    .then(() => {
      res.status(204).send();
    })
    .catch(next);
};
