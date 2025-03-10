import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/types/types';
import { responseToast } from '@/utilities/features';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaArrowDown } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/free-mode';

interface PageProps {
    product: Product;
    latest?: boolean
}

export const ProductCard = ({ product, latest }: PageProps) => {

    const { user, getCartItems } = useAuth(); 
    const { _id, name, price, photos, stock, discount } = product;

    const addToCartHandler = async() => {
        try {
            const res = await Axios.post('/cartItems/new', {
                productId: product._id,
                price, name, stock, quantity: 1,
                photo: photos && photos.length && photos[0],
            })

            responseToast(res)
        } catch (error: any) {
            responseToast(error?.response)
        }
        getCartItems();
    }


    return (
        <>
            <div className='border h-[400px] flex flex-col justify-between items-center p-4 shadow-sm rounded-2xl group bg-orange-50 hover:bg-orange-100 break-inside-avoid-column'>
                <Image
                    className='rounded-xl w-full h-full'
                    src={(photos && photos.length) ? `${process.env.NEXT_PUBLIC_SERVER}/${photos[0]}` : 'download.jpg'}
                    alt={name}
                    width={0}
                    height={0}
                    sizes='100vw'
                />
                <div className='w-full flex mt-3 relative'>
                    <div className='absolute left-0 bottom-0 rounded-2xl'>
                        <button className='bg-yellow-800 text-white rounded-md text-sm p-2 font-semibold flex items-center justify-center border-none group-hover:opacity-100'
                        onClick={addToCartHandler}
                        >
                            Add To Cart
                        </button>
                    </div>
                    <div className='w-full text-end flex flex-col'>
                        <Link href={`/product/${_id}`}>{name}</Link>
                        {latest && <p className='flex justify-end items-center text-green-500'><FaArrowDown />{discount}%</p>}
                        <span className='font-bold text-lg'>₹{price}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
