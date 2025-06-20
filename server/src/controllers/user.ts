import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";
import { rm } from "fs";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDateInfo } from "../utils/features.js";
import { Order } from "../models/order.js";

export const registerUser = TryCatch(
    async (
        req: Request<{}, {}, NewUserRequestBody>,
        res: Response,
        next: NextFunction
    ) => {
        // const { name, email, photo, gender, _id, dob } = req.body;
        const { name, email, password, gender, dob } = req.body;

        let user = await User.findOne({ email });

        if (user)
            return res.status(400).json({
                success: false,
                message: 'User Already Exist',
            })

        if (!name || !email || !password || !gender || !dob)
            return next(new ErrorHandler("Please fill all details", 400));

        const hashPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name, email, gender, dob, password: hashPassword,
        });

        // setCookie(user, res, `welcome, ${user.name}`, 201);
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '10d' });

        res.cookie("token", token, { path: '/', httpOnly: true });

        return res.status(201)
            .json({
                success: true,
                message: `welcome, ${user.name}`,
            });
    }
);

export const loginUser = TryCatch(async (req, res, next) => {

    const { email, password } = req.body;

    if (!email || !password)
        return next(new ErrorHandler("Please fill all details", 400));

    const user = await User.findOne({ email }).select('+password');

    if (!user) return next(new ErrorHandler('Invalid Email or Password', 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return next(new ErrorHandler('Invalid Email or Password', 400));

    // sendCookie(user, res, `Welcom back, ${user.name}`, 200);
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: '10d' });

    res.cookie("token", token, { path: '/', httpOnly: true });

    return res.status(201)
        .json({
            success: true,
            message: `welcome back, ${user.name}`,
            user,
        });
});

export const logoutUser = TryCatch(async (req, res, next) => {

    // res.setHeader('Set-Cookie', `token=${''}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`);


    return res.status(201)
        .cookie('token', '', { expires: new Date(Date.now()) })
        .json({
            success: true,
            message: `User Logged out`,
        });
})

export const getAllUsers = TryCatch(async (req, res, next) => {
    const users = await User.find({});

    res.status(200).json({
        success: true,
        users,
    });
});

export const getUserDetails = TryCatch(async (req, res, next) => {

    const { id } = req.query;

    const user = await User.findById(id);

    if (!user)
        return next(new ErrorHandler('User Not Found!', 400));

    const joined = getDateInfo(user.createdAt);

    const orders = await Order.find({ user: id }).select(['total', 'orderItems', 'createdAt']);

    let lastOrder = '-';
    let totalTransection = 0;
    let totalOrders = 0;

    if (orders.length) {

        orders.forEach(({ total, orderItems }) => (
            totalTransection += total,
            totalOrders += orderItems.length
        ))

        lastOrder = getDateInfo(orders[orders.length - 1].createdAt);
    }

    return res.status(200).json({
        success: true,
        userData: {
            joined,
            totalOrders,
            totalTransection,
            lastOrder,
        }
    })

})

export const getUsers = TryCatch(async (req, res, next) => {

    const id = req.params.id;
    const user = await User.findById(id);

    if (!user)
        return next(new ErrorHandler("Invalid Id", 400));

    res.status(200).json({
        success: true,
        user,
    });
});

export const deleteUser = TryCatch(async (req, res, next) => {

    const id = req.params.id;
    const user = await User.findById(id);
    // console.log(user, id);
    if (!user)
        return next(new ErrorHandler("Invalid Id", 400));

    if (user.role === 'admin')
        return next(new ErrorHandler(`Can't Delete Admin User`, 400))

    if (user.photo)
        rm(user.photo, () => {
            console.log('Old Photo Deleted');
        })


    await user.deleteOne();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully",
    });
});

export const updateUser = TryCatch(async (req, res, next) => {

    const { name, email, gender, dob, addressInfo, role } = req.body;
    const id = req.params.id;
    const photo = (req.files as Express.Multer.File[])?.map((file) => file.path);
    let flag = false;

    const user = await User.findById(id);

    if (!user)
        return next(new ErrorHandler("Invalid Id", 400));

    if (photo && photo.length) {
        if (user.photo)
            rm(user.photo, () => {
                console.log('Old Photo Deleted');
            })
        user.photo = photo[0];
        flag = true;
    }

    else if (role) {
        if (user.role !== role) {
            user.role = role;
            flag = true;
        }
    }

    else if (addressInfo) {
        if (addressInfo && JSON.stringify(user.addressInfo) !== addressInfo) {
            user.addressInfo = JSON.parse(addressInfo);
            flag = true;
        }
    }

    else {
        if (!name || !gender || !email || !dob)
            return next(new ErrorHandler("Please fill all details", 400));

        if (user.name !== name ||
            user.email !== email ||
            user.dob.toISOString().split('T')[0] !== dob ||
            user.gender !== gender
        ) {
            user.name = name;
            user.email = email;
            user.dob = dob;
            user.gender = gender;
            flag = true;
        }
    }

    if (flag) {
        console.log('Updated')
        await user.save();
    }
    res.status(200).json({
        success: true,
        message: `User ${photo ? 'photo' : ''} Updated Successfully`,
    });
})

interface ValidationProps {
    user: InstanceType<typeof User>;
    key: keyof InstanceType<typeof User>;
    value: any
}

const validation = ({ user, key, value }: ValidationProps): boolean => {

    if (key == 'addressInfo' && JSON.stringify(user[key]) === value) {
        return false;
    }

    if (key == 'dob' && user[key].toISOString().split('T')[0] === value)
        return false;

    return user[key] !== value;
}