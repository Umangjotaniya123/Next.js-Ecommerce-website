import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react'
import AddressInfo from '@/components/AddressInfo';
import EditProfileInfo from '@/components/EditPersonalInfo';
import { useAuth } from '@/context/AuthContext';
import { Address, OrderItem, UserDetails } from '@/types/types';
import Axios from '@/config/axios';
import { decryptedData, encryptedData, responseToast } from '@/utilities/features';
import { FaAddressBook, FaUserAlt } from 'react-icons/fa';
import { RiBillFill } from 'react-icons/ri';
import { GetServerSideProps } from 'next';
import { RecentOrders } from '@/components/DashboardTable';
import { Skeleton } from '@heroui/react';
import { TbPhotoEdit } from 'react-icons/tb';

type Props = {
    data: {
        order: string,
        userData: string
    }
}

const profile = ({ data: { order, userData } }: Props) => {

    const { user, getUser } = useAuth();
    const [addressInfo, setAddresInfo] = useState<Address | null>(null);

    const [img, setImg] = useState('/images/profile.webp');
    const [showOrders, setShowOrders] = useState<boolean>(true);
    const [showProfileInfo, setShowProfileInfo] = useState<boolean>(false);
    const [showAddressInfo, setShowAddressInfo] = useState<boolean>(false);
    const [orderData, setOrderData] = useState<OrderItem[] | []>([]);
    const [userDetails, setUserDetails] = useState<UserDetails>();

    useEffect(() => {

        if (order)
            setOrderData(decryptedData(order));

        if (userData)
            setUserDetails(decryptedData(userData));

    }, [order, userData])

    useEffect(() => {
        if (user) {

            if (user.addressInfo && user.addressInfo.length)
                setAddresInfo(user.addressInfo[0]);

            if (user.photo)
                setImg(`${process.env.NEXT_PUBLIC_SERVER}/${user?.photo}`)
        }
    }, [user]);

    const changeImageHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader: FileReader = new FileReader();
        const formData = new FormData();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setImg(reader.result);
                }
            };
            formData.set('photo', file);
        }
        try {
            const res = await Axios.put(`/user/${user?._id}`, formData)

            responseToast(res);

            if (res.data) {
                getUser();
            }

        } catch (error: any) {
            responseToast(error?.response)
        }
    };

    const date = user?.dob.split('T')[0];

    return (
        <div className="profile flex flex-col items-center gap-5 w-full h-full min-h-[calc(100vh-5rem)]">

            <h1 className="heading w-[60%] my-10 text-start text-xl sm:text-2xl">Profile</h1>

            <div className="w-full h-fit flex justify-center gap-5">

                <div className="flex justify-start w-[40%] p-6 border border-yellow-900 bg-orange-100 dark:bg-slate-900 dark:border-slate-200 rounded-lg">
                    <input
                        type="file"
                        accept="image/*"
                        className='hidden'
                        id='imageRef'
                        onChange={changeImageHandler}
                    />
                        <label htmlFor='imageRef' className='w-40 h-32 border-4 rounded-full cursor-pointer relative'>
                            <Image
                                className="w-full h-full rounded-full shadow-md"
                                src={img}
                                alt="User Profile"
                                width={0}
                                height={0}
                                sizes='100vw'
                            />
                            {/* <div className="fixed inset-0 bg-gray-100 bg-opacity-40 backdrop-brightness-50 dark:bg-gray-950/50 dark:bg-opacity-60 dark:backdrop-brightness-90 z-10"></div> */}
                            <div
                                className='absolute top-0 left-0 rounded-full w-full h-full flex justify-center items-center font-bold text-white text-4xl bg-gray-600/50 opacity-0 hover:opacity-100'
                            ><TbPhotoEdit /></div>
                        </label>
                    <div className="text-center w-full p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{user?.name}</h2>
                        {userDetails?.joined && <p className="text-gray-500 text-sm">Joined {userDetails.joined}</p>}

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                                {userDetails && <p className="text-xl font-bold">₹{userDetails.totalTransection}</p>}
                                <p className="text-gray-500 text-sm">Total Spent</p>
                            </div>
                            <div>
                                {userDetails && <p className="text-xl font-bold">{userDetails.lastOrder}</p>}
                                <p className="text-gray-500 text-sm">Last Order</p>
                            </div>
                            <div>
                                {userDetails && <p className="text-xl font-bold">{userDetails.totalOrders}</p>}
                                <p className="text-gray-500 text-sm">Total Orders</p>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="bg-orange-100 dark:bg-slate-900 dark:border-slate-200 border border-yellow-900 p-6 -tracking-tighter rounded-lg shadow-md w-[20%] max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Personal Info</h2>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Email :</span> <span className="font-semibold">{user?.email}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Date of Birth :</span> <span className="font-semibold">{date}</span>
                    </div>
                    {addressInfo &&
                        <div className="flex justify-between py-1">
                            <span>Address :</span> <span className="font-semibold">{`${addressInfo?.city},${addressInfo?.state},${addressInfo?.country}`}</span>
                        </div>
                    }
                </div>
            </div>

            <div className='w-[60%] mt-10 flex items-center gap-8 font-semibold cursor-pointer'>
                <div
                    className={`flex justify-center items-center gap-1 p-1 hover:border-b-2 border-violet-950 hover:text-violet-950 dark:border-violet-600 dark:hover:text-violet-600 
                                ${showOrders ? 'border-b-2 border-violet-950 text-violet-950 dark:border-violet-600 dark:text-violet-600' : ''}`}
                    onClick={() => {
                        setShowOrders(true)
                        setShowProfileInfo(false)
                        setShowAddressInfo(false)
                    }}
                >
                    <RiBillFill />
                    <span>Orders</span>
                </div>
                <div
                    className={`flex justify-center items-center gap-1 p-1 hover:border-b-2 border-violet-950 hover:text-violet-950 dark:border-violet-600 dark:hover:text-violet-600 
                                ${showProfileInfo ? 'border-b-2 border-violet-950 text-violet-950 dark:border-violet-600 dark:text-violet-600' : ''}`}
                    onClick={() => {
                        setShowOrders(false)
                        setShowProfileInfo(true)
                        setShowAddressInfo(false)
                    }}
                >
                    <FaUserAlt />
                    <span>Personal Info</span>
                </div>
                <div
                    className={`flex justify-center items-center gap-1 p-1 hover:border-b-2 border-violet-950 hover:text-violet-950 dark:border-violet-600 dark:hover:text-violet-600 
                                ${showAddressInfo ? 'border-b-2 border-violet-950 text-violet-950 dark:border-violet-600 dark:text-violet-600' : ''}`}
                    onClick={() => {
                        setShowOrders(false)
                        setShowProfileInfo(false)
                        setShowAddressInfo(true)
                    }}
                >
                    <FaAddressBook />
                    <span>Address Info</span>
                </div>
            </div>

            <div className='w-[60%]'>
                {showOrders && (orderData.length ?
                    <div className="h-screen flex flex-col items-center gap-6 px-4 py-8 text-lg">
                        <h1 className="heading text-xl sm:text-2xl font-semibold">My Orders</h1>
                        {
                            (Array.isArray(orderData) && orderData.length) ?
                                <RecentOrders data={orderData} />
                                : <Skeleton />
                        }
                    </div> :
                    <h1 className="heading text-center text-xl sm:text-2xl font-semibold">No Orders Available</h1>)
                }
                {showProfileInfo &&
                    <EditProfileInfo />
                }
                {showAddressInfo &&
                    <AddressInfo />
                }
            </div>
        </div>
    )
}

export default profile;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    let order = null;
    let userData = null;
    const { token } = req.cookies;

    try {
        const { data } = await Axios.get(`/order/my`, {
            headers: { token }
        });

        if (data) {
            order = encryptedData(data.orders);
        }

    } catch (error) {
        console.log(error);
    }

    try {
        const { data } = await Axios.get(`/user/details`, {
            headers: { token },
        });

        if (data) {
            userData = encryptedData(data.userData);
        }

    }
    catch (error: any) {
        console.log(error.response.data.message);
    }

    return {
        props: { data: { order, userData } }
    };
}
