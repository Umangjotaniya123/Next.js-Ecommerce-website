import { RecentOrders } from '@/components/DashboardTable';
import TableHook from '@/components/TableHook';
import Axios from '@/config/axios';
import { Order, OrderItem } from '@/types/types';
import { decryptedData, encryptedData } from '@/utilities/features';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'

const data = [
    {
        "shippingInfo": {
            "address": "Madhuram, Udaybagar-1, st-15, mavadi chokadi",
            "city": "Rajkot",
            "state": "Gujarat",
            "country": "India",
            "pincode": 360000
        },
        "_id": "67908cf287ac7f59761d3e65",
        "user": {
            "_id": "677bcb2b119252e3a77cc29b",
            "name": "Umang Jotaniya"
        },
        "subTotal": 266144,
        "tax": 47906,
        "shippingCharges": 0,
        "discount": 0,
        "total": 314050,
        "status": "Shipped",
        "orderItems": [
            {
                "name": "Laptop - 3",
                "photo": "uploads/5af98d8106f3a8c47cc190c05.webp",
                "price": 132455,
                "quantity": 2,
                "productId": "6787ba4de88165bff1ae82d6",
                "_id": "678a034a477f0990fa9d9d13"
            },
            {
                "name": "nike",
                "photo": "uploads/5af98d8106f3a8c47cc190c06.jpeg",
                "price": 1234,
                "quantity": 1,
                "productId": "67890292b7eec95383fbf5d2",
                "_id": "678a57ba11b28f54f3acd2e4"
            }
        ],
        "createdAt": "2024-02-22T06:15:14.440Z",
        "updatedAt": "2025-01-22T10:45:03.114Z",
        "__v": 0
    },
    {
        "shippingInfo": {
            "address": "Madhuram, Udaybagar-1, st-15, mavadi chokadi",
            "city": "Rajkot",
            "state": "Gujarat",
            "country": "India",
            "pincode": 360000
        },
        "_id": "6790976487ac7f59761d3eeb",
        "user": {
            "_id": "677bcb2b119252e3a77cc29b",
            "name": "Umang Jotaniya"
        },
        "subTotal": 2468,
        "tax": 444,
        "shippingCharges": 0,
        "discount": 0,
        "total": 2912,
        "status": "Processing",
        "orderItems": [
            {
                "name": "nike",
                "photo": "uploads/5af98d8106f3a8c47cc190c06.jpeg",
                "price": 1234,
                "quantity": 2,
                "productId": "67890292b7eec95383fbf5d2",
                "_id": "67908e7387ac7f59761d3ec8"
            }
        ],
        "createdAt": "2024-06-22T06:59:48.116Z",
        "updatedAt": "2025-01-22T06:59:48.116Z",
        "__v": 0
    },
    {
        "shippingInfo": {
            "address": "jfnvj",
            "city": "jsvns",
            "state": "vndsf",
            "country": "India",
            "pincode": 123454
        },
        "_id": "6790cf93450e74dabed11f20",
        "user": {
            "_id": "678a52e27f9bfc759701c4f3",
            "name": "Test 1"
        },
        "subTotal": 2342,
        "tax": 422,
        "shippingCharges": 0,
        "discount": 0,
        "total": 2764,
        "status": "Delivered",
        "orderItems": [
            {
                "name": "shoose",
                "photo": "uploads/5af98d8106f3a8c47cc190c04.jpeg",
                "price": 2342,
                "quantity": 1,
                "productId": "6788dc3cb7eec95383fbeca4",
                "_id": "6790cf57450e74dabed11f18"
            }
        ],
        "createdAt": "2024-06-22T10:59:31.973Z",
        "updatedAt": "2025-01-27T06:53:58.184Z",
        "__v": 0
    },
    {
        "shippingInfo": {
            "address": "jfnvj",
            "city": "dd",
            "state": "ea",
            "country": "India",
            "pincode": 123421
        },
        "_id": "679204b989c43369a41d49ea",
        "user": {
            "_id": "678a52e27f9bfc759701c4f3",
            "name": "Test 1"
        },
        "subTotal": 3576,
        "tax": 644,
        "shippingCharges": 0,
        "discount": 0,
        "total": 4220,
        "status": "Processing",
        "orderItems": [
            {
                "name": "shoose",
                "photo": "uploads/5af98d8106f3a8c47cc190c04.jpeg",
                "price": 2342,
                "quantity": 1,
                "productId": "6788dc3cb7eec95383fbeca4",
                "_id": "6790cf57450e74dabed11f18"
            },
            {
                "name": "nike",
                "photo": "uploads/5af98d8106f3a8c47cc190c06.jpeg",
                "price": 1234,
                "quantity": 1,
                "productId": "67890292b7eec95383fbf5d2",
                "_id": "6792048489c43369a41d49e2"
            }
        ],
        "createdAt": "2025-01-23T08:58:33.216Z",
        "updatedAt": "2025-01-23T08:58:33.216Z",
        "__v": 0
    }
]

const columns = [
    {
        name: "ID",
        uid: "_id",
    },
    {
        name: "Quantity",
        uid: "quantity",
    },
    {
        name: "Discount",
        uid: "discount",
    },
    {
        name: "Amount",
        uid: "amount",
    },
    {
        name: "Status",
        uid: "status",
    },
    {
        name: "Action",
        uid: "action",
    }
];

const order = ({ data }: { data: string}) => {

    const [orderData, setOrderData] = useState<OrderItem[] | []>([]);

    useEffect(() => {
        setOrderData(decryptedData(data));
        console.log(decryptedData(data));
        
    }, [data])

    return (
        <div className="h-screen flex flex-col items-center gap-6 px-4 py-8 text-lg">
            <h1 className="heading text-xl sm:text-2xl font-semibold">My Orders</h1>
            {
                // isLoading ? <Skeleton length={20} /> : 
                <RecentOrders data={orderData} />
            }
        </div>
    );

}

export default order;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    let order = null;
    const { token } = req.cookies;

    try {
        const { data } = await Axios.get(`/order/my?token=${token}`);
        console.log(data);
        
        if (data) {
            order = encryptedData(data.orders);
        }

    } catch (error) {
        console.log(error);
    }

    return {
        props: { data: order }
    };
}
