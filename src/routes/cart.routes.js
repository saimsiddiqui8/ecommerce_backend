import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addToCart} from "../controllers/cart.controllers.js";

const cartRouter = Router();

cartRouter.route("/add-to-cart").post(verifyJWT, addToCart);
// cartRouter.route("/remove-from-cart").delete(verifyJWT, removeFromCart);
// cartRouter.route("/view-cart").get(verifyJWT, viewCart);
// cartRouter.route("/update-cart").put(verifyJWT, updateCart);

export default cartRouter;
