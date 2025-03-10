import mongoose from 'mongoose';
const WatchListSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: [String], required: true },
}, {
    timestamps: true,
});
const WatchList = mongoose.model('WatchList', WatchListSchema);
export default WatchList;
