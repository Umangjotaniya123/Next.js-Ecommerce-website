import Link from 'next/link';
import React from 'react'
import { useForm } from 'react-hook-form';

const login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = async (data: { email: string, password: string }) => {
        // console.log(data);

    }

    return (
        <div className="login flex flex-col justify-center items-center mt-24 text-sm">
            <form className='p-6 m-2 w-[80%] flex flex-col justify-center items-center shadow-xl rounded-lg sm:mx-24 sm:w-[60%] lg:w-[40%] lg:px-8' onSubmit={handleSubmit(onSubmit)}>
                <h1 className="heading text-xl sm:text-2xl">Login</h1>
                <div className="box flex flex-col flex-wrap justify-center items-start gap-4 w-full py-3 sm:px-8 lg:gap-8">

                    {/* Email */}
                    <div className="inputStyle w-full">
                        <label htmlFor="">Email</label>
                        <input type="emai"
                            placeholder='Email'
                            {...register('email', { required: 'Email is required', pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ })}
                        />
                        {errors.email && (errors.email.type === 'required'
                            ? <small>{errors.email.message}</small>
                            : <small>Invalid Email</small>
                        )}
                    </div>

                    {/* Password */}
                    <div className="inputStyle w-full">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: 'Enter Password', minLength: 6, maxLength: 6 })}
                        />
                        {errors.password && (errors.password.type === 'required'
                            ? <small>{errors.password.message}</small>
                            : <small>Minimum 6 characters required</small>
                        )}
                    </div>
                </div>
                <div className="buttons w-full flex flex-col justify-center items-center gap-4 pt-4">
                    <button className="w-32 bg-blue-500 rounded-2xl text-white font-semibold px-3 py-2 sm:w-44 lg:w-60 lg:py-3 lg:rounded-3xl">Sign In</button>
                    <p className='text-gray-600'>
                        Create new account? <Link href={'/signUp'} className="text-base text-black hover:underline hover:text-blue-500">Sign Up</Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default login;