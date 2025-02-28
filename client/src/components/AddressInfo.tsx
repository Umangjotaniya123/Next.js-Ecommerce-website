import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { Address, User } from '@/types/types';
import { responseToast } from '@/utilities/features';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';

const initialAddressValue = {
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: undefined,
    addType: '',
}
const options = ["Home", "Work", "Other"];

const AddressList = () => {

    const { user } = useAuth();
    const router = useRouter();

    const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<User>({
        defaultValues: {
            addressInfo: []
        }
    });


    const fieldsArray = useFieldArray({
        name: "addressInfo",
        control
    })

    const { fields, remove, append } = fieldsArray;
    const [show, setShow] = useState<boolean[]>([]);

    useEffect(() => {
        if (user) {
            reset({
                addressInfo: user?.addressInfo || []
            });
            setShow(user.addressInfo.map(() => false))
        }
    }, [user, reset]);

    const handleShow = (index: number) => {
        setShow((prevShow) => (
            prevShow.map((visible, inx) => inx === index ? !visible : visible)
        ))
    }

    const handleBack = () => {
        clearErrors();
        reset();
    };
    const onSubmit = async (data: any) => {
        // console.log(data);

        const formData = new FormData();
        formData.set('addressInfo', JSON.stringify(data.addressInfo));

        try {
            const res = await Axios.put(`/user/${user?._id}`, formData)

            responseToast(res, router, '/profile');

            if (res?.data) {
                reset({ ...data });
            }
        } catch (error: any) {
            responseToast(error?.response)
        }
    };

    return (
        <div className="flex flex-col justify-center py-3 w-full text-sm">
            <form
                className='py-6 px-2 border rounded-br-2xl rounded-tl-2xl bg-orange-100 border-orange-950 flex flex-col justify-center gap-4 '
                onSubmit={handleSubmit(onSubmit)}
            >
                {fields.map((field: { id: React.Key, addType: string }, index: number) => (
                    <div key={field.id} className='flex flex-col justify-start items-center sm:px-8'>

                        <div className="show flex flex-row justify-start items-center gap-4 w-full text-sm font-medium group">
                            <p>{field?.addType ? field.addType : 'New'} Address</p>
                            <div className="plus cursor-pointer w-4 h-4 text-base" onClick={() => handleShow(index)}>
                                {show[index] ? <FaChevronUp /> : <FaChevronDown />}
                            </div>
                            <div className="delete cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => remove(index)}><FaTrash /></div>
                        </div>

                        {(show[index]) && <div className="box grid grid-cols-1 gap-4 w-full p-3 sm:justify-between lg:grid-cols-2 lg:gap-8 text-base tracking-wide" key={field.id}>

                            {/* Address Type */}
                            <div className="inputStyle w-full sm:w-[95%]">
                                <label htmlFor="">Type of address</label>
                                <select
                                    {...register(`addressInfo.${index}.addType`, { required: 'Select type of Address' })}
                                >
                                    <option value="">Type of address</option>
                                    {options.map((option, _index) => {
                                        return <option value={option} key={_index}>{option}</option>
                                    })}
                                </select>
                                {Array.isArray(errors.addressInfo) && (errors.addressInfo as any)?.[index]?.addType && <small>
                                    {(errors.addressInfo as any)?.[index]?.addType.message}
                                </small>}
                            </div>

                            {/* Landmark */}
                            <div className="inputStyle w-full sm:w-[95%]">
                                <label htmlFor="">Landmark</label>
                                <input type="text"
                                    placeholder="Landmark"
                                    {...register(`addressInfo.${index}.address`, { required: 'Landmark is required' })}
                                />
                                {(errors.addressInfo as any)?.[index]?.address &&
                                    <small>{(errors.addressInfo as any)?.[index]?.address.message}</small>
                                }
                            </div>

                            {/* City */}
                            <div className="inputStyle w-full sm:w-[95%]">
                                <label htmlFor="">City</label>
                                <input type="text"
                                    placeholder="City"
                                    {...register(`addressInfo.${index}.city`, { required: 'City is required' })}
                                />
                                {(errors.addressInfo as any)?.[index]?.city && <small>
                                    {(errors.addressInfo as any)?.[index]?.city.message}
                                </small>}
                            </div>

                            {/* State */}
                            <div className="inputStyle w-full sm:w-[95%]">
                                <label htmlFor="">State</label>
                                <input type="text"
                                    placeholder="State"
                                    {...register(`addressInfo.${index}.state`, { required: 'State is required' })}
                                />
                                {(errors.addressInfo as any)?.[index]?.state && <small>
                                    {(errors.addressInfo as any)?.[index]?.state.message}
                                </small>}
                            </div>

                            {/* Country */}
                            <div className="inputStyle w-full sm:w-[95%]">
                                <label htmlFor="">Country</label>
                                <select
                                    {...register(`addressInfo.${index}.country`, { required: 'Select your country' })}
                                >
                                    <option value="">Choose Country</option>
                                    <option value="India">India</option>
                                </select>
                                {(errors.addressInfo as any)?.[index]?.country && <small>
                                    {(errors.addressInfo as any)?.[index]?.country.message}
                                </small>}
                            </div>

                            {/* Pin Code */}
                            <div className="inputStyle w-full sm:w-[95%]">
                                <label htmlFor="">Pincode</label>
                                <input type="number"
                                    placeholder="Pincode"
                                    {...register(`addressInfo.${index}.pincode`, {
                                        required: 'Pincode is required',
                                        minLength: 6, maxLength: 6,
                                    })}
                                />
                                {(errors.addressInfo as any)?.[index]?.pincode
                                    && ((errors.addressInfo as any)?.[index]?.pincode.type === 'required' ?
                                        <small>{(errors.addressInfo as any)?.[index]?.pincode.message}</small>
                                        : <small>Enterd 6 degits code</small>
                                    )}
                            </div>
                        </div>}
                    </div>
                ))}


                <div className="add flex flex-row justify-start items-center gap-4 text-sm font-medium sm:px-8">
                    <h4>Add New Address</h4>
                    <p className="flex justify-center items-center w-6 h-6 rounded-full cursor-pointer bg-slate-800 text-white text-xs" onClick={() => (
                        append(initialAddressValue),
                        setShow([...show, true])
                    )}>
                        <FaPlus />
                    </p>
                </div>
                <div className="buttons w-full px-3 flex flex-row justify-start items-center gap-2 pt-4 lg:gap-4">
                    <button type='submit' className="w-32 bg-indigo-950 text-white px-3 py-2 rounded-xl font-semibold lg:w-40 lg:py-3">Save Changes</button>
                    <button type='button' className="w-32 bg-gray-500 rounded-xl text-white font-semibold px-3 py-2 lg:w-40 lg:py-3" onClick={handleBack}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default AddressList;