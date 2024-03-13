import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Product title is required'],
    },
    price: {
        type: Number,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        lowercase: true,
        trim: true,
        required: true,

    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    images: {
        type: String,
    },
}, {
    timestamps: true
})



export const Product = mongoose.model("Product", ProductSchema);