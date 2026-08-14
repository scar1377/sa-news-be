import { prisma } from "../../prisma/db/connection";
export const selectTopics = async () => {
    const topics = await prisma.topic.findMany();
    return topics;
};
