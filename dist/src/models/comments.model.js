import { prisma } from "../../prisma/db/connection.js";
export const selectCommentsByArticleId = async (id) => {
    const comments = await prisma.comment.findMany({
        where: { article_id: id },
    });
    return comments;
};
export const addCommentByArticleId = async (id, newComment) => {
    const { username, body } = newComment;
    const comment = await prisma.comment.create({
        data: { author: username, body, article_id: id },
    });
    return comment;
};
export const removeCommentById = async (id) => {
    await prisma.comment.delete({
        where: {
            comment_id: id,
        },
    });
};
