import { calculatePrice } from '@/redux/reducer/cartReducer';
import { CartReducerInitialState } from '@/types/reducer-types';
import Image from 'next/image';
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const CartSummary = () => {

    const dispatch = useDispatch();
    const { cartItems, subTotal, tax, total, shippingCharges, discount } = useSelector(
        (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
    );

    useEffect(() => {
        dispatch(calculatePrice());
    }, [cartItems])

    return (
        <>
            {/* <div className="w-full max-w-lg sm:max-w-full bg-orange-100 p-6 h-fit m-2 rounded-lg shadow-md lg:max-w-[35%]"> */}
            <div className="flex justify-between items-center mb-4 font-bold text-xl">
                <h2>Summary</h2>
                <Link href={"/cart"} className="text-blue-500 text-medium">
                    Edit Cart
                </Link>
            </div>

            <section className="my-8 space-y-4">
                {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <Image
                                src={`${process.env.NEXT_PUBLIC_SERVER}/${item.photo}`}
                                alt={item.name}
                                width={50}
                                height={50}
                                className="rounded-lg"
                            />
                            <div className="flex-1 ml-3">
                                <p className="text-sm truncate">{item.name}</p>
                                <span className="text-gray-700 text-xs">x{item.quantity}</span>
                            </div>
                            <p className="font-semibold">₹{item.price}</p>
                        </div>
                    ))
                ) : (
                    <h1 className="text-lg font-semibold text-center">No Items Added</h1>
                )}
            </section>

            <hr className="border-gray-700 my-3" />

            <div className="tracking-tighter my-8">
                <div className="flex justify-between py-1">
                    <span>Items subtotal :</span> <span className="font-semibold">₹{subTotal}</span>
                </div>
                <div className="flex justify-between py-1">
                    <span>Discount :</span> <span className="font-semibold text-green-600">- ₹{discount}</span>
                </div>
                <div className="flex justify-between py-1">
                    <span>Tax :</span> <span className="font-semibold">₹{tax}</span>
                </div>
                <div className="flex justify-between py-1">
                    <span>Shipping Cost :</span> <span className="font-semibold">₹{shippingCharges}</span>
                </div>
            </div>

            <hr className="border-gray-700 my-3" />



            <div className="flex justify-between font-bold text-lg my-4">
                <span>Total :</span> <span>₹{total}</span>
            </div>

            {/* <button
                className="w-full bg-indigo-950 font-semibold text-white py-2 rounded-lg mt-4 hover:bg-zinc-700"
                // onClick={handleCheckout}
            >
                Proceed to check out
            </button> */}
            {/* </div> */}
        </>
    )
}

export default CartSummary