import CartSummary from '@/components/CartSummary';
import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { addToCart, calculatePrice, saveShippingInfo } from '@/redux/reducer/cartReducer';
import { CartReducerInitialState } from '@/types/reducer-types';
import { Address, CartItem, User } from '@/types/types';
import { decryptedData, encryptedData, responseToast } from '@/utilities/features';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const initialAddress = {
  address: "",
  city: "",
  state: "",
  country: "",
  pincode: null!,
  addType: "",
};

const Shipping = () => {

  const { user } = useAuth();
  const router = useRouter();
  const dispatch = useDispatch();
  const [addressInfo, setAddressInfo] = useState<Address[] | []>([]);
  const [newAddressInfo, setNewAddressInfo] = useState<Address | null>(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<Address>({
    defaultValues: initialAddress
  });

  const { cartItems, subTotal, tax, total, shippingCharges, discount } = useSelector(
    (state: { cartReducer: CartReducerInitialState }) => state.cartReducer
  );

  useEffect(() => {
    if (user) {
      setAddressInfo(user.addressInfo);
    }
  }, [user]);

  useEffect(() => {
    if (addressInfo && addressInfo.length > 0) {
      setSelectedAddressIndex(0);
    }
  }, [addressInfo, reset, setValue]);


  const handleSelect = (index: number) => {
    // reset(initialAddress);
    setSelectedAddressIndex(index);
  };

  const onSubmit = async (data: any) => {
    setSelectedAddressIndex(-1);
    setNewAddressInfo(data);
  }

  const handleCheckout = async () => {
    let selectAddress;
    if (selectedAddressIndex == -1) {
      selectAddress = newAddressInfo;
    }
    else if (addressInfo.length && addressInfo[selectedAddressIndex]) {
      selectAddress = addressInfo[selectedAddressIndex];
    }
    else {
      toast.error('Please Select or add Address');
    }

    if (!selectAddress) return;

    dispatch(saveShippingInfo(selectAddress));

    try {
      const { data } = await Axios.post('/payment/create', { amount: total });

      router.push({
        pathname: '/checkout',
        query: { clientSecret: data.clientSecret }
      });
    } catch (error: any) {
      responseToast(error.response);
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col lg:flex-row justify-center items-start gap-10 p-6">
      <div className="w-full max-w-lg sm:max-w-full p-6 rounded-lg m-2 bg-orange-100 border border-yellow-900 flex flex-col justify-center gap-4 shadow-xl lg:max-w-[35%]">
        <h5 className="text-lg font-semibold mb-4">Select Shipping Address</h5>
        {addressInfo &&
          addressInfo.map((address, index) => (
            <div key={index} className="flex items-start gap-4">
              <input
                type="radio"
                name="select"
                checked={selectedAddressIndex === index}
                onChange={() => handleSelect(index)}
              />
              <div>
                <p className="font-medium">{`${address.addType} Address:`}</p>
                <p className="text-gray-600">{`${address.address}, ${address.city}, ${address.state}, ${address.country}.`}</p>
                <p className="text-gray-600">
                  <span className="font-semibold">Pincode:</span> {address.pincode}
                </p>
              </div>
            </div>
          ))}
        <hr className="border-gray-700" />

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-lg font-semibold">New Address</h1>
          <div className="grid grid-cols-1 gap-4 w-full mt-10 py-3 sm:grid-cols-2 sm:gap-6">
            <div className="inputStyle w-full">
              <label>Landmark</label>
              <input
                placeholder="Landmark"
                {...register("address", { required: "Landmark is required" })}
              />
              {errors.address && <small className="error">{errors.address.message}</small>}
            </div>
            <div className="inputStyle w-full">
              <label>City</label>
              <input placeholder="City" {...register("city", { required: "City is required" })} />
              {errors.city && <small className="error">{errors.city.message}</small>}
            </div>
            <div className="inputStyle w-full">
              <label>State</label>
              <input placeholder="State" {...register("state", { required: "State is required" })} />
              {errors.state && <small className="error">{errors.state.message}</small>}
            </div>
            <div className="inputStyle w-full">
              <label>Country</label>
              <select {...register("country", { required: "Country is required" })}>
                <option value="">Choose Country</option>
                <option value="India">India</option>
              </select>
              {errors.country && <small className="error">{errors.country.message}</small>}
            </div>
            <div className="inputStyle w-full">
              <label>Pincode</label>
              <input
                type="number"
                placeholder="Pincode"
                {...register("pincode", {
                  required: "Pincode is required",
                  minLength: { value: 6, message: "Pincode must be 6 digits" },
                  maxLength: { value: 6, message: "Pincode must be 6 digits" },
                })}
              />
              {errors.pincode && <small className="error">{errors.pincode.message}</small>}
            </div>
          </div>
          <div className="w-full flex flex-row gap-2 text-sm lg:gap-4">
            <button type="submit" className={`w-28 bg-indigo-950 hover:bg-zinc-800 text-white rounded-2xl font-semibold py-2 ${selectedAddressIndex == -1 ? 'bg-orange-800' : ''}`}>
              {selectedAddressIndex !== -1 ? 'Select' : 'Selected'}
            </button>
            <button
              type="button"
              className="w-28 bg-gray-500 hover:bg-gray-700 rounded-2xl text-white font-semibold py-2"
              onClick={() => setSelectedAddressIndex(0)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div className="w-full max-w-lg sm:max-w-full bg-orange-100 p-6 h-fit m-2 rounded-lg shadow-md lg:max-w-[35%]">
        {/* <div className="flex justify-between items-center mb-4 font-bold text-xl">
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

        <hr className="border-gray-700 my-3" />

        <div className="flex my-8 border-1 border-yellow-950 rounded-md p-2">
          <input type="text" placeholder="Voucher" className="w-full px-2 border-none bg-transparent focus:ring-0 outline-none" />
          <button className="text-indigo-800 px-2 font-semibold">Apply</button>
        </div>

        <div className="flex justify-between font-bold text-lg my-4">
          <span>Total :</span> <span>₹{total}</span>
        </div> */}

        <CartSummary />
        <button
          className="w-full bg-indigo-950 font-semibold text-white py-2 rounded-lg mt-4 hover:bg-zinc-700"
          onClick={handleCheckout}
        >
          Proceed to check out
        </button>
      </div>

    </div>
  );

}

export default Shipping;