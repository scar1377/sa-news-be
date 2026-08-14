import endpoints from "../endpoints.json";
export const getEndpoints = (req, res) => {
    res.status(200).send({ endpoints });
};
