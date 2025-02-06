import CartItemCard from '@/components/CartItemCard';
import Link from 'next/link';
import React, { useState } from 'react'
import { VscError } from 'react-icons/vsc';

const cartItems: any[] = [
    {
        "_id": "67908e7387ac7f59761d3ec8",
        "name": "nike",
        "photo": "uploads/5af98d8106f3a8c47cc190c06.jpeg",
        "price": 1234,
        "quantity": 2,
        "stock": 10,
        "productId": "67890292b7eec95383fbf5d2",
        "userId": "677bcb2b119252e3a77cc29b",
        "createdAt": "2025-01-22T06:21:39.886Z",
        "updatedAt": "2025-01-23T05:19:04.306Z",
        "__v": 0
    },
    {
        "_id": "67920acf89c43369a41d4afd",
        "name": "Camera",
        "photo": "uploads/4f9c3230c2d21887ee82ca800.jpeg",
        "price": 5000,
        "quantity": 3,
        "stock": 5,
        "productId": "6792092489c43369a41d4ac4",
        "userId": "677bcb2b119252e3a77cc29b",
        "createdAt": "2025-01-23T09:24:31.389Z",
        "updatedAt": "2025-01-27T09:00:46.350Z",
        "__v": 0
    },
    {
        "_id": "67920b8689c43369a41d4b16",
        "name": "shoose",
        "photo": "uploads/5af98d8106f3a8c47cc190c04.jpeg",
        "price": 2342,
        "quantity": 1,
        "stock": 23,
        "productId": "6788dc3cb7eec95383fbeca4",
        "userId": "677bcb2b119252e3a77cc29b",
        "createdAt": "2025-01-23T09:27:34.619Z",
        "updatedAt": "2025-01-23T09:27:34.619Z",
        "__v": 0
    }
]

const { subTotal, tax, total, shippingCharges, discount } = {
    subTotal: 4541, tax: 4674, total: 4643, shippingCharges: 4646, discount: 0
}
const cart = () => {

    const [couponCode, setCouponCode] = useState<string>("");
    const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);

    const incrementHandler = () => { };

    const decrementHandler = () => { };

    const removeHandler = () => { };

    return (
        <div className="cart flex flex-col gap-6 bg-gray-100">
            <main className='flex flex-col justify-start items-center gap-5 object-contain h-[60vh] overflow-y-auto relative py-3'>
                <h1 className='heading top-0 z-10 w-full text-center'>Cart Items</h1>
                {//isLoading ? <Skeleton width="80vw" /> :
                    cartItems.length > 0 ? (
                        cartItems.map((i, idx) => (
                            <CartItemCard
                                incrementHandler={incrementHandler}
                                decrementHandler={decrementHandler}
                                removeHandler={removeHandler}
                                key={idx}
                                cartItem={i}
                            />
                        ))
                    ) : (
                        <>
                            <h1 className='heading'>No Items Added</h1>
                        </>
                    )}
            </main>
            <aside className='p-4 text-sm w-full flex flex-col justify-start gap-2 fixed bottom-0  bg-white sm:px-8 sm:py-0 sm:text-base sm:flex-row sm:justify-start sm:h-auto sm:bottom-8' >
                <div className='flex flex-col justify-start gap-2 sm:w-1/2'>
                    <p>Subtotal:- ₹{subTotal}</p>
                    <p>Shipping Charges:- ₹{shippingCharges}</p>
                    <p>tax:- ₹{tax}</p>
                    <p>Discount:<em> - ₹{discount}</em></p>
                    <p><b>Total:- ₹{total}</b></p>
                </div>
                <div className='flex flex-col justify-start gap-2 sm:justify-center sm:items-center sm:w-1/2'>
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
                            className='bg-teal-700 text-white p-3 w-[60%] flex justify-center items-center uppercase space-x-2 font-semibold hover:bg-teal-600 rounded-lg sm:w-56'
                            href='/shipping'
                        >Checkout</Link>
                    }
                </div>
            </aside>
        </div>
    )
}

export default cart;