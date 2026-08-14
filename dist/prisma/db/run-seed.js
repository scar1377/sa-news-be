import { prisma } from "../../prisma/db/connection";
import { devData } from "./data/development-data";
import { seed } from "./seed";
seed(prisma, devData)
    .catch((err) => {
    console.error(err);
})
    .finally(async () => {
    await prisma.$disconnect();
});
