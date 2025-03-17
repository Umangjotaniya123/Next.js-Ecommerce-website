import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaBars, FaTimes, FaSignOutAlt, FaUser, FaShoppingCart } from 'react-icons/fa';
import { useContext, useState } from 'react';
import Image from 'next/image';
import { navbarData } from '@/utilities/data';
import { useAuth } from '@/context/AuthContext';
import Axios from '@/config/axios';
import { responseToast } from '@/utilities/features';
import { useDispatch, useSelector } from 'react-redux';
import { CartReducerInitialState } from '@/types/reducer-types';
import { resetCart } from '@/redux/reducer/cartReducer';
import { ThemeContext } from '@/context/ThemeContext';
import { FiMoon, FiSun } from 'react-icons/fi';
import { AiFillMoon, AiFillSun } from 'react-icons/ai';

const Navbar = () => {
    const { user, getUser } = useAuth();
    const { theme, toggleTheme } = useContext(ThemeContext);
    const router = useRouter();
    const dispatch = useDispatch()
    const [menuOpen, setMenuOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const { cartItems } = useSelector((state: { cartReducer: CartReducerInitialState }) => state.cartReducer)

    const handleLogout = async () => {
        const res = await Axios.post('/user/logout');

        if (res.data.success) {
            getUser();
            dispatch(resetCart());
            setDropdownOpen(false);
        }

        responseToast(res, router, '/');
    };

    return (
        <nav className="fixed top-3 left-0 w-full flex justify-center z-50">
            <div className="w-[93%] bg-orange-200/30 dark:bg-slate-300/30 backdrop-blur-lg shadow-md rounded-3xl flex items-center justify-between px-6 lg:px-8 py-2">

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
                                className={`flex items-center gap-2 px-4 py-1 rounded-md hover:bg-orange-200 dark:hover:bg-black ${router.pathname === data.url ? 'shadow shadow-content4-foreground text-orange-950 dark:bg-black dark:text-gray-200' : ''}`}
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
                                className="relative flex items-center gap-2 rounded-md hover:text-orange-900 dark:hover:text-black"
                                onClick={() => setDropdownOpen(false)}
                            >
                                <FaShoppingCart className='text-2xl' />
                                <span className="absolute -top-3 -right-3 bg-orange-700 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                    {cartItems.length}
                                </span>
                            </Link>

                            <FaUser
                                className="text-xl cursor-pointer hover:text-orange-900 dark:hover:text-black"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            />

                            {dropdownOpen && (
                                <div className="absolute top-[2rem] -right-7 mt-3 w-72 bg-gray-800 rounded-lg shadow-lg text-white p-4 z-50">
                                    <div className="absolute -top-2 right-20 w-7 h-7 bg-gray-800 rotate-45"></div>

                                    {/* User Info */}
                                    <div className="flex flex-col items-center text-center border-b border-gray-700 pb-4">
                                        <Image
                                            src={user.photo ? `${process.env.NEXT_PUBLIC_SERVER}/${user.photo}` : '/download.jpeg'}
                                            alt="User"
                                            width={0}
                                            height={0}
                                            sizes='100vw'
                                            className="rounded-full w-16 h-16" />
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
                            <Link href="/login" className="w-20 sm:w-24 md:w-28 bg-indigo-950 hover:bg-indigo-800 dark:bg-indigo-800 dark:hover:bg-indigo-700 text-center text-white rounded-2xl font-semibold py-2">
                                Sign In
                            </Link>
                            <Link href="/signUp" className="w-20 sm:w-24 md:w-28 bg-gray-500 hover:bg-gray-700 text-center rounded-2xl text-white font-semibold py-2">
                                Sign Up
                            </Link>
                        </div>

                    )}
                    <button onClick={toggleTheme} className="p-2 rounded-full">
                        {theme === "dark" ? <AiFillSun className="text-yellow-400" size={24} /> : <AiFillMoon className="text-gray-900" size={24} />}
                    </button>
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