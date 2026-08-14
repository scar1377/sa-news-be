import { createRef } from "../utils/util-functions.js";
export const seed = async (prisma, seedData) => {
    const { topics, users, articles, comments } = seedData;
    await prisma.$executeRawUnsafe(`
  TRUNCATE TABLE
    "Comment",
    "Article",
    "User",
    "Topic"
  RESTART IDENTITY CASCADE
`);
    await prisma.topic.createMany({ data: topics });
    await prisma.user.createMany({ data: users });
    const formattedArticles = articles.map(({ created_at, ...article }) => {
        return {
            ...article,
            created_at: new Date(created_at),
        };
    });
    await prisma.article.createMany({ data: formattedArticles });
    const articleData = await prisma.article.findMany({
        select: { article_id: true, title: true },
    });
    const articleIdLookUp = createRef(articleData, "title", "article_id");
    const formattedComments = comments.map(({ created_at, article_title, ...comment }) => {
        return {
            ...comment,
            article_id: articleIdLookUp[article_title],
            created_at: new Date(created_at),
        };
    });
    await prisma.comment.createMany({ data: formattedComments });
};
