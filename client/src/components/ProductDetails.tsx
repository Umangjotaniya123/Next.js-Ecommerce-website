import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { Product } from '@/types/types';
import { decryptedData, encryptedData, responseToast } from '@/utilities/features';
import { set } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
const buttonStyle = 'w-8 h-8 rounded-md text-2xl bg-slate-300 hover:bg-black hover:text-white dark:bg-white dark:text-black dark:hover:bg-slate-500 disabled:cursor-not-allowed disabled:opacity-50'

const details = ({ data }: { data: string }) => {

    const router = useRouter();
    const { getCartItems } = useAuth();
    const [product, setProduct] = useState<Product>();
    const [quantity, setQuantity] = useState<number>(1);
    const [discount, setDiscount] = useState<number>(0);
    const [imagePrev, setImagePrev] = useState<string>('');
    const [description, setDescription] = useState<boolean>(true);
    const [specification, setSpecification] = useState<boolean>(false);
    const [isAdmin, setAdmin] = useState<boolean>(false);

    useEffect(() => {
        const product = decryptedData(data);
        setProduct(product);
        setDiscount((product?.price! * product?.discount) / 100);

        if (product?.photos && product.photos.length)
            setImagePrev(`${process.env.NEXT_PUBLIC_SERVER}/${product.photos[0]}`);
    }, [data]);

    useEffect(() => {
        if (router.pathname.includes('/admin/')) {
            setAdmin(true);
        }
    }, [router]);

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

    const addTowishlistHandler = async () => {
        try {
            const res = await Axios.post('/wishlist/add', {
                productId: product?._id,
            })

            responseToast(res)
        } catch (error: any) {
            responseToast(error?.response)
        }
    }

    return (
        <div className="profile flex flex-col items-center gap-5 w-full h-full min-h-[calc(100vh-5rem)]">

            <div className="w-full h-fit flex justify-center gap-5">

                <div className={`flex justify-start gap-4 ${isAdmin ? 'w-[45%]' : 'w-[35%]'}`}>
                    {(product?.photos && product.photos.length > 0) &&
                        <div className='w-[20%] flex flex-col gap-5 overflow-y-auto'>
                            {product.photos.map((src, index) => (
                                <Image
                                    key={index}
                                    src={`${process.env.NEXT_PUBLIC_SERVER}/${src}`}
                                    alt='Photo'
                                    width={0}
                                    height={0}
                                    sizes='100vw'
                                    className='w-full h-24 border border-gray-700 rounded-md cursor-pointer hover:bg-orange-100 dark:hover:bg-gray-800'
                                    onClick={() => setImagePrev(`${process.env.NEXT_PUBLIC_SERVER}/${src}`)}
                                />
                            ))}
                        </div>
                    }
                    <div className={`p-2 border border-gray-700 shadow-sm shadow-black dark:shadow-white rounded-md cursor-pointer ${(product?.photos && product.photos.length > 0) ? `w-[80%]` : 'w-full'}`}>
                        <Image
                            className="w-full h-[500px] object-contain "
                            src={(imagePrev) ? imagePrev : '/images/Image-not-found.png'}
                            alt={'Photo'}
                            width={0}
                            height={0}
                            sizes='100vw'
                        />
                    </div>
                </div>


                <div className={`p-6 -tracking-tighter flex flex-col ${isAdmin ? 'w-[40%]' : 'w-[35%]'}`}>
                    <h2 className="text-5xl font-semibold">{product?.name}</h2>

                    <div className="flex justify-start gap-4 py-1">
                        <span className="font-semibold">Category :</span>
                        <span>{product?.category}</span>
                    </div>

                    <div className='flex items-center mt-3 gap-6'>
                        <h2 className="text-3xl font-semibold">₹{Math.floor(product?.price! - discount)}</h2>
                        {product?.discount && <span className="font-semibold text-xl text-green-600">{product.discount}% off</span>}
                    </div>

                    <h2
                        style={{
                            textDecoration: 'line-through',
                            textDecorationColor: 'red',
                            textDecorationThickness: '2px',
                        }}
                        className="text-lg font-normal"
                    >₹{product?.price}</h2>

                    {product?.stock && product.stock > 0 ?
                        <h3 className='text-lg text-green-600'>In Stock</h3> :
                        <h3 className='text-lg text-red-600'>Out of Stock</h3>
                    }

                    <p className='py-4 text-gray-500'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id magnam vero, laborum aut totam sunt. Nesciunt quidem magnam nihil, rerum odit illo possimus? Architecto necessitatibus iste natus aut repellat quis soluta neque recusandae a reprehenderit, molestiae delectus illo minus commodi harum animi eius. Ab voluptate nisi dicta temporibus quae repellendus.
                    </p>

                    {!isAdmin ?
                        <>
                            <h3 className='text-red-600 text-lg font-semibold'>Special offer ends in 23:00:45 hours</h3>

                            <div className="w-full flex flex-row gap-2 text-medium lg:gap-6 my-8">
                                <div className='flex felx-row justify-between items-center gap-5 text-xl font-medium sm:justify-start'>
                                    <button className={`${buttonStyle}`} disabled={quantity == 1} onClick={() => setQuantity(quantity - 1)} >-</button>
                                    <p>{quantity}</p>
                                    <button className={`${buttonStyle}`} onClick={() => setQuantity(quantity + 1)} >+</button>
                                </div>
                                <button
                                    type="submit"
                                    className={`w-44 bg-indigo-950 hover:bg-zinc-800 dark:bg-indigo-700 dark:hover:bg-zinc-500 text-white rounded-3xl font-semibold py-2`}
                                    onClick={addToCartHandler}
                                >
                                    Add to Cart
                                </button>
                                <button
                                    type="button"
                                    className="w-44 bg-gray-500 hover:bg-gray-700 rounded-3xl text-white font-semibold py-2"
                                    onClick={addTowishlistHandler}
                                >
                                    Add to wishlist
                                </button>
                            </div>
                        </> :
                        <button
                            type="submit"
                            className={`w-44 bg-indigo-950 hover:bg-zinc-800 dark:bg-indigo-700 dark:hover:bg-zinc-500 text-white rounded-3xl font-semibold py-2`}
                            onClick={() => router.push(`/admin/products/${product?._id}`)}
                        >
                            Edit Product
                        </button>
                    }
                </div>
            </div>

            <div className={`${isAdmin ? 'w-[80%]' : 'w-[70%]'} flex items-center gap-8 font-semibold cursor-pointer`}>
                <div
                    className={`flex justify-center items-center gap-1 p-1 hover:border-b-2 border-violet-950 hover:text-violet-950 dark:border-violet-600 dark:hover:text-violet-600 
                                ${description ? 'border-b-2 border-violet-950 text-violet-950 dark:border-violet-600 dark:text-violet-600' : ''}`}
                    onClick={() => {
                        setDescription(true);
                        setSpecification(false);
                    }}
                >
                    <span>Description</span>
                </div>
                <div
                    className={`flex justify-center items-center gap-1 p-1 hover:border-b-2 border-violet-950 hover:text-violet-950 dark:border-violet-600 dark:hover:text-violet-600 
                                ${specification ? 'border-b-2 border-violet-950 text-violet-950 dark:border-violet-600 dark:text-violet-600' : ''}`}
                    onClick={() => {
                        setDescription(false);
                        setSpecification(true);
                    }}
                >
                    <span>Specification</span>
                </div>
            </div>
            <div className={`${isAdmin ? 'w-[80%]' : 'w-[70%]'} bg-orange-100 dark:bg-gray-900 min-h-64 p-4 rounded-lg border-orange-900 dark:border-slate-200`}>
                {description && (product?.description ?
                    <p>{product.description}</p> :
                    <p>No description available</p>
                )}
                {specification && (product?.specification ?
                    <div className='w-full flex flex-col'>
                        {specification && Object.entries(product.specification).map(([key, value]: any, index) => (
                            <div
                                key={index}
                                className='inputStyle w-full flex items-center gap-4'
                            >
                                <div className='w-[20%] text-center p-2 '>{key}</div>
                                <div className='text-start border-gray-500 p-2 px-5 bg-orange-50 dark:bg-black w-[60%]'>{value}</div>
                            </div>
                        ))}
                    </div> :
                    <p>No specification available</p>
                )}
            </div>
        </div>
    )
}

export default details;

export const getServerSideProps = async (context: any) => {

    const { id } = context.query;

    let product;
    try {

        const { data } = await Axios.get(`/product/${id}`)

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