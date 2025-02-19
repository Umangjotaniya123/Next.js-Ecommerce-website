import Image from 'next/image';
import React from 'react'

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
        <div className="w-64 h-80 p-4 rounded-2xl flex flex-col items-center justify-center relative group hover:bg-orange-100">
            <Image className='rounded-xl m-2 object-cover' src='/shoose-2.jpeg' alt={name} width={250} height={200} />
            <p>{name}</p>
            <span className='font-bold text-lg'>₹{price}</span>
            <div className='opacity-0 rounded-2xl w-full h-full bg-transparent absolute top-0 left-0 flex items-end justify-center hover:opacity-100'>
                <button className='bg-yellow-200 rounded-md text-sm p-2 font-semibold flex items-center justify-center border-none opacity-0 group-hover:opacity-100'
                //onClick={() => handler({ productId, price, name, photo, stock, quantity: 1 })}
                >
                    Add To Cart
                </button>
            </div>
        </div>
    )
}

export default ProductCard;