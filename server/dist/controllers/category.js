import { TryCatch } from "../middlewares/error.js";
import { Category } from "../models/categories.js";
import ErrorHandler from "../utils/utility-class.js";
export const newCategory = TryCatch(async (req, res, next) => {
    const { name, description } = req.body;
    if (!name)
        return next(new ErrorHandler('Name was not provided', 400));
    await Category.create({ name, description });
    return res.status(201).json({
        success: true,
        message: 'Category created successfully',
    });
});
export const getAllCategories = TryCatch(async (req, res, next) => {
    const categories = await Category.find({});
    return res.status(200).json({
        success: true,
        categories,
    });
});
export const updateCategory = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name)
        return next(new ErrorHandler('Name was not provided', 400));
    const category = await Category.findById(id);
    if (!category)
        return next(new ErrorHandler('Category Not Found!', 400));
    category.name = name;
    category.description = description;
    await category.save();
    return res.status(200).json({
        success: true,
        message: 'Category Updated Successfully',
    });
});
export const deleteCategory = TryCatch(async (req, res, next) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    if (!category)
        return next(new ErrorHandler('Category Not Found!', 400));
    await category.deleteOne();
    return res.status(200).json({
        success: true,
        message: 'Category Deleted Successfully',
    });
});
