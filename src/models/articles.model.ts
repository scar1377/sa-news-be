import { prisma } from "../../prisma/db/connection.js";
import { Prisma } from "../generated/prisma/client.js";
import { SortByQuery } from "../types/api.types.js";

export const selectArticles = async (
  sort_by: SortByQuery = "created_at",
  order: Prisma.SortOrder = "desc",
  topic?: string,
) => {
  const queryObj: Prisma.ArticleOrderByWithRelationInput = {};
  if (sort_by === "comment_count") queryObj.comments = { _count: order };
  else queryObj[sort_by] = order;

  const articles = await prisma.article.findMany({
    select: {
      article_id: true,
      title: true,
      topic: true,
      author: true,
      created_at: true,
      votes: true,
      _count: { select: { comments: true } },
    },
    where: { topic },
    orderBy: queryObj,
  });

  const mappedArticles = articles.map(({ _count, ...article }) => {
    return {
      ...article,
      comment_count: _count.comments,
    };
  });

  return mappedArticles;
};

export const selectArticleById = async (id: number) => {
  const article = await prisma.article.findUnique({
    select: {
      article_id: true,
      title: true,
      topic: true,
      author: true,
      body: true,
      created_at: true,
      votes: true,
      article_img_url: true,
      _count: { select: { comments: true } },
    },
    where: { article_id: id },
  });

  if (!article) {
    return Promise.reject({
      status: 404,
      msg: `Article does not exist`,
    });
  } else {
    const { _count, ...matchedArticle } = article;

    return {
      ...matchedArticle,
      comment_count: _count.comments,
    };
  }
};

export const updateArticleById = async (
  id: number,
  body: { inc_votes: number },
) => {
  const { inc_votes } = body;
  const article = await prisma.article.update({
    select: {
      article_id: true,
      title: true,
      topic: true,
      author: true,
      body: true,
      created_at: true,
      votes: true,
      article_img_url: true,
      _count: { select: { comments: true } },
    },
    where: { article_id: id },
    data: {
      votes: {
        increment: inc_votes,
      },
    },
  });

  const { _count, ...matchedArticle } = article;

  return {
    ...matchedArticle,
    comment_count: _count.comments,
  };
};
