import { prisma } from "../../prisma/db/connection.js";
export const isCustomError = (error) => {
    if (typeof error !== "object" || error === null) {
        return false;
    }
    if (!("status" in error) || !("msg" in error)) {
        return false;
    }
    return typeof error.status === "number" && typeof error.msg === "string";
};
export const isValidId = (id) => {
    return !Number.isNaN(id) && Number.isInteger(id);
};
export const checkUserExists = async (username) => {
    const existedUser = await prisma.user.findUnique({
        where: {
            username,
        },
    });
    if (!existedUser) {
        return Promise.reject({
            status: 404,
            msg: `User does not exist`,
        });
    }
};
export const isSortByQuery = (sort_by) => {
    const sortByGreenList = [
        "article_id",
        "title",
        "topic",
        "created_at",
        "author",
        "votes",
        "comment_count",
    ];
    if (typeof sort_by === "string" && sortByGreenList.includes(sort_by))
        return true;
    else
        return false;
};
export const isOrderQuery = (order) => {
    const orderGreenList = ["asc", "desc"];
    if (typeof order === "string" && orderGreenList.includes(order.toLowerCase()))
        return true;
    else
        return false;
};
export const checkTopicExists = async (slug) => {
    const topic = await prisma.topic.findUnique({
        where: {
            slug,
        },
    });
    if (!topic) {
        return Promise.reject({
            status: 404,
            msg: `Topic does not exist`,
        });
    }
};
