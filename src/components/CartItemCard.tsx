import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { FaTrash } from 'react-icons/fa6';

type CartItemProps = {
    cartItem: any;
    incrementHandler: () => void;
    decrementHandler: () => void;
    removeHandler: (id: string, productId: string) => void;
}

const buttonStyle = 'w-6 h-6 flex justify-center items-center rounded-md text-xl bg-slate-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60'

const CartItemCard = ({ cartItem, incrementHandler, decrementHandler, removeHandler }: CartItemProps) => {
    const { photo, productId, name, price, quantity } = cartItem;

    return (
        <div className="cart-item p-3 mx-3 w-[90%] flex flex-col justify-center items-center gap-2 border border-b-2 rounded-lg bg-white sm:flex-row sm:justify-start sm:gap-10 sm:px-7 sm:py-4">
            <Image className='w-28 h-20 rounded-md' src='/shoose-2.jpeg' alt={name} width={200} height={200} />
            <article className='flex flex-row justify-center items-center gap-3 font-medium text-base sm:flex-col sm:gap-0'>
                <Link className='hover:text-blue-700' href={`/product/${productId}`}>{name}</Link>
                <span>₹{price}</span>
            </article>
            <div className='flex felx-row justify-between items-center gap-2 sm:w-full sm:justify-end'>
                <button className={`${buttonStyle}`} disabled={quantity == 1} onClick={() => decrementHandler()} >-</button>
                <p>{quantity}</p>
                <button className={`${buttonStyle}`} onClick={() => incrementHandler()} >+</button>
                <button
                    className='bg-transparent hover:text-red-700'
                    onClick={() => removeHandler(cartItem?._id || '', productId)}
                ><FaTrash /></button>
            </div>
        </div>
    )
}

export default CartItemCard;