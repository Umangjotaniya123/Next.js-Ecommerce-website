import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add Name"],
    },
    photos: [{
        type: String,
    }],
    price: {
        type: Number,
        required: [true, "Please add Price"],
    },
    stock: {
        type: Number,
        required: [true, "Please add Stock"],
    },
    category: {
        type: String,
        required: [true, "Please add Category"],
        trim: true,
    },
    discount: {
        type: Number,
    },
    description: {
        type: String,
    },
    specification: {
        type: {},
    },
}, {
    timestamps: true,
});

export const Product = mongoose.model("Product", schema);