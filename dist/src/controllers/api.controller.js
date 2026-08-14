import endpoints from "../endpoints.json" with { type: "json" };
export const getEndpoints = (req, res) => {
    res.status(200).send({ endpoints });
};
