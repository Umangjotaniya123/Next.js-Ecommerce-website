import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/types/types';
import { responseToast } from '@/utilities/features';
import { Tooltip } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import { FaArrowDown } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa6';
import { RiHeartLine } from 'react-icons/ri';
import 'swiper/css';
import 'swiper/css/free-mode';

interface PageProps {
    product: Product;
    latest?: boolean;
    wishlist?: boolean;
}

export const ProductCard = ({ product, latest, wishlist }: PageProps) => {

    if (!product) return;

    const router = useRouter();
    const { user, getCartItems } = useAuth();
    const { _id, name, price, photos, stock, discount } = product;

    const addToCartHandler = async () => {
        try {
            const res = await Axios.post('/cartItems/new', {
                productId: product._id,
                price, name, stock, quantity: 1, discount,
                photo: (photos && photos.length) ? photos[0] : '',
            })

            responseToast(res)
        } catch (error: any) {
            responseToast(error?.response)
        }
        getCartItems();
    }

    const handleClick = async () => {

        try {
            if (wishlist) {
                const res = await Axios.put('/wishlist/update', {
                    productId: _id,
                })
                responseToast(res, router, '/wishlist')
            }
            else {
                const res = await Axios.post('/wishlist/add', {
                    productId: _id,
                })
                responseToast(res);
            }
        } catch (error: any) {
            responseToast(error?.response)
        }
    }


    return (
        <>
            <div
                className='border h-[25rem] flex flex-col justify-between items-center p-4 shadow-sm rounded-2xl group dark:bg-slate-800 hover:bg-orange-100 dark:hover:bg-slate-600 break-inside-avoid-column relative'
            >

                <Tooltip
                    content={wishlist ? 'Remove Product' : 'Add to wishlist'}
                    showArrow={true}
                    className='w-36 font-semibold p-2 bg-white text-black rounded-b-lg shadow-md'
                >
                    <button
                        className='absolute top-2 right-2 p-2 bg-white rounded-full shadow-md group-hover:opacity-100'
                        onClick={handleClick}
                    >
                        {wishlist ? <FaHeart className='text-red-500 text-xl' /> : <RiHeartLine className='text-red-500 text-xl' />}
                    </button>
                </Tooltip>
                <Link href={`/product/${_id}`} className='h-[20rem] content-center'>
                    <Image
                        className='rounded-xl w-full h-full max-h-[250px] object-contain'
                        src={(photos && photos.length) ? `${process.env.NEXT_PUBLIC_SERVER}/${photos[0]}` : '/images/Image-not-found.png'}
                        alt={name}
                        width={0}
                        height={0}
                        sizes='100vw'
                    />
                </Link>
                <div className='w-full flex mt-3 relative'>
                    <div className='absolute left-0 bottom-0 rounded-2xl'>
                        <Tooltip
                            content='Add to Cart'
                            showArrow={true}
                            color='default'
                            className='w-36 p-2 font-semibold tracking-wider rounded-lg shadow-md'
                        >
                            <button className='bg-yellow-800 dark:bg-slate-100 text-white dark:text-black rounded-md text-sm p-2 font-semibold flex items-center justify-center border-none group-hover:opacity-100'
                                onClick={addToCartHandler}
                            >
                                Add To Cart
                            </button>
                        </Tooltip>
                    </div>
                    <div className='w-full text-end flex flex-col'>
                        <Link href={`/product/${_id}`} className='hover:underline hover:text-blue-500'>{name}</Link>
                        {latest && <p className='flex justify-end items-center text-green-500'><FaArrowDown />{discount}%</p>}
                        <span className='font-bold text-lg'>₹{price}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
