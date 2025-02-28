import CartItemCard from '@/components/CartItemCard';
import Axios from '@/config/axios';
import { addToCart, calculatePrice } from '@/redux/reducer/cartReducer';
import { CartReducerInitialState } from '@/types/reducer-types';
import { CartItem } from '@/types/types';
import { decryptedData, encryptedData } from '@/utilities/features';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const cart = ({ data }: { data: string }) => {

    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            const items: CartItem[] | [] = decryptedData(data);
            items.map(item => dispatch(addToCart(item)));
        }
    }, [data])

    const { cartItems, subTotal, tax, total, shippingCharges, discount } = useSelector(
        (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

    useEffect(() => {
        dispatch(calculatePrice());
    }, [cartItems])

    return (
        <div className="cart h-[calc(100vh-5rem)] flex flex-col gap-6 md:flex-row md:justify-center md:py-8">
            <main className='w-[50%] p-6'>
                <h1 className='heading top-0 z-10 w-full text-center font-bold text-2xl'>Cart Items</h1>
                <section className='flex flex-col justify-start pt-10 items-center gap-2 object-contain h-[60vh] overflow-y-auto relative py-3 md:h-fit md:w-full'>
                    {//isLoading ? <Skeleton width="80vw" /> :
                        cartItems.length > 0 ? (
                            cartItems.map((i, idx) => (
                                <CartItemCard
                                    key={idx}
                                    cartItem={i}
                                />
                            ))
                        ) : (
                            <>
                                <h1 className='heading'>No Items Added</h1>
                            </>
                        )}
                </section>
            </main>

            <div className="bg-orange-100 p-6 h-fit my-20 rounded-lg shadow-md w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Summary</h2>
                </div>

                <div className="-tracking-tighter">
                    <div className="flex justify-between py-1">
                        <span>Items subtotal :</span> <span className="font-semibold">₹{subTotal}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Discount :</span> <span className="font-semibold text-green-600">-₹{discount}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Tax :</span> <span className="font-semibold">₹{tax}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Shipping Cost :</span> <span className="font-semibold">₹{shippingCharges}</span>
                    </div>
                    <div className="flex justify-between py-1">
                        <span>Subtotal :</span> <span className="font-semibold">₹{subTotal}</span>
                    </div>
                </div>

                <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total :</span> <span>₹{total}</span>
                </div>

                <button className="w-full bg-indigo-950 font-semibold text-white py-2 rounded-lg mt-4 hover:bg-zinc-700">
                    <Link href={'/shipping'}>Proceed to check out</Link>
                </button>
            </div>
        </div>
    )
}

export default cart;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token } = req.cookies;
    let cartItems = null;

    try {
        const { data } = await Axios.get(`/cartItems/all?token=${token}`);

        if (data)
            cartItems = encryptedData(data.cartItems);
    } catch (error) {
        console.log("Error - ", error);
    }
    return {
        props: { data: cartItems }
    }
}