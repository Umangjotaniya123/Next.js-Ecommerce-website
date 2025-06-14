import { Address } from "cluster";
import { NextFunction, Request, Response } from "express";

export interface NewUserRequestBody {
    name: string;
    email: string;
    password: string;
    photo: string;
    gender: string;
    _id: string;
    dob: Date;
}

export interface UserType {
    name: string;
    email: string;
    photo: string;
    gender: string;
    _id: string;
    dob: string;
    addressInfo: Address[];
}

export interface NewProductRequestBody {
    name: string;
    category: string;
    price: number;
    stock: number;
    discount: number;
    description: string;
    specification: string; 
}

export type ControllerType = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<void | Response<any, Record<string, any>>>;

export type SearchRequestQuery = {
    search?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
};

export interface WishlistItems {
    userId: string;
    productId: string[];
}

export interface BaseQuery {
    name?: {
        $regex: string;
        $options: string;
    };
    price?: {
        $lte: number;
    };
    category?: string;
}

export type InvalidateCacheProps = {
    product?: boolean;
    order?: boolean;
    admin?: boolean;
    userId?: string;
    orderId?: string;
    productId?: string | string[];
};

// Order Types and interface...
export type OrderItemType = {
    name: string;
    phtoto: string;
    price: number;
    quantity: number;
    productId: string;
};

export type ShippingInfoType = {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
};

export interface NewOrderRequestBody {
    shippingInfo: ShippingInfoType;
    user: string;
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    orderItems: OrderItemType[];
};