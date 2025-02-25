import { Product } from '@/types/types';
import Image from 'next/image';
import React from 'react'
import { FaArrowDown } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/free-mode';

type ProductsProps = {
    productId: string;
    photo: string;
    name: string;
    price: number;
    stock: number;
    handler: () => void;
}

// export const ProductCard = ({ productId, price, name, photo, stock, handler }: ProductsProps) => {

//     return (
//         <div className="w-96 h-64 p-4 shadow-sm rounded-2xl flex flex-col items-center justify-center group bg-orange-50 hover:bg-orange-100">
//             <Image
//                 className='rounded-xl m-2 w-full h-full'
//                 // src={process.env.NEXT_PUBLIC_SERVER + '/' + photo} 
//                 src={'/download.jpeg'}
//                 alt={name}
//                 width={0}
//                 height={0}
//                 sizes='100vw'
//             />
//             <div className='w-full flex'>
//                 <div className=' rounded-2xl w-full h-full bg-transparent flex items-end justify-center hover:opacity-100'>
//                     <button className='bg-yellow-800 text-white rounded-md text-sm p-2 font-semibold flex items-center justify-center border-none group-hover:opacity-100'
//                     //onClick={() => handler({ productId, price, name, photo, stock, quantity: 1 })}
//                     >
//                         Add To Cart
//                     </button>
//                 </div>
//                 <div className='w-full text-end'>
//                     <p>{name}</p>
//                     <p className='flex justify-end items-center text-green-500'><FaArrowDown />30%</p>
//                     <span className='font-bold text-lg'>₹{price}</span>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ProductCard;

interface PageProps {
    product: Product;
    latest?: boolean
}

export const ProductCard = ({ product, latest }: PageProps) => {


    const { name, price } = product;

    return (
        <>
            <div className='border flex flex-col justify-center items-center p-4 shadow-sm rounded-2xl group bg-orange-50 hover:bg-orange-100 break-inside-avoid-column'>
                <Image
                    className='rounded-xl w-full h-full'
                    // src={process.env.NEXT_PUBLIC_SERVER + '/' + photo}
                    src={'/download.jpeg'}
                    alt={name}
                    width={0}
                    height={0}
                    sizes='100vw'
                />
                <div className='w-full flex mt-3 relative'>
                    <div className='absolute left-0 bottom-0 rounded-2xl'>
                        <button className='bg-yellow-800 text-white rounded-md text-sm p-2 font-semibold flex items-center justify-center border-none group-hover:opacity-100'
                        //onClick={() => handler({ productId, price, name, photo, stock, quantity: 1 })}
                        >
                            Add To Cart
                        </button>
                    </div>
                    <div className='w-full text-end'>
                        <p>{name}</p>
                        {latest && <p className='flex justify-end items-center text-green-500'><FaArrowDown />30%</p>}
                        <span className='font-bold text-lg'>₹{price}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
