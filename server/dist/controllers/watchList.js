import { TryCatch } from "../middlewares/error.js";
import WatchList from "../models/watchList.js";
import ErrorHandler from "../utils/utility-class.js";
export const addToWatchList = TryCatch(async (req, res, next) => {
    const { productId } = req.body;
    const { id } = req.query;
    if (!id)
        return next(new ErrorHandler('Please login to add product to watchlist', 401));
    if (!productId)
        return next(new ErrorHandler('Please provide product id', 400));
    const watchList = await WatchList.findOne({ userId: id });
    if (watchList && Array.isArray(watchList.productId)) {
        if (watchList.productId.includes(productId)) {
            res.status(200).json({
                success: true,
                message: 'Product already in watchlist'
            });
        }
        else {
            watchList.productId.push(productId);
            await watchList.save();
        }
    }
    else {
        await WatchList.create({
            userId: id,
            productId: [productId],
        });
    }
    return res.status(200).json({
        success: true,
        message: 'Product added to watchlist'
    });
});
export const getWatchList = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(new ErrorHandler('Please login to view watchlist', 401));
    const watchList = await WatchList.findOne({ userId: id }).populate('productId');
    return res.status(200).json({
        success: true,
        watchList,
    });
});
