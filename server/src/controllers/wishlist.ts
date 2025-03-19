import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import { Product } from "../models/product.js";
import wishlist from "../models/wishlist.js";
import Wishlist from "../models/wishlist.js";
import { WishlistItems } from "../types/types.js";

export const addTowishlist = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.body;
    const { id } = req.query;

    if (!id) return next(new ErrorHandler('Please login to add product to wishlist', 401));

    if (!productId) return next(new ErrorHandler('Please provide product id', 400));

    const wishlist = await Wishlist.findOne({ userId: id });

    if (wishlist && Array.isArray(wishlist.productId)) {

        if (wishlist.productId.includes(productId)) {
            res.status(200).json({
                success: true,
                message: 'Product already in wishlist'
            });
        }
        else {
            wishlist.productId.push(productId);
            await wishlist.save();
        }

    } else {

        await Wishlist.create({
            userId: id,
            productId: [productId],
        });

    }

    return res.status(200).json({
        success: true,
        message: 'Product added to wishlist'
    });
});

export const getwishlist = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.query;

    if (!id) return next(new ErrorHandler('Please login to view wishlist', 401));

    const wishlist: WishlistItems | null = await Wishlist.findOne({ userId: id });

    if (!wishlist)
        return res.status(200).json({
            success: true,
            wishlist: [],
        });

    const productsPromise = wishlist.productId.map((productId) => 
        Product.findById(productId).select('name price photos category discount stock specification description')
    )
    const wishlistItems = await Promise.all(productsPromise);

    return res.status(200).json({
        success: true,
        wishlistItems,
    });
});

export const updatewishlist = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.body;
    const { id } = req.query;

    if (!id) return next(new ErrorHandler('Please login to add product to wishlist', 401));

    if (!productId) return next(new ErrorHandler('Please provide product id', 400));

    const wishlist = await Wishlist.findOne({ userId: id });

    if (wishlist && Array.isArray(wishlist.productId)) {

        if (wishlist.productId.includes(productId)) {
            wishlist.productId = wishlist.productId.filter((id) => id !== productId);
            await wishlist.save();
        }
        else {
            return next(new ErrorHandler('Product not found in wishlist', 404));
        }

    } else {
        return next(new ErrorHandler('Product not found in wishlist', 404));
    }

    return res.status(200).json({
        success: true,
        message: 'Product removed from wishlist'
    });
});