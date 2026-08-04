import { PrismaClient } from "@prisma/client/extension";
import { topics } from "./data/development-data";

const prisma = new PrismaClient();

const main = async () => {};

main()
  .catch(() => {})
  .finally(() => {
    // db.end();
  });
