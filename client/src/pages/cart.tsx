import CartItemCard from '@/components/CartItemCard';
import { calculatePrice } from '@/redux/reducer/cartReducer';
import { CartReducerInitialState } from '@/types/reducer-types';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const cart = () => {

  const dispatch = useDispatch();
  const { cartItems, subTotal, tax, total, shippingCharges, discount } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems])

  return (
    <div className="cart min-h-screen flex flex-col items-center gap-6 px-4 md:flex-row md:justify-center md:items-start md:py-8">
      <main className="w-full md:w-[50%] p-6">
        <h1 className="text-center font-bold text-2xl">Cart Items</h1>
        <section className="flex flex-col justify-start pt-6 items-center gap-2 object-contain h-auto max-h-[60vh] overflow-y-auto py-3 md:max-h-none md:w-full">
          {cartItems.length > 0 ? (
            cartItems.map((i, idx) => <CartItemCard key={idx} cartItem={i} />)
          ) : (
            <h1 className="text-center text-lg font-semibold">No Items Added</h1>
          )}
        </section>
      </main>

      <div className="bg-orange-100 p-6 rounded-lg shadow-md w-full h-fit max-w-lg md:w-[40%] md:max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Summary</h2>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Items subtotal :</span> <span className="font-semibold">₹{subTotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount :</span> <span className="font-semibold text-green-600">-₹{discount}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax :</span> <span className="font-semibold">₹{tax}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping Cost :</span> <span className="font-semibold">₹{shippingCharges}</span>
          </div>
          <div className="flex justify-between">
            <span>Subtotal :</span> <span className="font-semibold">₹{subTotal}</span>
          </div>
        </div>

        <div className="flex justify-between font-bold text-lg mt-4">
          <span>Total :</span> <span>₹{total}</span>
        </div>

        <button className="w-full bg-indigo-950 font-semibold text-white py-2 rounded-lg mt-4 hover:bg-zinc-700">
          <Link href="/shipping">Proceed to Checkout</Link>
        </button>
      </div>
    </div>
  );
}

export default cart;