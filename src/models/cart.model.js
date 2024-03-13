import mongoose, { Schema } from "mongoose";

const CartItemSchema = new Schema({
    product: {
        type: Object,
        require: true
    },
    quantity: {
        type: Number,
        min: 1,
        default: 1,
        required: true,
    }
});

const CartSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: [CartItemSchema]

}, { timestamps: true })

export const Cart = mongoose.model("Cart", CartSchema);