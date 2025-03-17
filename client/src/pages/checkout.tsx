import CartSummary from '@/components/CartSummary';
import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { resetCart } from '@/redux/reducer/cartReducer';
import { RootState } from '@/redux/store';
import { responseToast } from '@/utilities/features';
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const CheckOutForm = ({ clientSecret }: { clientSecret: string }) => {

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuth();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const {
    shippingInfo,
    subTotal,
    tax,
    shippingCharges,
    discount,
    total,
    cartItems
  } = useSelector(
    (state: RootState) => state.cartReducer
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    // console.log(stripe, elements);

    const order = {
      user: user?._id,
      shippingInfo,
      subTotal,
      tax,
      total,
      shippingCharges,
      discount,
      orderItems: cartItems
    };

    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/checkout/success` },
      redirect: "if_required",
    });

    if (error) {
      setIsProcessing(false);
      console.log(error.message);
      return toast.error(error.message || "Something Went Wrong");
    }


    if (paymentIntent?.status === 'succeeded') {
      try {
        const res = await Axios.post('/order/new', order);

        responseToast(res, router, '/order');
      } catch (error: any) {
        responseToast(error.response);
      }
    }

    setIsProcessing(false);
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <button type="submit" disabled={isProcessing} className={`w-full mt-4 bg-indigo-950 hover:bg-zinc-800 dark:bg-indigo-700 dark:hover:bg-zinc-500 text-white rounded-2xl text-lg font-semibold py-2 `}>
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  )
}

const Checkout = ({ clientSecret }: { clientSecret: string | null }) => {

  const { user } = useAuth();
  const router = useRouter();

  const {
    shippingInfo,
  } = useSelector((state: RootState) => state.cartReducer);


  useEffect(() => {
    if (!clientSecret || !shippingInfo.address) {
      router.push("/shipping");
      return;
    }

  }, [])



  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-10 p-6">
      <h1 className="heading w-[70%] my-5 text-start text-xl sm:text-2xl">Checkout</h1>
      <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center items-start gap-10 px-6">
        <div className="w-full max-w-lg sm:max-w-full p-6 rounded-lg m-2 bg-orange-100 dark:bg-slate-900 border border-yellow-900 dark:border-slate-200 flex flex-col justify-center gap-4 shadow-xl lg:max-w-[35%]">

          <div className="flex justify-start items-center gap-4 font-bold text-xl">
            <h2>Shipping Details</h2>
            <Link href={"/shipping"} className="text-blue-500 text-medium">
              Edit
            </Link>
          </div>

          <div className="p-3 -tracking-tighter w-full">

            <div className="flex justify-start gap-2 py-1">
              <span className='w-[30%] font-medium'>Name</span> <span>:</span>
              <span className='w-[70%]'>{user?.name}</span>
            </div>

            {shippingInfo &&
              <div className="flex justify-start gap-2 py-1 ">
                <span className='w-[30%] font-medium'>Address</span> <span>:</span>
                <span className='w-[70%]'>{`${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.country}`}</span>
              </div>
            }
          </div>

          <hr className="border-gray-700 " />

          {clientSecret &&
            <Elements
              options={{
                clientSecret,
              }}
              stripe={stripePromise}
            >
              <CheckOutForm clientSecret={clientSecret} />
            </Elements>
          }
        </div>

        <div className="w-full max-w-lg sm:max-w-full bg-orange-100 dark:bg-slate-900 p-6 h-fit m-2 rounded-lg shadow-md lg:max-w-[35%]">
          <CartSummary />
        </div>
      </div >

    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const clientSecret = context.query.clientSecret || null;

  return {
    props: {
      clientSecret,
    },
  };
};

export default Checkout;