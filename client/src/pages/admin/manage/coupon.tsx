import Axios from "@/config/axios";
import { useAuth } from "@/context/AuthContext";
import { responseToast } from "@/utilities/features";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {

  const { user } = useAuth();
  const router = useRouter();
  const [amount, setAmount] = useState<number>();
  const [code, setCode] = useState<string>("");
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const [coupon, setCoupon] = useState<string>("");

  const copyText = async (coupon: string) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await Axios.post(`/payment/coupon/new?id=${user?._id}`, {
        coupon: code,
        amount
      });

      responseToast(res, router, '/admin/app/coupon');
      
    } catch (error: any) {
      responseToast(error.response);
    }


    // if (!includeNumbers && !includeCharacters && !includeSymbols)
    //   return alert("Please Select One At Least");

    // let result: string = prefix || "";
    // const loopLength: number = size - result.length;

    // for (let i = 0; i < loopLength; i++) {
    //   let entireString: string = "";
    //   if (includeCharacters) entireString += allLetters;
    //   if (includeNumbers) entireString += allNumbers;
    //   if (includeSymbols) entireString += allSymbols;

    //   const randomNum: number = ~~(Math.random() * entireString.length);
    //   result += entireString[randomNum];
    // }

    // setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <main className="w-full flex flex-col gap-5 px-12 py-5">
      <h1 className="w-[50%] heading text-2xl font-semibold ">Coupon</h1>
      <form className="w-[50%] flex flex-col gap-5 py-10" onSubmit={submitHandler}>


        <div className="inputStyle w-full sm:w-[50%]">
          <label>Coupon Code</label>
          <input
            type="text"
            placeholder="Write coupon code"
            name="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            // maxLength={size}
          />
        </div>

        <div className="inputStyle w-full sm:w-[50%]">
          <label>Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            required
          />
        </div>

        {/* <fieldset>
              <legend>Include</legend>

              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={() => setIncludeNumbers((prev) => !prev)}
              />
              <span>Numbers</span>

              <input
                type="checkbox"
                checked={includeCharacters}
                onChange={() => setIncludeCharacters((prev) => !prev)}
              />
              <span>Characters</span>

              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={() => setIncludeSymbols((prev) => !prev)}
              />
              <span>Symbols</span>
            </fieldset> */}


        <button
          type='submit'
          className="w-[50%] bg-indigo-950 dark:bg-indigo-700 text-white px-2 py-2 my-3 rounded-xl font-semibold lg:py-3"
        >
          Generate Coupon
        </button>
      </form>

      {coupon && (
        <code>
          {coupon}{" "}
          <span onClick={() => copyText(coupon)}>
            {isCopied ? "Copied" : "Copy"}
          </span>{" "}
        </code>
      )}
    </main>
  );
};

export default Coupon;
