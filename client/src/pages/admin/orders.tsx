import dynamic from "next/dynamic";
import Link from "next/link";
import TableHook from "@/components/TableHook";
import { Order } from "@/types/types";
import { Tooltip } from "@heroui/react";
import Axios from "@/config/axios";
import { decryptedData, encryptedData, responseToast } from "@/utilities/features";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { FaTrash } from "react-icons/fa";

const AdminSidebar = dynamic(() => import('@/components/AdminSidebar'));

const columns = [
    {
        name: "User",
        uid: "user",
    },
    {
        name: "Amount",
        uid: "amount",
    },
    {
        name: "Products",
        uid: "products"
    },
    {
        name: "Status",
        uid: "status",
    },
    {
        name: "Action",
        uid: "action",
    },
];

const Orders = ({ data }: { data: string }) => {

    const { user } = useAuth();
    const router = useRouter();
    const [ordersData, setOrdersData] = useState<Order[] | []>([]);

    useEffect(() => {
        setOrdersData(decryptedData(data));
    }, [data])

    // console.log(ordersData);

    const handleDelete = async (id: string) => {
        try {
            console.log(user);
            
            const res = await Axios.delete(`order/${id}?id=${user?._id}`);

            responseToast(res);
        } catch (error: any) {
            responseToast(error.response);
        }
    }


    const orders = ordersData?.map((order) => {
        return {
            _id: order?._id,
            user: order?.user?.name,
            amount: order?.total,
            products: (
                <div className="product">
                    {order.orderItems.map(item => (
                        <li key={item._id}>{item.name}</li>
                    ))}
                </div>
            ),
            status: (
                <select
                    className={`border border-gray-300 bg-white dark:bg-transparent rounded-md p-1 cursor-pointer ${order.status === "Processing" ? "text-red-500" : order.status === "Shipped" ? "text-green-500" : "text-purple-500"}`}
                    name="status"
                    id="status"
                    defaultValue={order.status}
                    onChange={(e) => handleChange(e, order._id)}
                >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                </select>
            ),
            action: (
                <button>
                    <Tooltip color="danger" content="Delete Order" className="font-semibold">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                            <FaTrash onClick={() => handleDelete(order._id)} />
                        </span>
                    </Tooltip>
                </button>
            ),
        }
    });

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>, _id: string) => {
        try {
            const res = await Axios.put(`/order/${_id}`, {
                status: e.target.value,
            });

            responseToast(res, router, '/admin/orders');

            if (res.data)
                setOrdersData(ordersData?.map(order => order._id === _id ? { ...order, status: e.target.value } : order));


        } catch (error: any) {
            console.log(error.response);
            responseToast(error.response)
        }
    }

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="w-full flex flex-col items-center max-w-[calc(100% - 360px)] overflow-y-scroll">
                <h1 className="w-[80%] heading text-2xl font-semibold m-4">All Orders</h1>
                <div className="m-8 w-[80%]">
                    {orders && orders.length > 0 && <TableHook columns={columns} items={orders} />}
                </div>
            </main>
        </div>
    );
};

export default Orders;

export const getServerSideProps = async () => {
    let orders = null;

    try {
        const { data } = await Axios.get('/order/all')

        if (data) {
            orders = encryptedData(data.orders);
        }
    } catch (error) {
        console.log(error);
    }

    return {
        props: {
            data: orders,
        }
    }
}
