import express from "express";
import apiController from '../controller/apiController';
import userController from '../controller/userController';
import groupController from "../controller/groupController";
import { checkUserJWT, checkUserPermission } from "../middleware/JWTAction"; // các middleware

const router = express.Router();

/**
 * 
 * @param {*} app : express app
 * @returns 
 */

const initApiRoutes = (app) => {

    router.all("*", checkUserJWT, checkUserPermission) // check tất cả các method và tất cả các routes nếu thoả mã 2 middleware thì mới dc đi tiếp
    router.get("/user", apiController.getAllUsers);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.get("/account", userController.getUserAccount);

    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete/:id", userController.deleteFunc);

    router.get("/group/read", groupController.readFunc);


    // router.get("/gender/read", genderController.readFunc);




    return app.use("/api/v1/", router);

}

export default initApiRoutes;