import { selectUsers } from "../models/users.model.js";
export const getUsers = (req, res, next) => {
    selectUsers()
        .then((users) => {
        res.status(200).send({ users });
    })
        .catch(next);
};
