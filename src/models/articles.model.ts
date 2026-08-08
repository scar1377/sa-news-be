import { prisma } from "../../prisma/db/connection";

export const selectArticles = async () => {
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
  });

  const mappedArticles = articles.map(({ _count, ...article }) => {
    return {
      ...article,
      comment_count: _count.comments,
    };
  });

  return mappedArticles;
};
