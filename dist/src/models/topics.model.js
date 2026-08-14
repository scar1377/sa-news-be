import { prisma } from "../../prisma/db/connection.js";
export const selectTopics = async () => {
    const topics = await prisma.topic.findMany();
    return topics;
};
