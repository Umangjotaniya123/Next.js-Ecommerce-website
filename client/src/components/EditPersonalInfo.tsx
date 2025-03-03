import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { User } from '@/types/types';
import { responseToast } from '@/utilities/features';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const EditPersonalInfo = () => {

    const { user, setUser, getUser } = useAuth();
    const router = useRouter();

    const methods = useForm<User>({
        defaultValues: {
            name: "",
            gender: "",
            email: "",
            photo: "",
            dob: "",
        }
    });

    const { register, handleSubmit, formState: { errors }, reset, clearErrors } = methods;

    useEffect(() => {
        if (user) {
            reset({
                name: user?.name || "",
                gender: user?.gender || "",
                email: user?.email || "",
                photo: user?.photo || "",
                dob: user?.dob ? user.dob.split("T")[0] : "",
            });
        }
    }, [user, reset]);


    const date = user?.dob.split('T')[0];
    const today = new Date();
    const maxDate = new Date(
        today.getFullYear() - 18,
        today.getMonth(),
        today.getDate()
    ).toISOString().split("T")[0];

    const onSubmit = async (data: any) => {
        // console.log(data);

        const formData = new FormData();
        formData.set('name', data.name);
        formData.set('gender', data.gender);
        formData.set('email', data.email);
        formData.set('dob', data.dob);

        try {
            const res = await Axios.put(`/user/${user?._id}`, formData)


            if (res?.data) {
                responseToast(res, router, '/profile');
                reset({ ...data });
                getUser();
            }
        } catch (error: any) {
            responseToast(error?.response)
        }
    };

    const handleBack = () => {
        clearErrors();
        reset();
    };

    return (
        <div className="flex flex-col justify-center py-3 w-full text-sm">
                <form
                    className='py-6 px-2 border rounded-br-2xl rounded-tl-2xl bg-orange-100 border-orange-950 flex flex-col justify-center items-center '
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="box grid grid-cols-1 gap-4 w-full p-3 sm:justify-between lg:grid-cols-2 lg:gap-8 text-base tracking-wide">

                        {/* Profile name */}
                        <div className="inputStyle w-full sm:w-[95%]">
                            <label htmlFor="">Full Name</label>
                            <input
                                type="text"
                                placeholder="Full Name"
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
                                defaultValue={date}
                                type="date"
                                max={maxDate}
                                {...register('dob', { required: 'Enter valid date', max: maxDate })}
                            />
                            {errors.dob && <small>{errors.dob.message}</small>}
                        </div>
                    </div>

                    <div className="buttons w-full px-3 flex flex-row justify-start items-center gap-2 pt-4 lg:gap-4">
                        <button type='submit' className="w-32 bg-indigo-950 text-white px-3 py-2 rounded-xl font-semibold lg:w-40 lg:py-3">Save Changes</button>
                        <button type='button' className="w-32 bg-gray-500 rounded-xl text-white font-semibold px-3 py-2 lg:w-40 lg:py-3 " onClick={handleBack}>Cancel</button>
                    </div>
                </form>
        </div>
    )
}

export default EditPersonalInfo;