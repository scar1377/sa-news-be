import { prisma } from "../../prisma/db/connection";
import { comments } from "../../prisma/db/data/test-data/comments";
import { Prisma } from "../generated/prisma/client";
import { SortByQuery } from "../types/api.types";

export const selectArticles = async (sort_by: SortByQuery = "created_at") => {
  const queryObj: Prisma.ArticleOrderByWithRelationInput = {};
  if (sort_by === "comment_count") queryObj.comments = { _count: "desc" };
  else queryObj[sort_by] = "desc";

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
    where: { article_id: id },
  });

  if (!article) {
    return Promise.reject({
      status: 404,
      msg: `Article does not exist`,
    });
  } else return article;
};

export const updateArticleById = async (
  id: number,
  body: { inc_votes: number },
) => {
  const { inc_votes } = body;
  const article = await prisma.article.update({
    where: { article_id: id },
    data: {
      votes: {
        increment: inc_votes,
      },
    },
  });
  return article;
};
