import React, { ReactElement } from "react";

export type MessageResponse = {
    success: boolean,
    message: string;
}

export interface Address {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: number | undefined;
    addType: string;
}

export interface User {
    name: string;
    email: string;
    password: string;
    photo: string;
    gender: string;
    role: string;
    addressInfo: Address[];
    dob: string;
    _id: string;
}

export interface UserDetails {
    joined: string;
    totalOrders: number;
    totalTransection: number;
    lastOrder: string | null;
}

export interface Product {
    _id: string;
    photos: string[];
    name: string;
    price: number | null;
    stock: number | null;
    category: string;
    description: string;
    specification: string;
    discount: number | null;
}

export type ShippingInfo = {
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: number | undefined;
}

export type CartItem = {
    _id?: string;
    productId: string;
    userId?: string;
    name: string;
    photo: string;
    price: number;
    discount: number;
    quantity: number;
    stock: number;
}

export type OrderItem = Omit<CartItem, "stock"> & { _id: string };

export type Order = {
    orderItems: OrderItem[];
    shippingInfo: ShippingInfo;
    subTotal: number;
    tax: number;
    shippingCharges: number;
    discount: number;
    total: number;
    status: string;
    user: {
        name: string;
        _id: string;
    };
    _id: string;
};

export interface SearchRequestQuery {
    search?: string;
    price?: string;
    category?: string;
    sort?: string;
    page?: string;
}

export interface BaseQuery {
    name?: {
        $regex: string;
        $options: string;
    }
    price?: {
        $lte: number;
    }
    category?: string;
}

export interface Categories {
    _id: string;
    name: string;
    description: string;
}

type CountAndChange = {
    revenue: number;
    product: number;
    user: number;
    order: number;
};

type LatestTransaction = {
    _id: string;
    user: string;
    amount: number;
    products: OrderItem[];
}

export type Stats = {
    categoriesCount: Record<string, number>[],
    changePercent: CountAndChange,
    count: CountAndChange,
    chart: {
        user: number[],
        product: number[],
        order: number[],
        revenue: number[],
    },
    userRatio: {
        male: number;
        female: number;
    },
    recentOrder: OrderItem[],
    latestProducts: Product[],
}

export type Bars = {
    users: number[];
    products: number[];
    orders: number[];
}

export type Lines = {
    users: number[];
    products: number[];
    discount: number[];
    revenue: number[];
}

type OrderFullfillment = {
    processing: number;
    shipped: number;
    delivered: number;
};

type RevenueDistribution = {
    netMargin: number;
    discount: number;
    productionCost: number;
    tax: number;
    marketingCost: number;
};

type UsersAgeGroup = {
    teen: number;
    adult: number;
    old: number;
};

export type Pies = {
    orderFullfillment: OrderFullfillment;
    productCategories: Record<string, number>[];
    stockAvailablity: {
        inStock: number;
        outOfStock: number;
    };
    revenueDistribution: RevenueDistribution;
    usersAgeGroup: UsersAgeGroup;
    customers: {
        admin: number;
        customer: number;
    };
}

export interface columnsType {
    name: string,
    uid: string
}

export interface TUserType {
    _id: string;
    photo: ReactElement;
    name: string;
    email: string;
    gender: string;
    role: React.JSX.Element;
    action: React.JSX.Element;
}

export interface TProductType {
    _id: string;
    photo: React.JSX.Element;
    name: React.JSX.Element;
    price: number | null;
    discount: React.JSX.Element;
    stock: number | null;
    action: React.JSX.Element;
}

export interface TOrderType {
    _id: string;
    user: string;
    amount: number;
    products: React.JSX.Element;
    status: React.JSX.Element;
    action: React.JSX.Element;
}

export interface TTransactionType {
    _id: string,
    user: string,
    amount: number,
    products: React.JSX.Element;
    action: React.JSX.Element;
}
export interface TRecentOrderType {
    _id: number;
    photo: React.JSX.Element;
    product: React.JSX.Element;
    price: number;
    quantity: string;
    total: number;
}

export interface TCategoryType {
    _id: string;
    name: React.JSX.Element;
    description: React.JSX.Element;
    action: React.JSX.Element;
}

export type ItemsType =
    TUserType |
    TProductType |
    TOrderType |
    TTransactionType |
    TRecentOrderType |
    TCategoryType
;