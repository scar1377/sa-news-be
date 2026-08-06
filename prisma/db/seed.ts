import { PrismaClient } from "../../src/generated/prisma/client";
import { createRef } from "../utils/util-functions";

export type TopicRawData = {
  slug: string;
  description: string;
  img_url: string;
};

export type UserRawData = {
  username: string;
  name: string;
  avatar_url: string;
};

export type ArticleRawData = {
  title: string;
  topic: string;
  author: string;
  body: string;
  created_at: number | Date;
  votes: number;
  article_img_url: string;
};

export type CommentRawData = {
  body: string;
  votes: number;
  author: string;
  article_title: string;
  created_at: number | Date;
};
export type SeedData = {
  topics: TopicRawData[];
  users: UserRawData[];
  articles: ArticleRawData[];
  comments: CommentRawData[];
};

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
