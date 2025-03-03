import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { responseToast } from '@/utilities/features';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FaKey, FaUser } from 'react-icons/fa6';

const login = () => {

    const router = useRouter();
    const { getUser } = useAuth();

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: { email: string, password: string }) => {
        // console.log(data);

        try {
            const res = await Axios.post('/user/login', {
                email: data.email,
                password: data.password
            });

            getUser();
            responseToast(res, router, '/');


        } catch (error: any) {
            console.log('Error...', error);
            responseToast(error?.response);
        }

    }

    return (
        <div className="login w-full min-h-screen flex flex-col justify-center items-center text-sm px-4">
          <form
            className="w-full max-w-md bg-orange-200 border border-yellow-900 flex flex-col items-center shadow-xl rounded-lg p-6 sm:max-w-lg lg:max-w-lg lg:px-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Image src={'/logo1.png'} alt="Logo" width={150} height={150} />
            <h1 className="mt-2 text-xl sm:text-2xl font-bold">Sign In</h1>
            <h4 className="text-xs sm:text-sm font-medium">Get access to your account</h4>
      
            <div className="w-full flex flex-col mt-8 space-y-4">
              {/* Email Input */}
              <div className="w-full">
                <label>Email Address</label>
                <div className="flex items-center gap-2 border rounded-md px-2 py-2 bg-white">
                  <FaUser />
                  <input
                    type="email"
                    className="w-full outline-none bg-transparent"
                    placeholder="name@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    })}
                  />
                </div>
                {errors.email && (
                  <small className="text-red-600">{errors.email.type === 'required' ? errors.email.message : 'Invalid Email'}</small>
                )}
              </div>
      
              {/* Password Input */}
              <div className="w-full">
                <label>Password</label>
                <div className="flex items-center gap-2 border rounded-md px-2 py-2 bg-white">
                  <FaKey />
                  <input
                    type="password"
                    className="w-full outline-none bg-transparent"
                    placeholder="Password"
                    {...register('password', { required: 'Enter Password', minLength: 6, maxLength: 6 })}
                  />
                </div>
                {errors.password && (
                  <small className="text-red-600">{errors.password.type === 'required' ? errors.password.message : 'Minimum 6 characters required'}</small>
                )}
              </div>
            </div>
      
            <div className="w-full flex flex-col items-center gap-4 mt-6">
              <button className="w-full bg-indigo-950 text-white font-semibold py-3 rounded-lg hover:bg-zinc-700">
                Sign In
              </button>
              <Link href="/signUp" className="text-base font-semibold text-violet-950 hover:underline">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      );
      
}

export default login;