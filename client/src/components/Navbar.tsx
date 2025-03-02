// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
// import React, { useState } from 'react'
// import { useAuth } from '@/context/AuthContext';
// import Axios from '@/config/axios';
// import { responseToast, SERVER } from '@/utilities/features';
// import Image from 'next/image';
// import { navbarData } from '@/utilities/data';

// const Header = () => {

//     const { user, setUser } = useAuth();

//     const [isOpen, setIsOpen] = useState<boolean>(false);
//     const router = useRouter();

//     const handleLogout = async () => {

//         const res = await Axios.post('/user/logout');

//         if (res.data.success) {
//             setUser(null);
//         }

//         responseToast(res, router, '/');

//     }

//     return (
//         <div className="w-full flex justify-center items-center bg-orange-50">
//             <div className='flex items-center w-[95%] bg-orange-200 text-black font-medium rounded-xl my-2'>
//                 <div className='px-4 cursor-pointer'>
//                     <Image
//                         src={'/logo1.png'}
//                         alt='Logo'
//                         width={50}
//                         height={50}
//                     />
//                 </div>
//                 <div className='flex justify-center items-center gap-10 w-[80%] px-8 py-2'>
//                     {navbarData && navbarData.nav.map((data, index) => {
//                         const Icon = data.Icon;
//                         return (
//                             <Link href={data.url} key={index}
//                                 className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-violet-200 ${router.pathname === data.url ? 'shadow shadow-content4-foreground text-orange-950' : ''}`}
//                                 onClick={() => setIsOpen(false)}
//                             >
//                                 <Icon className='text-xl' />
//                                 {<span>{data.name}</span>}
//                             </Link>
//                         )
//                     })}

//                     {user?._id ? (
//                         <div className={`relative rounded-full ${isOpen ? 'shadow  shadow-content4-foreground' : ''}`}>
//                             <Image
//                                 src={user.photo ? `${SERVER}/${user?.photo}` : '/download.jpeg'}
//                                 className='rounded-full w-12 h-12 cursor-pointer'
//                                 alt="User"
//                                 width={0}
//                                 height={0}
//                                 sizes='100w'
//                                 onClick={() => setIsOpen(!isOpen)}
//                             />

//                             <dialog open={isOpen} className='rounded-md shadow-lg bg-gray-300 font-medium absolute -left-10 top-14 z-10'>
//                                 <div className='flex flex-col justify-center gap-1 items-start p-3'>

//                                     {navbarData && navbarData.dialoag.map((data, index) => {
//                                         const Icon = data.Icon;
//                                         return (
//                                             <Link href={data.url} key={index}
//                                                 className={`flex items-center gap-2 px-2 py-1 rounded-md hover:text-indigo-900 ${data.url === '/admin/dashboard' && user.role !== 'admin' ? 'hidden' : ''}`}
//                                                 onClick={() => setIsOpen(false)}
//                                             >
//                                                 <Icon className='text-xl' />
//                                                 <span>{data.name}</span>
//                                             </Link>
//                                         )
//                                     })}

//                                     <button
//                                         className='flex items-center gap-2 px-2 py-1 rounded-md hover:text-indigo-900'
//                                         onClick={handleLogout}
//                                     >
//                                         <FaSignOutAlt className='text-xl' />
//                                         <span>LogOut</span>
//                                     </button>
//                                 </div>
//                             </dialog>
//                         </div>
//                     ) : (
//                         <Link href={'/login'}
//                             className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-violet-200 ${router.pathname === '/login' ? 'shadow text-indigo-900' : ''}`}
//                             onClick={() => setIsOpen(false)}
//                         >
//                             <FaSignInAlt className='text-xl' />
//                             {<span>Login</span>}
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Header;

import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSearch, FaUserCircle, FaBars, FaTimes, FaSignOutAlt, FaUser, FaClock, FaShoppingCart } from 'react-icons/fa';
import { JSX, useState } from 'react';
import Image from 'next/image';
import { navbarData } from '@/utilities/data';
import { useAuth } from '@/context/AuthContext';
import Axios from '@/config/axios';
import { responseToast } from '@/utilities/features';
import { FaBagShopping } from 'react-icons/fa6';

const Navbar = () => {
    const { user, setUser } = useAuth();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleLogout = async () => {
        const res = await Axios.post('/user/logout');

        if (res.data.success) {
            setUser(null);
            setDropdownOpen(false);
        }

        responseToast(res, router, '/');
    };

    return (
        <nav className="fixed top-3 left-0 w-full flex justify-center z-50">
            <div className="w-[93%] bg-orange-200/30 backdrop-blur-lg shadow-md rounded-3xl flex items-center justify-between px-6 lg:px-8 py-2">

                {/* Logo */}
                <Link href="/">
                    <Image src="/logo1.png" alt="Logo" width={50} height={50} className="cursor-pointer" />
                </Link>

                {/* Navigation Links (Hidden in mobile, visible in md+) */}
                <div className="hidden md:flex space-x-6 lg:space-x-8">
                    {navbarData && navbarData.nav.map((data, index) => {
                        const Icon = data.Icon;
                        return (
                            <Link href={data.url} key={index}
                                className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-orange-200 ${router.pathname === data.url ? 'shadow shadow-content4-foreground text-orange-950' : ''}`}
                                onClick={() => setDropdownOpen(false)}
                            >
                                <Icon className='text-xl' />
                                <span>{data.name}</span>
                            </Link>
                        )
                    })}
                </div>

                {/* User Profile Dropdown */}
                <div className="relative flex items-center gap-4">
                    {user?._id ? (
                        <>
                            <Link href={'/cart'}
                                className="relative flex items-center gap-2 rounded-md hover:text-orange-900"
                                onClick={() => setDropdownOpen(false)}
                            >
                                <FaShoppingCart className='text-2xl' />
                                <span className="absolute -top-3 -right-3 bg-orange-700 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {3}
                                </span>
                            </Link>

                            <FaUser
                                className="text-xl cursor-pointer hover:text-orange-900"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />

                            {dropdownOpen && (
                                <div className="absolute top-[2rem] -right-7 mt-3 w-72 bg-gray-800 rounded-lg shadow-lg text-white p-4 z-50">
                                    <div className="absolute -top-2 right-6 w-7 h-7 bg-gray-800 rotate-45"></div>

                                    {/* User Info */}
                                    <div className="flex flex-col items-center text-center border-b border-gray-700 pb-4">
                                        <Image src="/user-profile.jpg" alt="User" width={50} height={50} className="rounded-full" />
                                        <h3 className="text-lg font-semibold mt-2">{user?.name}</h3>
                                    </div>

                                    {/* Dropdown Menu */}
                                    <ul className="py-2">
                                        {navbarData && navbarData.dialoag.map((data, index) => {
                                            const Icon = data.Icon;
                                            return (
                                                <Link href={data.url} key={index}
                                                    className={`flex items-center gap-3 px-4 py-2 rounded-md hover:bg-gray-700 ${data.url === '/admin/dashboard' && user.role !== 'admin' ? 'hidden' : ''}`}
                                                    onClick={() => setDropdownOpen(false)}
                                                >
                                                    <Icon className='text-xl' />
                                                    <span>{data.name}</span>
                                                </Link>
                                            )
                                        })}
                                    </ul>

                                    {/* Logout Button */}
                                    <button
                                        className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 p-3 rounded-md mt-3"
                                        onClick={handleLogout}
                                    >
                                        <FaSignOutAlt /> Sign Out
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="flex flex-row gap-2 lg:gap-4">
                            <Link href="/login" className="w-20 sm:w-24 md:w-28 bg-indigo-950 hover:bg-indigo-800 text-center text-white rounded-2xl font-semibold py-2">
                                Sign In
                            </Link>
                            <Link href="/signUp" className="w-20 sm:w-24 md:w-28 bg-gray-500 hover:bg-gray-700 text-center rounded-2xl text-white font-semibold py-2">
                                Sign Up
                            </Link>
                        </div>

                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-900 text-white shadow-md p-4 absolute right-0 w-[60%] sm:w-[50%] md:w-[40%] top-16 rounded-lg">
                    {navbarData && navbarData.nav.map((data, index) => {
                        const Icon = data.Icon;
                        return (
                            <Link href={data.url} key={index}
                                className={`flex items-center justify-start gap-2 px-4 py-2 rounded-md hover:bg-gray-700 ${router.pathname === data.url ? 'shadow shadow-content4-foreground text-orange-300' : ''}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                <Icon className='text-xl' />
                                <span>{data.name}</span>
                            </Link>
                        )
                    })}
                </div>
            )}
        </nav>
    );
};


export default Navbar;


const DropdownItem = ({ icon, text, link }: { icon: JSX.Element; text: string; link: string }) => (
    <Link
        href={link}
        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded-md"
    >
        {icon} <span>{text}</span>
    </Link>
);