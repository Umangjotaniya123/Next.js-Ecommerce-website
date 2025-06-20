import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";
import jwt from 'jsonwebtoken';
export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    if (!id)
        return next(new ErrorHandler("Please Login First!!!", 401));
    const user = await User.findById(id);
    // console.log(id, user);
    if (!user)
        return next(new ErrorHandler("Invalid Id", 401));
    if (user.role !== 'admin')
        return next(new ErrorHandler("Sorry, you are not admin!", 401));
    next();
});
export const verifyToken = TryCatch(async (req, res, next) => {
    let token = null;
    if (req.cookies?.token)
        token = req.cookies.token;
    if (req.query?.token)
        token = req.query.token;
    // console.log("token", token);
    if (!token)
        return res.json({});
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(_id);
    // console.log(user);
    if (!user)
        return next(new ErrorHandler('User Not Found', 401));
    return res.json({ user });
});
export const isUserLogin = TryCatch(async (req, res, next) => {
    let token = null;
    if (req.cookies?.token)
        token = req.cookies.token;
    if (req.headers?.token)
        token = req.headers.token;
    if (!token)
        return next(new ErrorHandler("Please Login First!!!", 401));
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);
    req.query = { id: _id };
    next();
});
