import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react'
import AddressInfo from '@/components/AddressInfo';
import EditProfileInfo from '@/components/EditPersonalInfo';
import Order from '@/pages/order'
import { useAuth } from '@/context/AuthContext';
import { Address } from '@/types/types';
import Axios from '@/config/axios';
import { responseToast } from '@/utilities/features';
import { FaAddressBook, FaUserAlt } from 'react-icons/fa';
import { RiBillFill } from 'react-icons/ri';

const profile = () => {

    const { user, getUser } = useAuth();
    const [addressInfo, setAddresInfo] = useState<Address | null>(null)

    const [img, setImg] = useState('');
    const [showOrders, setShowOrders] = useState<boolean>(true);
    const [showProfileInfo, setShowProfileInfo] = useState<boolean>(false);
    const [showAddressInfo, setShowAddressInfo] = useState<boolean>(false);

    useEffect(() => {
        if (user) {

            if (user.addressInfo && user.addressInfo.length)
                setAddresInfo(user.addressInfo[0]);

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

            if(res.data){
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
                    {img &&
                        <label htmlFor='imageRef' className='w-40 h-32 '>
                            <Image
                                className="w-full h-full rounded-full border shadow-md cursor-pointer"
                                src={img}
                                alt="User Profile"
                                width={0}
                                height={0}
                                sizes='100vw'
                            />
                        </label>
                    }
                    <div className="text-center w-full p-6">
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">{user?.name}</h2>
                        <p className="text-gray-500 text-sm">Joined 3 months ago</p>

                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div>
                                <p className="text-xl font-bold">₹89400</p>
                                <p className="text-gray-500 text-sm">Total Spent</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold">1 week ago</p>
                                <p className="text-gray-500 text-sm">Last Order</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold">97</p>
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
                {/* {showOrders &&
                    <Order />
                } */}
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
