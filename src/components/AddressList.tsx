import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa6';

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

const initialAddressValue = {
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: undefined,
    addType: '',
}
const options = ["Home", "Work", "Other"];

const AddressList = ({ fieldsArray }: any) => {

    const { register, formState: { errors } } = useFormContext<User>();
    const { fields, remove, append } = fieldsArray;
    const [show, setShow] = useState<boolean[]>(fields.map(() => false));

    const handleShow = (index: number) => {
        setShow((prevShow) => (
            prevShow.map((visible, inx) => inx === index ? !visible : visible)
        ))
    }

    return (
        <>
            {fields.map((field: { id: React.Key, addType: string }, index: number) => (
                <div key={field.id} className='flex flex-col justify-start items-center sm:px-8'>

                    <div className="show flex flex-row justify-start items-center gap-4 w-full text-sm font-medium group">
                        <p>{field?.addType ? field.addType : 'New'} Address</p>
                        <div className="plus cursor-pointer w-4 h-4 text-base" onClick={() => handleShow(index)}>
                            {show[index] ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        <div className="delete cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" onClick={() => remove(index)}><FaTrash /></div>
                    </div>

                    {(show[index]) && <div className='box flex flex-col flex-wrap justify-center items-start gap-4 w-full py-3 px-2 my-2 border border-gray-300 bg-gray-100 rounded-lg sm:flex-row sm:justify-between sm:pl-4 sm:pr-3  lg:justify-start lg:gap-8' key={field.id}>

                        {/* Address Type */}
                        <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
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
                        <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
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
                        <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
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
                        <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
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
                        <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
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
                        <div className="inputStyle w-full sm:w-[45%] lg:w-[30%]">
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
        </>
    )
}

export default AddressList;