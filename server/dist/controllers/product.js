import { TryCatch } from "../middlewares/error.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import { faker } from '@faker-js/faker';
import { myCache } from "../app.js";
import { invalidateCache } from "../utils/features.js";
export const newProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category, description, specification, discount } = req.body;
    const photos = req.files.map((file) => file.path);
    if (!name || !price || !stock || !category) {
        photos.forEach((photo) => {
            rm(photo, () => {
                console.log('Deleted');
            });
        });
        return next(new ErrorHandler("Please enter All Fields", 400));
    }
    await Product.create({
        name, price, stock,
        category: category.toLowerCase(),
        photos,
        description,
        specification: JSON.parse(specification),
        discount,
    });
    // Remove the Cache || Revalidate cache
    invalidateCache({ product: true, admin: true });
    return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
    });
});
// Revalidate on New,Update,Delete Product & on New Order
export const getLatestProduct = TryCatch(async (req, res, next) => {
    let products;
    if (myCache.has("latest-products"))
        products = JSON.parse(myCache.get("latest-products"));
    else {
        products = await Product.find({}).sort({ createdAt: -1 }).limit(10);
        myCache.set("latest-products", JSON.stringify(products));
    }
    return res.status(201).json({
        success: true,
        products,
    });
});
// Revalidate on New,Update,Delete Product & on New Order
export const getAllCategories = TryCatch(async (req, res, next) => {
    let categories;
    if (myCache.has("categories"))
        categories = JSON.parse(myCache.get("categories"));
    else {
        categories = await Product.distinct("category");
        myCache.set("categories", JSON.stringify(categories));
    }
    return res.status(201).json({
        success: true,
        categories,
    });
});
// Revalidate on New,Update,Delete Product & on New Order
export const getAdminProducts = TryCatch(async (req, res, next) => {
    let products;
    if (myCache.has("all-products"))
        products = JSON.parse(myCache.get("all-products"));
    else {
        products = await Product.find({});
        myCache.set("all-products", JSON.stringify(products));
    }
    return res.status(201).json({
        success: true,
        products,
    });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
    let product;
    const id = req.params.id;
    if (myCache.has(`product-${id}`))
        product = JSON.parse(myCache.get(`product-${id}`));
    else {
        product = await Product.findById(id);
        myCache.set(`product-${id}`, JSON.stringify(product));
    }
    if (!product)
        return next(new ErrorHandler("Product Not Found", 404));
    return res.status(201).json({
        success: true,
        product,
    });
});
export const updateProduct = TryCatch(async (req, res, next) => {
    const { name, price, stock, category, removePhoto, discount, description, specification } = req.body;
    const { id } = req.params;
    const photos = req.files.map((file) => file.path);
    const product = await Product.findById(id);
    if (!product)
        return next(new ErrorHandler("Invalid Product Id", 404));
    if (removePhoto && JSON.parse(removePhoto).length > 0) {
        JSON.parse(removePhoto).map((photo) => {
            rm(photo, () => {
                console.log('Old Photo Deleted');
            });
        });
        product.photos = product.photos.filter((photo) => !removePhoto.includes(photo));
    }
    if (photos && photos.length > 0) {
        product.photos = [...product.photos, ...photos];
    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (category)
        product.category = category;
    if (discount)
        product.discount = discount;
    if (description)
        product.description = description;
    if (specification)
        product.specification = JSON.parse(specification);
    await product.save();
    // Remove the Cache || Revalidate cache
    invalidateCache({ product: true, productId: String(product._id), admin: true });
    return res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
    });
});
export const deleteProduct = TryCatch(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product)
        return next(new ErrorHandler("Product Not Found", 404));
    // rm(product.photo, () => {
    //     console.log('Product Photo Deleted');
    // })
    await product.deleteOne();
    // Remove the Cache || Revalidate cache
    invalidateCache({ product: true, productId: String(product._id), admin: true });
    return res.status(201).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});
export const getAllProducts = TryCatch(async (req, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 20;
    const skip = (page - 1) * limit;
    let categories;
    if (myCache.has("categories"))
        categories = JSON.parse(myCache.get("categories"));
    else {
        categories = await Product.distinct("category");
        myCache.set("categories", JSON.stringify(categories));
    }
    const baseQuery = {};
    if (search)
        baseQuery.name = {
            $regex: search,
            $options: "i",
        };
    if (price)
        baseQuery.price = { $lte: Number(price), };
    if (category)
        baseQuery.category = category;
    const productsPromise = Product.find(baseQuery)
        .sort(sort && { price: sort === 'asc' ? 1 : -1 })
        .limit(limit)
        .skip(skip);
    const [products, filteredOnlyProduct] = await Promise.all([
        productsPromise,
        Product.find(baseQuery),
    ]);
    const totalPage = Math.ceil(filteredOnlyProduct.length / 20);
    return res.status(200).json({
        success: true,
        products,
        totalPage,
        categories
    });
});
const generateRandomProducts = async (count = 10) => {
    const products = [];
    for (let i = 0; i < count; i++) {
        const product = {
            name: faker.commerce.productName(),
            photo: "uploads\\5ba9bd91-b89c-40c2-bb8a-66703408f986.png",
            price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
            stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
            category: faker.commerce.department(),
            createdAt: new Date(faker.date.past()),
            updatedAt: new Date(faker.date.recent()),
            __v: 0,
        };
        products.push(product);
    }
    await Product.create(products);
};
// generateRandomProducts(50);
// const deleteRandomsProducts = async () => {
//   const products = await Product.find({}).skip(2);
//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }
//   console.log({ succecss: true });
// };
// deleteRandomsProducts()
