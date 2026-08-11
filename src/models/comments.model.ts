import { prisma } from "../../prisma/db/connection";

export const selectCommentsByArticleId = async (id: number) => {
  const comments = await prisma.comment.findMany({
    where: { article_id: id },
  });

  return comments;
};
