import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/product.model.js";
import { isValidObjectId } from "mongoose";
import { Cart } from "../models/cart.model.js";

const addToCart = asyncHandler(async (req, res) => {
    const { productID, quantity } = req.body;
    const { _id } = req.user;

    if (!isValidObjectId(productID)) {
        return res.status(404).json(new ApiResponse(404, "Invalid product ID!"))
    }
    const product = await Product.findById(productID);

    if (!product) {
        return res.status(404).json(new ApiResponse(404, "Product not found!"))
    }

    let cart = await Cart.findOne({ userID: _id });

    if (!cart) {
        // If cart does not exist, create a new cart with the new product
        cart = await Cart.create({
            userID: _id,
            items: [{ product, quantity }]
        });
    } else {
        // Check if the product already exists in the cart
        const existingItemIndex = cart.items.findIndex(item => item.product._id.toString() === product._id.toString());
        if (existingItemIndex !== -1) {
            // If the product exists, update the quantity
            cart.items[existingItemIndex].quantity += quantity;
        } else {
            // If the product does not exist, add the new product to the cart
            cart.items.push({ product, quantity });
        }
        // Save the updated cart
        await cart.save();
    }



    return res.status(201).json(new ApiResponse(201, "Item added to cart successfully!", cart))
})

export { addToCart }