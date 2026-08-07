import { PrismaClient } from "../../src/generated/prisma/client";
import { SeedData } from "../types/seed.types";
import { createRef } from "../utils/util-functions";

export const seed = async (
  prisma: PrismaClient,
  seedData: SeedData,
): Promise<void> => {
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

  const formattedArticles = articles.map(
    ({ topic, author, created_at, ...article }) => {
      return {
        ...article,
        topicSlug: topic,
        authorUsername: author,
        created_at: new Date(created_at),
      };
    },
  );
  await prisma.article.createMany({ data: formattedArticles });

  const articleData = await prisma.article.findMany({
    select: { article_id: true, title: true },
  });

  const articleIdLookUp = createRef(articleData, "title", "article_id");

  const formattedComments = comments.map(
    ({ author, created_at, article_title, ...comment }) => {
      return {
        ...comment,
        authorUsername: author,
        articleId: articleIdLookUp[article_title],
        created_at: new Date(created_at),
      };
    },
  );
  await prisma.comment.createMany({ data: formattedComments });
};
