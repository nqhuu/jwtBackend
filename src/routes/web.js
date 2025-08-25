import express from "express";

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 * @returns 
 */

const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("hello world");
    });

    return app.use("/", router);

}

export default initWebRoutes;