import { Request, Response, NextFunction } from "express";
import {
  selectArticles,
  selectArticleById,
  updateArticleById,
} from "../models/articles.model";

export const getArticles = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  selectArticles()
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

  if (Number.isNaN(parsedArticle_id) || !Number.isInteger(parsedArticle_id)) {
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
  console.log(body, "<<<<<<<<<<<<<<<<<<<<<");

  updateArticleById(parsedArticle_id, body)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
