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
    const { user, setUser } = useAuth();

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

            if (res?.data?.success) {
                setUser(res.data.user);
            }

            responseToast(res, router, '/');


        } catch (error: any) {
            console.log('Error...', error);
            responseToast(error?.response);
        }

    }

    return (
        <div className="login w-full h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-sm">
            <form
                className='p-6 m-2 w-[80%] bg-orange-200 border border-yellow-900 flex flex-col justify-center items-center shadow-xl rounded-lg sm:mx-24 sm:w-[60%] lg:w-[35%] lg:px-8'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Image
                    src={'/logo1.png'}
                    alt='Logo'
                    width={150}
                    height={150}
                />
                <h1 className="heading mt-2 text-xl sm:text-2xl">Sign In</h1>
                <h4 className='text-xs sm:font-medium sm:text-sm'>Get access to your account</h4>
                <div className="box flex flex-col flex-wrap justify-center items-start mt-10 gap-4 w-full py-3 sm:px-8 lg:gap-8">

                    {/* Email */}
                    <div className="inputStyle w-full">
                        <label htmlFor="">Email Address</label>
                        <div className='flex justify-start items-center gap-2'>
                            <FaUser />
                            <input type="email"
                                placeholder='name@example.com'
                                {...register('email', { required: 'Email is required', pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                            />
                        </div>
                        {errors.email && (errors.email.type === 'required'
                            ? <small>{errors.email.message}</small>
                            : <small>Invalid Email</small>
                        )}
                    </div>

                    {/* Password */}
                    <div className="inputStyle w-full">
                        <label>Password</label>
                        <div className='flex justify-start items-center gap-2'>
                            <FaKey />
                            <input
                                type="password"
                                placeholder="Password"
                                {...register('password', { required: 'Enter Password', minLength: 6, maxLength: 6 })}
                            />
                        </div>
                        {errors.password && (errors.password.type === 'required'
                            ? <small>{errors.password.message}</small>
                            : <small>Minimum 6 characters required</small>
                        )}
                    </div>
                </div>
                <div className="buttons w-full flex flex-col justify-center items-center gap-4 pt-4 sm:p-8">
                    <button className="w-32 bg-indigo-950 rounded-2xl text-white font-semibold px-3 py-2 sm:w-44 lg:w-full lg:py-3 lg:rounded-lg">Sign In</button>
                    <Link href={'/signUp'} className="text-base font-semibold text-violet-950 hover:underline">Create an account</Link>
                </div>
            </form>
        </div>
    )
}

export default login;