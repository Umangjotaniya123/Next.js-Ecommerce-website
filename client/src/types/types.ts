import { ReactElement } from "react";

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

export interface Product {
    _id: string;
    photos: string;
    name: string;
    price: number;
    stock: number;
    category: string;
    discription: string;
    specification: string;
    discount: number;
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
        order: number[],
        revenue: number[],
    },
    userRatio: {
        male: number;
        female: number;
    },
    latestTransactions: LatestTransaction[],
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
    avatar: ReactElement;
    name: string;
    email: string;
    gender: string;
    role: string;
    action: React.JSX.Element;
}

export interface TProductType {
    _id: string;
    photo: React.JSX.Element;
    name: string;
    price: number;
    stock: number;
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

export type ItemsType =
    TUserType |
    TProductType |
    TOrderType |
    TTransactionType | {
        _id: string;
        amount: number;
        quantity: number;
        discount: number;
        status: React.JSX.Element;
        action: React.JSX.Element;
    }