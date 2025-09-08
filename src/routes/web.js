import express from "express";
import homeController from '../controller/homeController';
import apiController from '../controller/apiController';
const router = express.Router();

/**
 * 
 * @param {*} app : express app
 * @returns 
 */

const initWebRoutes = (app) => {
    router.get("/", homeController.handleHelloWord);
    router.get("/user", homeController.handleUser);
    router.post("/users/create-user", homeController.handleCreateNewUser);
    router.post("/users/delete-user/:id", homeController.handleDeleteUser);
    router.get("/users/update-user/:id", homeController.getUpdateUserPage);
    router.post("/users/update-user", homeController.handleUpdateUserPage);


    router.get("/api/user", apiController.getAllUsers);

    return app.use("/", router);

}

export default initWebRoutes;