import { selectTopics } from "../models/topics.model.js";
export const getTopics = (req, res, next) => {
    selectTopics()
        .then((topics) => {
        res.status(200).send({ topics });
    })
        .catch(next);
};
