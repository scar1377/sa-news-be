import { Request, Response, NextFunction } from "express";
import { selectArticles, selectArticlesById } from "../models/articles.model";

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
  //   const parsedArticle_id = Number(article_id);
  selectArticlesById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};
