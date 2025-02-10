import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext';
import Axios from '@/config/axios';
import { responseToast } from '@/utilities/features';


const Header = () => {

    const { user, setUser } = useAuth();

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const router = useRouter();

    const handleLogout = async() => {

        const res = await Axios.post('/user/logout');

        if(res.data.success){
            setUser(null);
        }

        responseToast(res, router, '/');

    }

    return (
        <div className='flex flex-row w-full justify-end items-center gap-7 px-4 my-2 text-xl'>
            <Link href={'/'} onClick={() => setIsOpen(false)} className='hover:text-sky-800'>Home</Link>
            <Link href={'/search'} onClick={() => setIsOpen(false)} className='hover:text-sky-800'><FaSearch /></Link>
            <Link href={'/cart'} onClick={() => setIsOpen(false)} className='hover:text-sky-800'><FaShoppingBag /></Link>
            {user?._id ? (
                <>
                    <button onClick={() => setIsOpen(!isOpen)} className='hover:text-sky-800' ><FaUser /></button>
                    <dialog open={isOpen} className='border border-black rounded-md absolute left-[calc(100%-100px)] top-14 z-10'>
                        <div className='flex flex-col justify-center gap-1 items-center p-3'>
                            {user?.role === 'admin' && <Link href={'/admin/dashboard'} onClick={() => setIsOpen(false)} className='hover:text-sky-800'>Admin</Link>}
                            <Link href={'/order'} onClick={() => setIsOpen(false)} className='hover:text-sky-800'>Order</Link>
                            <Link href={'/profile'} onClick={() => setIsOpen(false)} className='hover:text-sky-800'>Profile</Link>
                            <button onClick={handleLogout} className='hover:text-sky-800'><FaSignOutAlt /></button>
                        </div>
                    </dialog>
                </>
            ) : (
                <Link href={'/login'}><FaSignInAlt /></Link>
            )}
        </div>
    )
}

export default Header;