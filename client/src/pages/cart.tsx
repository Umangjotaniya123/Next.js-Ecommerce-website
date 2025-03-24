import CartItemCard from '@/components/CartItemCard';
import ProductList from '@/components/ProductList';
import Axios from '@/config/axios';
import { calculatePrice } from '@/redux/reducer/cartReducer';
import { CartReducerInitialState } from '@/types/reducer-types';
import { Product } from '@/types/types';
import { decryptedData, encryptedData } from '@/utilities/features';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const cart = ({ data }: { data: string }) => {

  const dispatch = useDispatch();
  const { cartItems, subTotal, tax, total, shippingCharges, discount } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  const [products, setProducts] = useState<Product[] | []>([]);

  useEffect(() => {
    if (data) {
      setProducts(decryptedData(data));
    }
  }, [data])

  useEffect(() => {
    dispatch(calculatePrice());
  }, [cartItems])

  return (
    <div className="cart w-full flex flex-col items-center min-h-screen px-4 md:py-8">
      <h1 className="text-center heading font-bold text-2xl">Cart Items</h1>
      <div className='w-full md:w-[80%] md:min-h-[40rem] flex flex-col items-center gap-6 md:flex-row md:justify-between md:items-start'>
        <main className="w-full">
          <section className="flex flex-col justify-start pt-6 items-center gap-2 object-contain h-auto max-h-[60vh] overflow-y-auto py-3 md:max-h-none md:w-full">
            {cartItems.length > 0 ? (
              cartItems.map((i, idx) => <CartItemCard key={idx} cartItem={i} />)
            ) : (
              <h1 className="text-center text-lg font-semibold">No Items Added</h1>
            )}
          </section>
        </main>

        <div className="bg-orange-100 dark:bg-slate-900 p-6 rounded-lg shadow-md w-full h-fit max-w-lg md:w-[40%] md:max-w-md">
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
          </div>

          <div className="flex justify-between font-bold text-lg mt-4">
            <span>Total :</span> <span>₹{total}</span>
          </div>

          <button className="w-full bg-indigo-950 dark:bg-indigo-700 dark:hover:bg-zinc-500 font-semibold text-white py-2 rounded-lg mt-4 hover:bg-zinc-700">
            <Link href="/shipping">Proceed to Checkout</Link>
          </button>
        </div>
      </div>

      <section className='w-full md:w-[80%]'>
        <ProductList products={products} title='Also Search Products' latest />
      </section>
    </div>
  );
}

export default cart;

export const getServerSideProps: GetServerSideProps = async () => {

  let datas = null

  try {
    const { data } = await Axios.get('/product/latest');

    if (data) datas = data.products;


  } catch (error) {

  }
  const encryptData = encryptedData(datas);

  return {
    props: {
      data: encryptData,
    }
  }
}