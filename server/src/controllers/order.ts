import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewOrderRequestBody } from "../types/types.js";
import { Order } from "../models/order.js";
import { invalidateCache, reduceStock } from "../utils/features.js";
import ErrorHandler from "../utils/utility-class.js";
import { myCache } from "../app.js";

export const newOrder = TryCatch(
    async (req: Request<{}, {}, NewOrderRequestBody>, res, next) => {
        const {
            shippingInfo,
            user,
            subTotal,
            tax,
            shippingCharges,
            discount,
            total,
            orderItems,
        } = req.body;

        console.log(req.body);


        if (
            !shippingInfo ||
            !user ||
            !subTotal ||
            !tax ||
            !total ||
            !orderItems
        ) return next(new ErrorHandler("Please enter All Fields", 400));


        const order = await Order.create({
            shippingInfo,
            user,
            subTotal,
            tax,
            shippingCharges,
            discount,
            total,
            orderItems,
        });

        await reduceStock(orderItems);
        invalidateCache({
            product: true,
            order: true,
            admin: true,
            userId: user,
            productId: order.orderItems.map(i => String(i.productId)),
        });

        res.status(201).json({
            success: true,
            message: "Order Placed Successfully",
        })
    }
);

export const myOrders = TryCatch(async (req, res, next) => {

    const { id: user } = req.query;
    let orderItem: any[] = [];
    const key = `my-orders-${user}`;

    if (myCache.has(key))
        orderItem = JSON.parse(myCache.get(key) as string);
    else {
        const orders = await Order.find({ user });
        orders.map(({ orderItems }) => {
            orderItem = [...orderItem, ...orderItems]
        })
        myCache.set(key, JSON.stringify(orderItem));
    }

    res.status(200).json({
        success: true,
        orders: orderItem,
    })
});

export const allOrders = TryCatch(async (req, res, next) => {

    let orders = [];
    const key = `all-orders`;

    if (myCache.has(key))
        orders = JSON.parse(myCache.get(key) as string);
    else {
        orders = await Order.find().populate("user", "name");
        myCache.set(key, JSON.stringify(orders));
    }

    res.status(200).json({
        success: true,
        orders,
    })
});

export const getSingleOrder = TryCatch(async (req, res, next) => {

    const { id } = req.params;
    const key = `order-${id}`;
    let order;

    if (myCache.has(key))
        order = JSON.parse(myCache.get(key) as string);
    else {
        order = await Order.findById(id).populate("user", "name");

        if (!order)
            return next(new ErrorHandler("Order Not Found", 404));

        myCache.set(key, JSON.stringify(order));
    }

    res.status(200).json({
        success: true,
        order,
    })
});

export const processOrder = TryCatch(async (req, res, next) => {

    const { id } = req.params;
    const { status } = req.body;
    const order = await Order.findById(id);

    if (!order)
        return next(new ErrorHandler("Order Not Found", 404));

    if (status === order.status) {
        return;
    }

    order.status = status;
    await order.save();

    invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: order.user,
        orderId: String(order._id)
    });

    res.status(200).json({
        success: true,
        message: "Order Processed Successfully",
    })
});

export const deleteOrder = TryCatch(async (req, res, next) => {

    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order)
        return next(new ErrorHandler("Order Not Found", 404));

    await order.deleteOne();

    invalidateCache({
        product: false,
        order: true,
        admin: true,
        userId: order.user,
        orderId: String(order._id)
    });

    res.status(200).json({
        success: true,
        message: "Order Deleted Successfully",
    })
});