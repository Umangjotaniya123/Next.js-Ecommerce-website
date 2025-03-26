import mongoose from "mongoose";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";
export const connectDB = (URI) => {
    mongoose.connect(URI, {
        dbName: "Ecommerce_FS",
    })
        .then((c) => console.log(`DB Connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
};
export const invalidateCache = ({ product, admin, order, userId, orderId, productId }) => {
    if (product) {
        const productKeys = [
            "latest-products", "categories", "all-products",
        ];
        if (typeof productId === 'string')
            productKeys.push(`product-${productId}`);
        if (typeof productId === 'object')
            productId.forEach((i) => productKeys.push(`product-${i}`));
        myCache.del(productKeys);
    }
    if (order) {
        const orderKeys = [
            `all-orders`, `my-orders-${userId}`, `order-${orderId}`
        ];
        myCache.del(orderKeys);
    }
    if (admin) {
        myCache.del([
            'admin-stats',
            'admin-pie-charts',
            'admin-bar-charts',
            'admin-line-charts'
        ]);
    }
};
// export const setCookie = (user, res, message, statusCode): cookieProps => {
// };
// From Order Items...
export const reduceStock = async (orderItems) => {
    for (let order of orderItems) {
        const product = await Product.findById(order.productId);
        if (!product)
            throw new Error("Product Not Found");
        product.stock -= order.quantity;
        await product.save();
    }
};
export const calculatePercentage = (thisMonth, lastMonth) => {
    if (lastMonth === 0)
        return Number(thisMonth * 100);
    const percent = ((thisMonth) / lastMonth) * 100;
    return Number(percent.toFixed(0));
};
export const getInventories = async ({ categories, productsCount }) => {
    const categoriesCountPromise = categories.map((category) => Product.countDocuments({ category }));
    const categoriesCount = await Promise.all(categoriesCountPromise);
    const categoryCount = [];
    categories.forEach((category, i) => {
        categoryCount.push({
            [category]: Math.round((categoriesCount[i] / productsCount) * 100),
        });
    });
    return categoryCount;
};
export const getChartData = ({ length, docArr, today, property }) => {
    const data = new Array(length).fill(0);
    docArr.forEach((i) => {
        const creationDate = i.createdAt;
        const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
        if (monthDiff < length) {
            if (property)
                data[length - 1 - monthDiff] += i[property];
            else
                data[length - 1 - monthDiff] += 1;
        }
    });
    return data;
};
export const getDateInfo = (date) => {
    const today = new Date();
    const diffYear = today.getFullYear() - date.getFullYear();
    if (diffYear > 0) {
        const year = diffYear == 1 ? 'year ago' : 'years ago';
        return `${diffYear} ${year}`;
    }
    const diffMonth = (today.getMonth() - date.getMonth() + 12) % 12;
    if (diffMonth > 0) {
        const month = diffMonth == 1 ? 'month ago' : 'months ago';
        return `${diffMonth} ${month}`;
    }
    const diffDate = (today.getDate() - date.getDate() + 30) % 30;
    if (diffDate > 0) {
        if (diffDate == 1)
            return '1 day ago';
        else if (diffDate < 8)
            return `${diffDate} days ago`;
        else if (diffDate < 15)
            return `1 week ago`;
        else {
            const week = Math.floor(diffDate / 7);
            return `${week} weeks ago`;
        }
    }
    return 'Today';
};
