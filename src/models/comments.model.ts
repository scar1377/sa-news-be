import { prisma } from "../../prisma/db/connection";

export const selectCommentsByArticleId = async (id: number) => {
  const comments = await prisma.comment.findMany({
    where: { article_id: id },
  });

  return comments;
};

export const addCommentByArticleId = async (
  id: number,
  newComment: { username: string; body: string },
) => {
  const { username, body } = newComment;
  const comment = await prisma.comment.create({
    data: { author: username, body, article_id: id },
  });
  return comment;
};

export const removeCommentById = async (id: number) => {
  await prisma.comment.delete({
    where: {
      comment_id: id,
    },
  });
};
