import express from "express";
import apiController from '../controller/apiController';
const router = express.Router();

/**
 * 
 * @param {*} app : express app
 * @returns 
 */

const initApiRoutes = (app) => {
    router.get("/user", apiController.getAllUsers);
    router.post("/register", apiController.handleRegistor);


    return app.use("/api/v1/", router);

}

export default initApiRoutes;