import Axios from '@/config/axios';
import { responseToast } from '@/utilities/features';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { useForm } from 'react-hook-form';

const SignUp = () => {

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
        <div className="register w-full h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-sm">
            <form className='p-6 m-2 bg-orange-200 border border-yellow-900 flex flex-col justify-center items-center shadow-xl rounded-md sm:max-w-[80%] lg:max-w-[35%]'
                onSubmit={handleSubmit(onSubmit)}>

                <Image
                    src={'/logo1.png'}
                    alt='Logo'
                    width={150}
                    height={150}
                />
                <h1 className="heading text-xl sm:text-2xl">Sign Up</h1>
                <h4 className='text-xs sm:font-medium sm:text-sm'>Create your account today</h4>
                <div className="box grid grid-cols-1 gap-4 w-full mt-10 py-3 sm:justify-between sm:p-8 lg:grid-cols-2 lg:gap-8">

                    {/* Profile name */}
                    <div className="inputStyle w-full sm:w-[95%]">
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <small>{errors?.name.message}</small>}
                    </div>

                    {/* Email */}
                    <div className="inputStyle w-full sm:w-[95%]">
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: 'Email is required', pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                        />
                        {errors.email && (errors.email.type === 'required'
                            ? <small>{errors.email.message}</small>
                            : <small>Invalid Email</small>
                        )}
                    </div>

                    <div className="inputStyle w-full sm:w-[95%]">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: 'Enter Password', minLength: 6 })}
                        />
                        {errors.password && (errors.password.type === 'required'
                            ? <small>{errors.password.message}</small>
                            : <small>Minimum 6 characters required</small>
                        )}
                    </div>

                    {/* Gender */}
                    <div className="inputStyle w-full sm:w-[95%]">
                        <label htmlFor="">Gender</label>
                        <select
                            {...register('gender', { required: 'Gender is required' })}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        {errors.gender && <small>{errors.gender.message}</small>}
                    </div>

                    {/* Date of Birth */}
                    <div className="inputStyle w-full sm:w-[95%]">
                        <label htmlFor="">Date of Birth</label>
                        <input
                            type="date"
                            max={maxDate}
                            {...register('dob', { required: 'Enter valid date', max: maxDate })}
                        />
                        {errors.dob && <small>{errors.dob.message}</small>}
                    </div>
                </div>
                <div className="buttons w-full flex flex-col justify-center items-center gap-4 pt-4 sm:p-8">
                    <button className="w-32 bg-indigo-950 rounded-2xl text-white font-semibold px-3 py-2 sm:w-44 lg:w-full lg:py-3 lg:rounded-lg">Sign Up</button>
                    <Link href={'/login'} className="text-base font-semibold text-violet-950 hover:underline">Sign in to an existing account</Link>
                </div>
            </form>
        </div>
    )
}

export default SignUp;