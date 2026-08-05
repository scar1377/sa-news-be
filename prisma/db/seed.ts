import "dotenv/config";
import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { topics, users, articles, comments } from "./data/development-data";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({ adapter });

const main = async () => {
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();
  await prisma.topic.deleteMany();

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
};

main()
  .catch((err) => {
    console.error(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
