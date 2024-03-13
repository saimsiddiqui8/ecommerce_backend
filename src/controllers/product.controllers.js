import { isValidObjectId } from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"
import { validateRequiredFields } from "../utils/validations.js";

const addProduct = asyncHandler(async (req, res) => {
    const { title, price, description, category, rating, images } = req.body;
    validateRequiredFields([title, price, description, category, rating, images], res)

    if (typeof price !== 'number' || typeof rating !== 'number') {
        return res.status(400).json(new ApiResponse(400, "Price and rating must be numbers"));
    }

    const product = await Product.create({
        title,
        price,
        description,
        category,
        rating,
        images
    })

    return res.status(201).json(new ApiResponse(201, "Product Created Successfully!", product))
})

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();

    if (!products || products.length === 0) {
        return res.status(404).json(new ApiResponse(404, "No product Found"));
    }

    return res.status(200).json(new ApiResponse(200, "Products found", products))
})

const getSingleProduct = asyncHandler(async (req, res) => {
    const { productID } = req.body

    if (!isValidObjectId(productID)) {
        return res.status(400).json({ status: 400, success: false, message: 'Invalid product ID' });
    }

    const singleProduct = await Product.findById(productID);

    return res.status(200).json(new ApiResponse(200, "Product found", singleProduct))
})

const editProduct = asyncHandler(async (req, res) => {
    const { productID, title, price, description, category, rating, images } = req.body;

    validateRequiredFields([productID, title, price, description, category, rating, images], res);

    if (!isValidObjectId(productID)) {
        return res.status(400).json({ status: 400, success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findById(productID);
    if (!product) {
        return res.status(404).json({ status: 404, success: false, message: 'No product found' });

    }
    product.title = title || product.title
    product.price = price || product.price
    product.description = description || product.description
    product.category = category || product.category
    product.rating = rating || product.rating
    product.images = images || product.images

    const updatedProduct = await product.save();

    return res.status(201).json(new ApiResponse(201, "Product Updated Successfully", updatedProduct))
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { productID } = req.body;

    if (!isValidObjectId(productID)) {
        return res.status(400).json({ status: 400, success: false, message: 'Invalid product ID' });
    }

    const result = await Product.deleteOne({ _id: productID })

    if (result.deletedCount === 0) {
        return res.status(404).json(new ApiResponse(404, "Product not found"));
    }

    return res.status(200).json(new ApiResponse(200, "Product deleted successfully"))
})

export {
    addProduct,
    getAllProducts,
    getSingleProduct,
    editProduct,
    deleteProduct
}