import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/types/types';
import { decryptedData, encryptedData, responseToast } from '@/utilities/features';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
const buttonStyle = 'w-8 h-8 rounded-md text-2xl bg-slate-300 hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-50'


const productId = ({ data }: { data: string }) => {

    const { getCartItems } = useAuth();
    const [product, setProduct] = useState<Product>();
    const [quantity, setQuantity] = useState<number>(1);
    const [description, setDescription] = useState<boolean>(true);
    const [specification, setSpecification] = useState<boolean>(false);

    useEffect(() => {
        setProduct(decryptedData(data));
    }, [data])

    const addToCartHandler = async () => {
        try {
            const res = await Axios.post('/cartItems/new', {
                productId: product?._id,
                price: product?.price,
                name: product?.name,
                photo: product?.photos[0],
                stock: product?.stock,
                quantity: quantity,
            })

            responseToast(res)
        } catch (error: any) {
            responseToast(error?.response)
        }
        getCartItems();
    }

    return (
        <div className="profile flex flex-col items-center gap-5 w-full h-full min-h-[calc(100vh-5rem)]">

            <div className="w-full h-fit flex justify-center gap-5">

                <div className="flex justify-start w-[30%] px-6">
                    {product?.photos &&
                        <Image
                            className="w-full max-h-full object-contain rounded-md cursor-pointer"
                            src={`${process.env.NEXT_PUBLIC_SERVER}/${product.photos[0]}`}
                            alt={product.name}
                            width={0}
                            height={0}
                            sizes='100vw'
                        />
                    }
                </div>


                <div className="p-6 -tracking-tighter flex flex-col w-[40%]">
                    <h2 className="text-5xl font-semibold">{product?.name}</h2>

                    <div className="flex justify-start gap-4 py-1">
                        <span className="font-semibold">Category :</span>
                        <span>{product?.category}</span>
                    </div>

                    <div className='flex items-center mt-3 gap-6'>
                        <h2 className="text-3xl font-semibold">₹{product?.price}</h2>
                        {product?.discount && <span className="font-semibold text-xl text-green-600">₹{(product?.price! * product?.discount) / 100} off</span>}
                    </div>

                    {product?.stock && product.stock > 0 ?
                        <h3 className='text-lg text-green-600'>In Stock</h3> :
                        <h3 className='text-lg text-red-600'>Out of Stock</h3>
                    }

                    <p className='py-4 text-gray-500'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id magnam vero, laborum aut totam sunt. Nesciunt quidem magnam nihil, rerum odit illo possimus? Architecto necessitatibus iste natus aut repellat quis soluta neque recusandae a reprehenderit, molestiae delectus illo minus commodi harum animi eius. Ab voluptate nisi dicta temporibus quae repellendus.
                    </p>

                    <h3 className='text-red-600 text-lg font-semibold'>Special offer ends in 23:00:45 hours</h3>

                    <div className="w-full flex flex-row gap-2 text-medium lg:gap-6 my-8">
                        <div className='flex felx-row justify-between items-center gap-5 text-xl font-medium sm:justify-start'>
                            <button className={`${buttonStyle}`} disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)} >-</button>
                            <p>{quantity}</p>
                            <button className={`${buttonStyle}`} onClick={() => setQuantity(quantity + 1)} >+</button>
                        </div>
                        <button
                            type="submit"
                            className={`w-44 bg-indigo-950 hover:bg-zinc-800 text-white rounded-3xl font-semibold py-2`}
                            onClick={addToCartHandler}
                        >
                            Add to Cart
                        </button>
                        <button
                            type="button"
                            className="w-44 bg-gray-500 hover:bg-gray-700 rounded-3xl text-white font-semibold py-2"
                        >
                            Add to watchList
                        </button>
                    </div>
                </div>
            </div>

            <div className='w-[70%] flex items-center gap-8 font-semibold cursor-pointer'>
                <div
                    className={`flex justify-center items-center gap-1 p-1 hover:border-b-2 border-violet-950 hover:text-violet-950 
                                ${description ? 'border-b-2 border-violet-950 text-violet-950' : ''}`}
                    onClick={() => {
                        setDescription(true);
                        setSpecification(false);
                    }}
                >
                    <span>Description</span>
                </div>
                <div
                    className={`flex justify-center items-center gap-1 p-1 hover:border-b-2 border-violet-950 hover:text-violet-950 
                                ${specification ? 'border-b-2 border-violet-950 text-violet-950' : ''}`}
                    onClick={() => {
                        setDescription(false);
                        setSpecification(true);
                    }}
                >
                    <span>Specification</span>
                </div>
            </div>

            <div className='w-[70%]'>
                {description && (product?.discription ?
                    <p>{product.discription}</p> : 
                    <p>No discription available</p>
                )}
                {specification && (product?.specification ? 
                    <div className='w-full flex flex-col my-3'>
                        {specification && Object.entries(product.specification).map(([key, value]: any, index) => (
                            <div
                                key={index}
                                className='w-full flex justify-between items-center gap-4'
                            >
                                <span className='w-[30%] text-center p-2 '>{key}</span>
                                <span className='text-start border-b border-gray-500 p-2 px-5 bg-orange-50 w-full'>{value}</span>
                            </div>
                        ))}
                    </div> : 
                    <p>No specification available</p>
                )}
            </div>
        </div>
    )
}

export default productId;

export const getServerSideProps = async (context: any) => {

    const { productId } = context.query;

    let product;
    try {

        const { data } = await Axios.get(`/product/${productId}`)

        if (data) {
            product = encryptedData(data.product)
        }
    } catch (error) {
        console.log(error);
    }

    return {
        props: { data: product },
    }
}