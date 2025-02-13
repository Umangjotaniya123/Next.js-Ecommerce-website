import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import Axios from '@/config/axios';
import { responseToast, SERVER } from '@/utilities/features';
import { RiBillFill, RiDashboardFill, RiHome5Fill } from 'react-icons/ri';
import Image from 'next/image';


const navbarData = {
    nav: [
        {
            name: 'Home',
            url: '/',
            Icon: RiHome5Fill
        },
        {
            name: 'search',
            url: '/search',
            Icon: FaSearch
        },
        {
            name: 'Cart',
            url: '/cart',
            Icon: FaShoppingBag
        },
        {
            name: 'Order',
            url: '/order',
            Icon: RiBillFill
        }
    ],
    dialoag: [
        {
            name: 'Dashboard',
            url: '/admin/dashboard',
            Icon: RiDashboardFill
        },
        {
            name: 'Profile',
            url: '/profile',
            Icon: FaUserEdit
        },
    ]
}

const Header = () => {

    const { user, setUser } = useAuth();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleLogout = async () => {

        const res = await Axios.post('/user/logout');

        if (res.data.success) {
            setUser(null);
        }

        responseToast(res, router, '/');

    }

    return (
        // <div className='flex flex-row w-full justify-end items-center gap-7 px-4 my-2 text-xl'>
        <div className="w-full flex justify-center items-center">
            <div className='flex justify-center items-center gap-10 w-auto bg-indigo-100 px-8 py-2 text-black font-medium rounded-xl my-2'>
                {navbarData && navbarData.nav.map((data, index) => {
                    const Icon = data.Icon;
                    return (
                        <Link href={data.url}
                            className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-violet-200 ${router.pathname === data.url ? 'shadow shadow-content4-foreground text-indigo-900' : ''}`}
                            onClick={() => setIsOpen(false)}
                        >
                            <Icon className='text-xl' />
                            {<span>{data.name}</span>}
                        </Link>
                    )
                })}
                <Link href={'/'}
                    className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-violet-200 ${router.pathname === '/' ? 'shadow shadow-content4-foreground text-indigo-900' : ''}`}
                    onClick={() => setIsOpen(false)}
                >
                    <RiHome5Fill className='text-xl' />
                    {<span>Home</span>}
                </Link>
                <Link href={'/search'}
                    className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-violet-200 ${router.pathname === '/search' ? 'shadow shadow-content4-foreground text-indigo-900' : ''}`}
                    onClick={() => setIsOpen(false)}
                >
                    <FaSearch className='text-xl' />
                    {<span>Search</span>}
                </Link>
                <Link href={'/cart'}
                    className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-violet-200 ${router.pathname === '/cart' ? 'shadow shadow-content4-foreground text-indigo-900' : ''}`}
                    onClick={() => setIsOpen(false)}
                >
                    <FaShoppingBag className='text-xl' />
                    {<span>Cart</span>}
                </Link>
                <Link href={'/order'}
                    className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-violet-200 ${router.pathname === '/order' ? 'shadow shadow-content4-foreground text-indigo-900' : ''}`}
                    onClick={() => setIsOpen(false)}
                >
                    {/* <FaShoppingBag /> */}
                    {<span>My Orders</span>}
                </Link>
                {user?._id ? (
                    <div className={`relative rounded-full ${isOpen ? 'shadow  shadow-content4-foreground' : ''}`}>
                        {/* <button
                            className={`rounded-full ${isOpen ? 'shadow  shadow-content4-foreground' : ''}`}
                            onClick={() => setIsOpen(!isOpen)}
                        > */}
                        {/* <FaUser /> */}
                        <Image
                            src={user.photo ? `${SERVER}/${user?.photo}` : '/download.jpeg'}
                            className='rounded-full w-12 h-12 cursor-pointer'
                            alt="User"
                            width={0}
                            height={0}
                            sizes='100w'
                            onClick={() => setIsOpen(!isOpen)}
                        />

                        {/* {isOpen && <span>Account</span>} */}
                        {/* </button> */}
                        <dialog open={isOpen} className='rounded-md shadow-lg bg-gray-300 font-medium absolute -left-10 top-14 z-10'>
                            <div className='flex flex-col justify-center gap-1 items-start p-3'>
                                {user?.role === 'admin' &&
                                    <Link href={'/admin/dashboard'}
                                        className='flex items-center gap-2 px-2 py-1 rounded-md hover:text-indigo-900'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <RiDashboardFill className='text-xl' />
                                        <span>Dashboard</span>
                                    </Link>
                                }
                                <Link href={'/profile'}
                                    className={`flex items-center gap-2 px-2 py-1 rounded-md hover:text-indigo-900`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FaUserEdit className='text-xl' />
                                    {<span>Profile</span>}
                                </Link>
                                {/* <Link href={'/profile'} onClick={() => setIsOpen(false)} className='hover:text-sky-800'>Profile</Link> */}
                                <button
                                    className='flex items-center gap-2 px-2 py-1 rounded-md hover:text-indigo-900'
                                    onClick={handleLogout}
                                >
                                    <FaSignOutAlt className='text-xl' />
                                    <span>LogOut</span>
                                </button>
                            </div>
                        </dialog>
                    </div>
                ) : (
                    <Link href={'/login'}
                        className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-violet-200 ${router.pathname === '/login' ? 'shadow text-indigo-900' : ''}`}
                        onClick={() => setIsOpen(false)}
                    >
                        <FaSignInAlt className='text-xl' />
                        {<span>Login</span>}
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Header;