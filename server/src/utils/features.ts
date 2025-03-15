import mongoose, { Document } from "mongoose"
import { InvalidateCacheProps, OrderItemType } from "../types/types.js";
import { Product } from "../models/product.js";
import { myCache } from "../app.js";
import { IUser } from "../models/user.js";

export const connectDB = (URI: string) => {
    mongoose.connect(URI, {
        dbName: "Ecommerce_FS",
    })
        .then((c) => console.log(`DB Connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
}

export const invalidateCache = (
    { product, admin, order, userId, orderId, productId }: InvalidateCacheProps) => {

    if (product) {
        const productKeys: string[] = [
            "latest-products", "categories", "all-products",
        ];

        if (typeof productId === 'string') productKeys.push(`product-${productId}`);

        if (typeof productId === 'object')
            productId.forEach((i) =>
                productKeys.push(`product-${i}`)
            );

        myCache.del(productKeys);
    }

    if (order) {
        const orderKeys: string[] = [
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

type cookieProps = {
    user: IUser | null;
    res: any;
    message: string;
    statusCode: number;
}

// export const setCookie = (user, res, message, statusCode): cookieProps => {

// };

// From Order Items...
export const reduceStock = async (orderItems: OrderItemType[]) => {
    for (let order of orderItems) {
        const product = await Product.findById(order.productId);
        if (!product) throw new Error("Product Not Found");
        product.stock -= order.quantity;
        await product.save();
    }
};

export const calculatePercentage = (thisMonth: number, lastMonth: number) => {

    if (lastMonth === 0) return Number(thisMonth * 100);

    const percent = ((thisMonth) / lastMonth) * 100;
    return Number(percent.toFixed(0));
};

export const getInventories = async (
    { categories, productsCount }: { categories: string[], productsCount: number }
) => {

    const categoriesCountPromise = categories.map((category) =>
        Product.countDocuments({ category })
    );

    const categoriesCount = await Promise.all(categoriesCountPromise);

    const categoryCount: Record<string, number>[] = [];

    categories.forEach((category, i) => {
        categoryCount.push({
            [category]: Math.round((categoriesCount[i] / productsCount) * 100),
        });
    });
    return categoryCount;
}

interface MyDocument extends Document {
    createdAt: Date;
    discount?: number;
    total?: number;
}

type FuncProps = {
    length: number;
    docArr: Document[];
    today: Date;
    property?: "discount" | "total";
}

export const getChartData = ({ length, docArr, today, property }: FuncProps) => {

    
    const data: number[] = new Array(length).fill(0);

    docArr.forEach((i) => {
        const creationDate = (i as MyDocument).createdAt;
        const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

        if (monthDiff < length) {
            if (property)
                data[length - 1 - monthDiff] += (i as MyDocument)[property]!;
            else
                data[length - 1 - monthDiff] += 1;
        }
    });

    return data;
};