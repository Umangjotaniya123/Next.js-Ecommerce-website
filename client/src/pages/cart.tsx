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
    // const [cartItems, setCartItems] = useState<CartItem[] | []>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            const items: CartItem[] | [] = decryptedData(data);
            // setCartItems(cartItems);
            items.map(item => dispatch(addToCart(item)));
        }
    }, [data])

    const { cartItems, subTotal, tax, total, shippingCharges, discount } = useSelector(
        (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

    const incrementHandler = () => { };

    const decrementHandler = () => { };

    const removeHandler = () => { };

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
                                    // incrementHandler={incrementHandler}
                                    // decrementHandler={decrementHandler}
                                    // removeHandler={removeHandler}
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
            {/* <aside className='p-4 text-sm w-full flex flex-col justify-start gap-2 bottom-0 bg-orange-200 sm:px-8 sm:text-base sm:flex-row sm:justify-start sm:h-auto sm:bottom-8 md:flex md:w-[20%] md:h-fit md:my-20 md:py-10  md:flex-col md:gap-8 md:justify-center md:rounded-medium shadow-medium' >
                <div className='flex flex-col justify-start gap-2 sm:w-1/2 md:w-full md:font-medium md:tracking-wider   '>
                    <p>Subtotal:- ₹{subTotal}</p>
                    <p>Shipping Charges:- ₹{shippingCharges}</p>
                    <p>tax:- ₹{tax}</p>
                    <p>Discount:<em> - ₹{discount}</em></p>
                    <p><b>Total:- ₹{total}</b></p>
                </div>
                <div className='flex flex-col justify-start gap-2 sm:justify-center sm:items-center sm:w-1/2 md:w-full md:items-start'>
                    <input className='p-2 w-[60%] border border-spacing-1 rounded-lg sm:w-56'
                        type="text"
                        placeholder="Coupon Code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                    />
                    {couponCode && (isValidCouponCode ? (
                        <span className="green">
                            ₹{discount} off using the <code>{couponCode}</code>
                        </span>
                    ) : (
                        <span className="red">Invalid Coupon <VscError /></span>
                    ))}
                    {cartItems.length > 0 &&
                        <Link
                            className='bg-zinc-700 text-white p-3 w-[60%] flex justify-center items-center uppercase space-x-2 font-semibold hover:bg-teal-600 rounded-lg sm:w-56'
                            href='/shipping'
                        >Checkout</Link>
                    }
                </div>
            </aside> */}
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

                <div className="flex mt-4 border-1 border-yellow-950 rounded-md p-2">
                    <input
                        type="text"
                        placeholder="Voucher"
                        className="w-full px-2 border-none bg-transparent focus:ring-0"
                    />
                    <button className="text-indigo-800 px-2 font-semibold">Apply</button>
                </div>

                <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total :</span> <span>₹{total}</span>
                </div>

                <button className="w-full bg-indigo-950 font-semibold text-white py-2 rounded-lg mt-4 hover:bg-zinc-700">
                    Proceed to check out
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