import express from "express";
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from "../controller/groupController";
import genderController from "../controller/genderController";

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 * @returns 
 */

const initApiRoutes = (app) => {
    router.get("/user", apiController.getAllUsers);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);


    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete/:id", userController.deleteFunc);

    router.get("/group/read", groupController.readFunc);


    router.get("/gender/read", genderController.readFunc);




    return app.use("/api/v1/", router);

}

export default initApiRoutes;