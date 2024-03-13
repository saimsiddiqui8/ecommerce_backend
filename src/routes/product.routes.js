import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { addProduct, deleteProduct, editProduct, getAllProducts, getSingleProduct } from "../controllers/product.controllers.js";


const productRouter = Router();


//routes with Authentication
productRouter.route("/add-product").post(verifyJWT, addProduct); //ADMIN ONLY
productRouter.route("/get-all-products").get(verifyJWT, getAllProducts);
productRouter.route("/get-single-product").get(verifyJWT, getSingleProduct);
productRouter.route("/edit-product").put(verifyJWT, editProduct);
productRouter.route("/delete-product").delete(verifyJWT, deleteProduct);


export default productRouter;