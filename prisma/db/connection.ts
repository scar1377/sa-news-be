import dotenv from "dotenv";
import { PrismaClient } from "../../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env.dev",
});

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
