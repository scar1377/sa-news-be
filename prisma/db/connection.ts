import dotenv from "dotenv";
import { PrismaClient } from "../../src/generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

if (process.env.NODE_ENV === "test") {
  dotenv.config({ path: ".env.test" });
} else if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.dev" });
}
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
