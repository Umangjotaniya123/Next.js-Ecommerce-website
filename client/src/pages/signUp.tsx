import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { responseToast } from '@/utilities/features';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';

const SignUp = () => {

    const { getUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            gender: '',
            dob: ''
        }
    })

    const router = useRouter();

    const onSubmit = async (data: any) => {

        try {
            const res = await Axios.post('/user/register', data);

            responseToast(res, router, '/');
            getUser();

        } catch (error: any) {
            responseToast(error?.response)
        }

    }

    const today = new Date();
    const maxDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    ).toISOString().split("T")[0]
    // console.log(maxDate);


    return (
        <div className="register w-full min-h-screen flex flex-col justify-center items-center text-sm px-4">
          <form
            className="w-full max-w-md bg-orange-200 border border-yellow-900 dark:bg-slate-800 dark:border-slate-200 flex flex-col items-center shadow-xl rounded-lg p-6 sm:max-w-lg lg:max-w-lg lg:px-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Image src={'/logo1.png'} alt="Logo" width={150} height={150} />
            <h1 className="mt-2 text-xl sm:text-2xl font-bold">Sign Up</h1>
            <h4 className="text-xs sm:text-sm font-medium">Create your account today</h4>
      
            <div className="w-full grid grid-cols-1 gap-4 mt-8 md:grid-cols-2">
              {/* Name */}
              <div className="w-full">
                <label>Name</label>
                <input
                  type="text"
                  className="w-full border rounded-md px-3 py-2 bg-white dark:bg-black outline-none"
                  placeholder="Enter your name"
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <small className="text-red-600">{errors.name.message}</small>}
              </div>
      
              {/* Email */}
              <div className="w-full">
                <label>Email</label>
                <input
                  type="email"
                  className="w-full border rounded-md px-3 py-2 bg-white dark:bg-black outline-none"
                  placeholder="name@example.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                />
                {errors.email && (
                  <small className="text-red-600">
                    {errors.email.type === 'required' ? errors.email.message : 'Invalid Email'}
                  </small>
                )}
              </div>
      
              {/* Password */}
              <div className="w-full">
                <label>Password</label>
                <input
                  type="password"
                  className="w-full border rounded-md px-3 py-2 bg-white dark:bg-black outline-none"
                  placeholder="Password"
                  {...register('password', { required: 'Enter Password', minLength: 6 })}
                />
                {errors.password && (
                  <small className="text-red-600">
                    {errors.password.type === 'required' ? errors.password.message : 'Minimum 6 characters required'}
                  </small>
                )}
              </div>
      
              {/* Gender */}
              <div className="w-full">
                <label>Gender</label>
                <select
                  className="w-full border rounded-md px-3 py-2 bg-white dark:bg-black outline-none"
                  {...register('gender', { required: 'Gender is required' })}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && <small className="text-red-600">{errors.gender.message}</small>}
              </div>
      
              {/* Date of Birth */}
              <div className="w-full col-span-1 md:col-span-2">
                <label>Date of Birth</label>
                <input
                  type="date"
                  className="w-full border rounded-md px-3 py-2 bg-white dark:bg-black outline-none"
                  max={maxDate}
                  {...register('dob', { required: 'Enter valid date', max: maxDate })}
                />
                {errors.dob && <small className="text-red-600">{errors.dob.message}</small>}
              </div>
            </div>
      
            <div className="w-full flex flex-col items-center gap-4 mt-6">
              <button className="w-full bg-indigo-950 text-white dark:bg-indigo-700 dark:hover:bg-indigo-500 font-semibold py-3 rounded-lg hover:bg-zinc-700">
                Sign Up
              </button>
              <Link href="/login" className="text-base font-semibold text-violet-950 dark:text-violet-600 hover:underline">
                Sign in to an existing account
              </Link>
            </div>
          </form>
        </div>
      );
      
}

export default SignUp;