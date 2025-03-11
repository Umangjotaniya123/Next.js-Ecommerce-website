import { TryCatch } from "../middlewares/error.js";
import WatchList from "../models/watchList.js";
import ErrorHandler from "../utils/utility-class.js";
import { Product } from "../models/product.js";
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
    const watchList = await WatchList.findOne({ userId: id });
    if (!watchList)
        return res.status(200).json({
            success: true,
            watchList: [],
        });
    const productsPromise = watchList.productId.map((productId) => Product.findById(productId).select('name price photos category discount stock specification description'));
    const watchListItems = await Promise.all(productsPromise);
    return res.status(200).json({
        success: true,
        watchListItems,
    });
});
export const updateWatchList = TryCatch(async (req, res, next) => {
    const { productId } = req.body;
    const { id } = req.query;
    if (!id)
        return next(new ErrorHandler('Please login to add product to watchlist', 401));
    if (!productId)
        return next(new ErrorHandler('Please provide product id', 400));
    const watchList = await WatchList.findOne({ userId: id });
    if (watchList && Array.isArray(watchList.productId)) {
        if (watchList.productId.includes(productId)) {
            watchList.productId = watchList.productId.filter((id) => id !== productId);
            await watchList.save();
        }
        else {
            return next(new ErrorHandler('Product not found in watchlist', 404));
        }
    }
    else {
        return next(new ErrorHandler('Product not found in watchlist', 404));
    }
    return res.status(200).json({
        success: true,
        message: 'Product removed from watchlist'
    });
});
