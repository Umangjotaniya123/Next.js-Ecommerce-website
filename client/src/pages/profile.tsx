import Image from 'next/image';
import React, { useState } from 'react'
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { BiArrowBack } from 'react-icons/bi';
import AddressList from '@/components/AddressList';

type User = {
    _id: string;
    name: string;
    email: string;
    role: string;
    gender: string;
    dob: string;
    addressInfo: {
        address: string;
        city: string;
        state: string;
        country: string;
        pincode: number;
        addType: string;
        _id: string;
    }[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    photo: string;
}

const user =
{
    "_id": "677bcb2b119252e3a77cc29b",
    "name": "Umang Jotaniya",
    "email": "umang@gmail.com",
    "role": "admin",
    "gender": "male",
    "dob": "2005-02-15T00:00:00.000Z",
    "addressInfo": [
        {
            "address": "Madhuram, Udaybagar-1, st-15, mavadi chokadi",
            "city": "Rajkot",
            "state": "Gujarat",
            "country": "India",
            "pincode": 360000,
            "addType": "Home",
            "_id": "677e4b698a5f014ef1195ad5"
        },
        {
            "address": "KamleshPark",
            "city": "Nadiad",
            "state": "Gujarat",
            "country": "India",
            "pincode": 387005,
            "addType": "Work",
            "_id": "677e4c3c8a5f014ef1195ade"
        }
    ],
    "createdAt": "2025-01-06T12:23:07.008Z",
    "updatedAt": "2025-01-21T06:11:58.389Z",
    "__v": 30,
    "photo": "uploads/05f9cfce37e05b7b66d13d000.jpeg"
}


const profile = () => {

    const methods = useForm<User>({
        defaultValues: {
            name: user?.name,
            gender: user?.gender,
            email: user?.email,
            photo: user?.photo,
            dob: user?.dob.split("T")[0],
            addressInfo: user?.addressInfo,
        }
    });


    const [view, setView] = useState<boolean>(true);

    const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = methods;

    const fieldsArray = useFieldArray({
        name: "addressInfo",
        control
    })

    const [img, setImg] = useState(`/${user?.photo}`);
    const date = user?.dob.split('T')[0];
    const today = new Date();
    const maxDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    ).toISOString().split("T")[0];
    const profileObj = {
        Name: user.name,
        Email: user.email,
        Gender: user.gender,
        'Date of Birth': date
    }

    const handleBack = () => {
        setView(true);
        clearErrors();
        reset();
    };
    const onSubmit = () => { };

    return (
        <>
            {view ? (
                <div className="profile flex flex-col justify-center items-center w-full">
                    <main className='w-[90%] py-8 flex flex-col justify-center items-center shadow-xl md:w-[80%] lg:w-[60%]'>
                        <h1 className="heading text-xl sm:text-2xl">Profile</h1>
                        <div className="box flex flex-col justify-center items-center gap-4 w-full sm:flex-row sm:p-4">
                            <div className="box_left flex flex-col justify-center items-center gap-2 my-4 sm:w-1/3">
                                {img &&
                                    <Image
                                        className='rounded-lg w-44 h-44 sm:w-72 sm:h-72'
                                        src={'/download.jpeg'}
                                        alt='Photo'
                                        width={1000}
                                        height={1000}
                                    />}
                                <p className='text-lg font-medium sm:text-xl'>{user?.name}</p>
                            </div>
                            <div className="box_right flex flex-col justify-start gap-4 w-full px-4 text-sm sm:w-2/3 sm:text-lg">
                                {profileObj &&
                                    Object.entries(profileObj).map((obj, index) => {
                                        const [key, value] = obj;
                                        return (
                                            <div
                                                className='flex flex-row justify-start items-center gap-4 border-b border-gray-500 px-1 w-full'
                                                key={index}
                                            >
                                                <h5 className='font-semibold w-[43%] sm:w-[40%]'>{key} :</h5>
                                                <p className='space-x-3'>{value}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </main>
                    <button className='w-1/2 my-3 bg-blue-600 text-white p-3 rounded-lg text-lg font-semibold max-w-[400px]' onClick={() => setView(false)}>Edit Profile</button>
                </div>
            ) : (
                <div className="editProfile flex flex-col justify-center items-center w-full mt-12 text-sm">
                    <button
                        className="back-btn w-8 h-8 bg-slate-800 text-white flex justify-center items-center rounded-full fixed top-10 left-4 sm:w-10 sm:h-10 sm:left-6 lg:left-[5%]"
                        onClick={handleBack}
                    ><BiArrowBack /></button>
                    <FormProvider {...methods}>
                        <form
                            className='p-6 m-2 min-w-[70%] flex flex-col justify-center items-center shadow-xl rounded-md sm:max-w-[80%] lg:max-w-[75%]'
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <h1 className="heading text-xl sm:text-2xl">Edit Profile</h1>
                            <div className="box flex flex-col flex-wrap justify-center items-start gap-4 w-full py-3 sm:flex-row sm:justify-between sm:px-8 lg:justify-start lg:gap-8">
                                {/* Profile Photo */}
                                <div className='w-full sm:w-[45%] lg:w-[30%]'>
                                    <label htmlFor="">Photo</label>
                                    <div className="inputStyle w-full flex flex-row justify-center items-center gap-2">
                                        {img && <Image className='rounded-md' src={'/download.jpeg'} alt='Photo' width={60} height={60} />}
                                        {/* <img src={img} alt="Photo" /> */}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            {...register('photo')}
                                        />
                                    </div>
                                </div>

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
                                        defaultValue={date}
                                        type="date"
                                        max={maxDate}
                                        {...register('dob', { required: 'Enter valid date', max: maxDate })}
                                    />
                                    {errors.dob && <small>{errors.dob.message}</small>}
                                </div>
                            </div>

                            {/* Address_Information */}
                            <div className='w-full flex flex-col gap-4 my-4'>
                                <AddressList fieldsArray={fieldsArray} />
                            </div>


                            <div className="buttons w-full flex flex-row justify-center items-center gap-2 pt-4 lg:gap-4">
                                <button className="w-32 bg-gray-500 rounded-2xl text-white font-semibold px-3 py-2 lg:w-40 lg:py-3 lg:rounded-3xl" onClick={handleBack}>Cancel</button>
                                <button className="w-32 bg-blue-500 rounded-2xl text-white font-semibold px-3 py-2 lg:w-40 lg:py-3 lg:rounded-3xl">Save Changes</button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            )}
        </>
    )
}

export default profile;