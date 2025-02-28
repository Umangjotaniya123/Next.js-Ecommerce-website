import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import AddressInfo from '@/components/AddressInfo';
import EditProfileInfo from '@/components/EditPersonalInfo';
import Order from '@/pages/order'
import { useAuth } from '@/context/AuthContext';
import { Address, User } from '@/types/types';
import Axios from '@/config/axios';
import { responseToast } from '@/utilities/features';
import { Router, useRouter } from 'next/router';
import { FaAddressBook, FaUserAlt } from 'react-icons/fa';
import { RiBillFill } from 'react-icons/ri';

// type User = {
//     _id: string;
//     name: string;
//     email: string;
//     role: string;
//     gender: string;
//     dob: string;
//     addressInfo: {
//         address: string;
//         city: string;
//         state: string;
//         country: string;
//         pincode: number;
//         addType: string;
//         _id: string;
//     }[];
//     createdAt: string;
//     updatedAt: string;
//     __v: number;
//     photo: string;
// }

// const user =
// {
//     "_id": "677bcb2b119252e3a77cc29b",
//     "name": "Umang Jotaniya",
//     "email": "umang@gmail.com",
//     "role": "admin",
//     "gender": "male",
//     "dob": "2005-02-15T00:00:00.000Z",
//     "addressInfo": [
//         {
//             "address": "Madhuram, Udaybagar-1, st-15, mavadi chokadi",
//             "city": "Rajkot",
//             "state": "Gujarat",
//             "country": "India",
//             "pincode": 360000,
//             "addType": "Home",
//             "_id": "677e4b698a5f014ef1195ad5"
//         },
//         {
//             "address": "KamleshPark",
//             "city": "Nadiad",
//             "state": "Gujarat",
//             "country": "India",
//             "pincode": 387005,
//             "addType": "Work",
//             "_id": "677e4c3c8a5f014ef1195ade"
//         }
//     ],
//     "createdAt": "2025-01-06T12:23:07.008Z",
//     "updatedAt": "2025-01-21T06:11:58.389Z",
//     "__v": 30,
//     "photo": "uploads/05f9cfce37e05b7b66d13d000.jpeg"
// }


const profile = () => {

    const { user } = useAuth();
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

    const date = user?.dob.split('T')[0];

    return (
        <div className="profile flex flex-col items-center gap-5 w-full h-full min-h-[calc(100vh-5rem)]">

            <h1 className="heading w-[60%] my-10 text-start text-xl sm:text-2xl">Profile</h1>

            <div className="w-full h-fit flex justify-center gap-5">

                <div className="flex justify-start w-[40%] p-6 border border-yellow-900 bg-orange-100 rounded-lg">
                    {img && <Image
                        className="w-32 h-32 rounded-full border shadow-md"
                        src={img}
                        alt="User Profile"
                        width={100}
                        height={100}
                    />}
                    <div className="text-center w-full p-6">
                        <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
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


                <div className="bg-orange-100 border border-yellow-900 p-6 -tracking-tighter rounded-lg shadow-md w-[20%] max-w-md">
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
                    className={`flex justify-center items-center gap-1 p-1 hover:border-b-2 border-violet-950 hover:text-violet-950 
                                ${showOrders ? 'border-b-2 border-violet-950 text-violet-950' : ''}`}
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
                    className={`flex justify-center items-center gap-1 p-1 hover:border-b-2 border-violet-950 hover:text-violet-950 
                                ${showProfileInfo ? 'border-b-2 border-violet-950 text-violet-950' : ''}`}
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
                    className={`flex justify-center items-center gap-1 p-1 hover:border-b-2 border-violet-950 hover:text-violet-950 
                                ${showAddressInfo ? 'border-b-2 border-violet-950 text-violet-950' : ''}`}
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
                {showOrders && 
                    <Order />
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