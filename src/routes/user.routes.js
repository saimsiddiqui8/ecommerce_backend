import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    changeUserPassword,
    deleteUser,
    getAllUsers,
    getSingleUser,
} from "../controllers/user.controllers.js";


const userRouter = Router();


//routes with Authentication
userRouter.route("/get-all-users").get(verifyJWT, getAllUsers);
userRouter.route("/get-single-user").get(verifyJWT, getSingleUser);
userRouter.route("/delete-user").delete(verifyJWT, deleteUser);
userRouter.route("/change-password").post(verifyJWT, changeUserPassword);


export default userRouter;