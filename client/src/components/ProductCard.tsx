import Image from 'next/image';
import React from 'react'
import { FaArrowDown } from 'react-icons/fa';

type ProductsProps = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;
}

const ProductCard = ({ productId, price, name, photo, stock, handler }: ProductsProps) => {
    return (
        <div className="w-80 h-64 p-4 shadow-sm rounded-2xl flex flex-col items-center justify-center relative group bg-orange-50 hover:bg-orange-100">
            <Image className='rounded-xl m-2 ' src='/shoose-2.jpeg' alt={name} width={250} height={200} />
            <div className='w-full flex'>
                <div className=' rounded-2xl w-full h-full bg-transparent flex items-end justify-center hover:opacity-100'>
                    <button className='bg-yellow-800 text-white rounded-md text-sm p-2 font-semibold flex items-center justify-center border-none group-hover:opacity-100'
                    //onClick={() => handler({ productId, price, name, photo, stock, quantity: 1 })}
                    >
                        Add To Cart
                    </button>
                </div>
                <div className='w-full text-end'>
                    <p>{name}</p>
                    <p className='flex justify-end items-center text-green-500'><FaArrowDown />30%</p>
                    <span className='font-bold text-lg'>₹{price}</span>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;