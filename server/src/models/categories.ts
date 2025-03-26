import mongoose from "mongoose";

const schema = new mongoose.Schema({

    name: {
        type: String,
        require: ['Place enter the name of category'],
    },
    description: {
        type: String,
    },
}, {
    timestamps: true
});

export const Category = mongoose.model('Categories', schema);