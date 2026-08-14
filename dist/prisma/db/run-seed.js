import { prisma } from "../../prisma/db/connection.js";
import { devData } from "./data/development-data/index.js";
import { seed } from "./seed.js";
seed(prisma, devData)
    .catch((err) => {
    console.error(err);
})
    .finally(async () => {
    await prisma.$disconnect();
});
