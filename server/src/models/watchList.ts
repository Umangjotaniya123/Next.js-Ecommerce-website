import mongoose, { Schema } from 'mongoose';

const WatchListSchema: Schema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: [String], required: true },

}, {
    timestamps: true,
});

const WatchList = mongoose.model('WatchList', WatchListSchema);

export default WatchList;