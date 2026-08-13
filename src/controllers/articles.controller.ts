import { Request, Response, NextFunction } from "express";
import {
  selectArticles,
  selectArticleById,
  updateArticleById,
} from "../models/articles.model";
import {
  checkTopicExists,
  isOrderQuery,
  isSortByQuery,
  isValidId,
} from "../utils/helper-function";
import { Prisma } from "../generated/prisma/client";

export const getArticles = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { sort_by, order, topic } = req.query;

  if (sort_by !== undefined && !isSortByQuery(sort_by)) {
    return next({ status: 400, msg: "Bad request - invalid sort_by query" });
  }

  if (order !== undefined && !isOrderQuery(order)) {
    return next({ status: 400, msg: "Bad request - invalid order query" });
  }

  if (topic !== undefined && typeof topic !== "string") {
    return next({
      status: 400,
      msg: "Bad request - invalid topic query",
    });
  }

  const normalizedOrder: Prisma.SortOrder | undefined =
    order === undefined
      ? undefined
      : order.toLowerCase() === "asc"
        ? "asc"
        : "desc";

  const topicCheck =
    typeof topic === "string" ? checkTopicExists(topic) : Promise.resolve();

  topicCheck
    .then(() => {
      return selectArticles(sort_by, normalizedOrder, topic);
    })
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

export const getArticleById = (
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
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

export const patchArticleById = (
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
  if (!("inc_votes" in body)) {
    msg = "Bad request - missing required field";
  } else if (Number.isNaN(Number(body.inc_votes))) {
    msg = "Bad request - wrong value type";
  }

  if (msg)
    return next({
      status: 400,
      msg,
    });

  updateArticleById(parsedArticle_id, body)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
