import Axios from '@/config/axios';
import { addToCart, removeCartItem } from '@/redux/reducer/cartReducer';
import { CartItem } from '@/types/types';
import { debounce } from 'lodash';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback } from 'react'
import { FaTrash } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';

type CartItemProps = {
    cartItem: CartItem;
    // incrementHandler: () => void;
    // decrementHandler: () => void;
    // removeHandler: (id: string, productId: string) => void;
}

const buttonStyle = 'w-6 h-6 flex justify-center items-center rounded-md text-xl bg-slate-300 dark:bg-white dark:text-black dark:hover:bg-slate-500 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50'

const CartItemCard = ({ cartItem }: CartItemProps) => {
    const { _id, photo, productId, name, price, quantity } = cartItem;
    const dispatch = useDispatch();

    const updateQuantityHandler = async ({ id, quantity }: { id: string, quantity: number }) => {
        const res = await Axios.put(`/cartItems/${id}`, { quantity });
    }

    const debounceUpdateQuantity = useCallback(
        debounce(updateQuantityHandler, 1000), []
    )

    const incrementHandler = async () => {
        dispatch(addToCart({ ...cartItem, quantity: quantity + 1 }));
        debounceUpdateQuantity({
            id: _id || '',
            quantity: quantity + 1
        });
    }

    const decrementHandler = async () => {
        dispatch(addToCart({ ...cartItem, quantity: quantity - 1 }));
        debounceUpdateQuantity({
            id: _id || '',
            quantity: quantity - 1
        });
    }

    const removeHandler = async () => {
        dispatch(removeCartItem(_id || ''));
        await Axios.delete(`/cartItems/${_id}`)
    }

    return (
        <div className="p-3 mx-3 w-[80%] flex flex-col justify-center items-center gap-2 rounded-bl-lg sm:flex-row sm:justify-start sm:gap-10 sm:px-7 sm:py-4">
            {/* <Image className='w-full h-24 rounded-md' src={`${process.env.NEXT_PUBLIC_SERVER}/${photo}`} alt={name} width={200} height={200} /> */}
            <Image
                className='w-28 h-28 rounded-md'
                src={(photo && photo.includes('uploads/')) ? `${process.env.NEXT_PUBLIC_SERVER}/${photo}` : '/images/Image-not-found.png'}
                alt={name}
                width={0}
                height={0}
                sizes='100vw'
            />
            {/* <article className='flex flex-row justify-center items-center gap-3 font-medium text-base sm:flex-col sm:gap-0'> */}
            <Link 
                href={`/product/${productId}`}
                className='text-amber-950 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-500 w-[90%] text-center font-medium text-base' 
            >{name}</Link>
            <span className='font-semibold text-base px-2'>₹{price}</span>
            {/* </article> */}
            <div className='flex felx-row justify-between items-center gap-6 font-medium sm:w-full sm:justify-end'>
                <button className={`${buttonStyle}`} disabled={quantity == 1} onClick={() => decrementHandler()} >-</button>
                <p>{quantity}</p>
                <button className={`${buttonStyle}`} onClick={() => incrementHandler()} >+</button>
                <button
                    className='bg-transparent hover:text-red-700 dark:text-red-500 dark:hover:text-red-700'
                    onClick={() => removeHandler()}
                ><FaTrash /></button>
            </div>
        </div>
    )
}

export default CartItemCard;    