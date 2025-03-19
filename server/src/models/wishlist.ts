import mongoose, { Schema } from 'mongoose';

const wishlistSchema: Schema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: [String], required: true },

}, {
    timestamps: true,
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

export default Wishlist;