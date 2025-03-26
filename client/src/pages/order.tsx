import { RecentOrders } from '@/components/DashboardTable';
import TableHook from '@/components/TableHook';
import Axios from '@/config/axios';
import { Order, OrderItem } from '@/types/types';
import { decryptedData, encryptedData } from '@/utilities/features';
import { Skeleton } from '@heroui/react';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'

const order = ({ data }: { data: string }) => {

    const [orderData, setOrderData] = useState<OrderItem[] | []>([]);

    useEffect(() => {

        if (data)
            setOrderData(decryptedData(data));

    }, [data])

    console.log(orderData);

    return (
        <div className="flex flex-col items-center gap-6 px-4 py-8 text-lg">
            <h1 className="heading text-xl sm:text-2xl font-semibold">My Orders</h1>
            {
                (Array.isArray(orderData) && orderData.length > 0) &&
                <div className='w-[60%]'>
                    <RecentOrders data={orderData} />
                </div>
            }
        </div>
    );

}

export default order;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    let order = null;
    const { token } = req.cookies;

    try {
        const { data } = await Axios.get(`/order/my`, {
            headers: { token },
        });

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
