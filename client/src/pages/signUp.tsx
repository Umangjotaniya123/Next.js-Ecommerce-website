import Link from 'next/link';
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

const onSubmit = async (data: any) => {

}

const today = new Date();
const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
).toISOString().split("T")[0]

  return (
    <div className="register flex flex-col justify-center items-center mt-24 w-full text-sm">
        <form className='p-6 m-2 min-w-[70%] flex flex-col justify-center items-center shadow-xl rounded-md sm:max-w-[80%] lg:max-w-[75%]' 
        onSubmit={handleSubmit(onSubmit)}>
            <h1 className="heading text-xl sm:text-2xl">Register</h1>
            <div className="box flex flex-col flex-wrap justify-center items-start gap-4 w-full py-3 sm:flex-row sm:justify-between sm:p-8 lg:justify-start lg:gap-8">

                {/* Profile name */}
                <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        placeholder="Name"
                        {...register('name', { required: 'Name is required' })}
                    />
                    {errors.name && <small>{errors?.name.message}</small>}
                </div>

                {/* Email */}
                <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
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

                <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
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
                <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
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
                <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
                    <label htmlFor="">Date of Birth</label>
                    <input
                        type="date"
                        max={maxDate}
                        {...register('dob', { required: 'Enter valid date', max: maxDate })}
                    />
                    {errors.dob && <small>{errors.dob.message}</small>}
                </div>
            </div>
            <div className="buttons w-full flex flex-col justify-center items-center gap-4 pt-4">
                <button className="w-32 bg-blue-500 rounded-2xl text-white text-base font-semibold px-3 py-2 sm:w-44 lg:w-60 lg:py-3 lg:rounded-3xl">Sign Up</button>
                <p className='text-gray-600'>
                    You have an account? <Link href='/login' className="text-base text-black hover:underline hover:text-blue-500">Login</Link>
                </p>
            </div>
        </form>
    </div>
)
}

export default SignUp;