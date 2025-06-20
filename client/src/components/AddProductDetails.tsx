import AdminSidebar from '@/components/AdminSidebar';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { CgClose } from 'react-icons/cg';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import _ from 'lodash';
import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { decryptedData, responseToast, SERVER } from '@/utilities/features';
import toast from 'react-hot-toast';
import { categoriesWithIcons } from '@/utilities/data';
import { Product } from '@/types/types';

const AddProductDetails = ({ data }: { data?: string }) => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Product>({
        defaultValues: {
            name: '',
            price: null,
            stock: null,
            discount: null,
            category: '',
            description: '',
        }
    });
    const textColor = "text-gray-700 dark:text-gray-400"

    const router = useRouter();
    const [product, setProduct] = useState<Product | null>(null);
    const [photoPrev, setPhotoPrev] = useState<string[]>([]);
    const [photo, setPhoto] = useState<File[] | []>([]);
    const [specification, setSpecification] = useState({});
    const [label, setLabel] = useState<string>('');
    const [property, setProperty] = useState<string>('');


    useEffect(() => {
        if (data) {
            const product: Product = decryptedData(data);
            setProduct(product);
            console.log(product);

            reset({
                name: product?.name || '',
                price: product?.price || null,
                stock: product.stock || null,
                discount: product.discount || null,
                category: product.category || '',
                description: product.description || '',
            })
            setPhotoPrev(product.photos);
            setSpecification(product.specification)
        }
    }, [data])


    const onSubmit = async (data: any) => {

        console.log(specification);


        const formData = new FormData();

        formData.set('name', data.name);
        formData.set('stock', data.stock);
        formData.set('price', data.price);
        formData.set('category', data.category);
        formData.set('description', data.description);
        formData.set('discount', data.discount);

        if(specification)
            formData.set('specification', JSON.stringify(specification));
        
        if (photo && photo.length) {
            photo.forEach((file) => {
                formData.append('photo', file);
            });
        }

        if (product) {

            const removePhotos = product.photos.filter((photo) => !photoPrev.includes(photo));
            formData.append('removePhoto', JSON.stringify(removePhotos));

            try {
                const res = await Axios.put(`/product/${product._id}?id=${user?._id}`, formData);

                responseToast(res, router, '/admin/products');
            } catch (error: any) {
                console.log(error);
                responseToast(error.response);
            }
        }
        else {

            try {
                const res = await Axios.post(`/product/new?id=${user?._id}`, formData);

                responseToast(res, router, '/admin/products');
            } catch (error: any) {
                console.log(error);
                responseToast(error.response);
            }
        }
    }

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader: FileReader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPhotoPrev((prev) => {
                        return [...prev, reader.result as string];
                    });

                }
            };
            setPhoto((prev) => {
                return [...prev, file];
            });
        }

    };

    const handleBack = () => {
        router.replace('/admin/products');
    }

    const removeHandler = (tag: string, index?: number, key?: string) => {
        if (tag === 'image') {
            setPhoto((prev) => prev.filter((_, ind) => ind !== index));
            setPhotoPrev((prev) => prev.filter((_, ind) => ind !== index));
        }

        if (tag === 'property') {
            const speci = _.omit(specification, `${key}`);
            setSpecification(speci);
        }

    }

    const handleAdd = () => {
        if (label && property) {
            setSpecification((prev) => {
                return {
                    ...prev,
                    [label]: property
                }
            });
            setLabel('');
            setProperty('');
        }
        else toast.error('Please fill the fields');

    }

    return (
        <>
            <form
                className='w-full flex flex-col items-start gap-6'
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="w-full bg-background flex justify-between items-center rounded-lg font-bold p-4 ">
                    <h2 className='text-xl'>Add a product</h2>
                    <div className="buttons w-fit px-3 flex flex-row justify-start items-center gap-2 lg:gap-4">
                        <button type='button' className="w-24 rounded-xl font-semibold py-2 lg:py-3 " onClick={handleBack}>Cancel</button>
                        <button
                            type='submit'
                            className="w-32 bg-indigo-950 dark:bg-indigo-700 text-white px-2 py-2 rounded-xl font-semibold lg:py-3"
                        >
                            {product ? 'Save Product' : 'Add Product'}
                        </button>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-4">
                    <div className='w-full md:w-[35%] flex flex-col justify-between gap-5 '>

                        <div className='w-full rounded-lg bg-background p-4 font-medium inputStyle border border-borderColor'>
                            <h2 className='text-lg'>Product Name:</h2>
                            <input
                                type="text"
                                placeholder='Write name here...'
                                className=' my-2 w-full'
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && <small>{errors?.name.message}</small>}
                        </div>

                        <div className='w-full rounded-lg bg-background p-4 inputStyle border border-borderColor'>
                            <h2 className='text-lg font-medium'>Product Category</h2>
                            <span className='mt-3'>Select category:</span>
                            <select
                                {...register('category', { required: 'Category is required' })} >
                                <option value="">select category</option>
                                {categoriesWithIcons.map((cat, index) => (
                                    <option key={index} value={cat.name.toLowerCase()}>{cat.name.toUpperCase()}</option>
                                ))}
                            </select>
                            {errors.category && <small>{errors?.category.message}</small>}
                        </div>

                        <div className='w-full rounded-lg bg-background flex flex-col gap-5 border border-borderColor p-4'>

                            <h2 className='text-lg font-medium'>Product Price</h2>
                            <div className='flex justify-between gap-3'>
                                <div className='inputStyle w-[70%]'>
                                    <span>Base price:</span>
                                    <input
                                        type="text"
                                        placeholder='Enter a price...'
                                        {...register('price', { required: 'Price is required', pattern: /^[0-9]/ })}
                                    />
                                    {(errors.price)
                                        && ((errors.price as any).type === 'required' ?
                                            <small>{errors?.price.message}</small>
                                            : <small>Invalid input</small>
                                        )}
                                </div>
                                <div className='inputStyle w-[25%]'>
                                    <span>Currency:</span>
                                    <select name="" id="">
                                        <option value="">INR</option>
                                    </select>
                                </div>
                            </div>

                            <div className='inputStyle'>
                                <span>Discount in percentage:</span>
                                <input
                                    type="number"
                                    placeholder='Enter a discount...'
                                    {...register('discount')}
                                />
                            </div>

                            <div className='inputStyle'>
                                <span>Final price:</span>
                                <input
                                    type="text"
                                    // placeholder='Enter a price...'
                                    disabled
                                    className='disabled:bg-gray-200 disabled:cursor-not-allowed'
                                />
                            </div>
                        </div>

                        <div className='w-full rounded-lg bg-background p-4 inputStyle border border-borderColor'>
                            <h2 className='text-lg font-medium'>Product Stock</h2>
                            <span className='mt-3'>Add stock:</span>
                            <input
                                type="number"
                                placeholder='Enter a stock'
                                className=' my-2 w-full'
                                {...register('stock', { required: 'Stock is required' })}
                            />
                            {errors.stock && <small>{errors?.stock.message}</small>}
                        </div>

                    </div>
                    <div className='w-full md:w-[65%] flex flex-col justify-between gap-5 '>


                        <div className='w-full rounded-lg bg-background p-4 border border-borderColor'>
                            <h2 className='text-lg font-medium'>Add Images</h2>
                            <input
                                type="file"
                                accept="image/*"
                                className='hidden'
                                id='imageRef'
                                onChange={changeImageHandler}
                            />

                            <div className='flex gap-3 '>
                                {Array.isArray(photoPrev) && photoPrev.length > 0 &&
                                    photoPrev.map((src, index) => {
                                        let url = '';
                                        if(src.includes('uploads/')) url = `${SERVER}/${src}`;
                                        else url = src;

                                        return (
                                        <div key={index} className='relative mt-2'>
                                            <button
                                                type='button'
                                                className="p-1 bg-black text-white font-medium  text-medium absolute rounded-full -top-3 -right-2"
                                                onClick={() => removeHandler('image', index)}
                                            >
                                                <CgClose />
                                            </button>
                                            <Image
                                                key={index}
                                                src={url}
                                                alt='image'
                                                className='rounded-md'
                                                width={50}
                                                height={50}
                                            />
                                        </div>
                                    )})
                                }
                            </div>

                            <label
                                htmlFor="imageRef"
                                className='border-2 border-dashed border-gray-300 bg-orange-50 dark:bg-slate-700 rounded-lg block w-full h-48 my-2 text-center text-base content-center cursor-pointer opacity-80'
                            >
                                Drag your image here
                                <br />
                                or <span className='text-blue-600 hover:underline'>Browse</span>
                            </label>
                        </div>

                        <div className='w-full rounded-lg bg-background p-4 font-medium inputStyle border border-borderColor'>
                            <h2 className='text-lg'>Product Description:</h2>
                            {/* <input
                                type="text"
                                placeholder='Write a description here...'
                                className=' my-2 w-full content-start'
                                aria-expanded
                            /> */}
                            <textarea
                                placeholder='Write a description here...'
                                className='my-2 w-full min-h-64 max-h-64 text-lg'
                                {...register('description')}
                            />
                        </div>

                        <div className='w-full rounded-lg bg-background p-4 font-medium border border-borderColor'>
                            <h2 className='text-lg'>Product Specification:</h2>

                            <div className='w-full flex flex-col my-3'>
                                {specification && Object.entries(specification).map(([key, value]: any, index) => (
                                    <div
                                        key={index}
                                        className='w-full flex justify-between items-center gap-4'
                                    >
                                        <span className='w-[30%] text-center p-2 '>{key}</span>
                                        <span className='text-start border-b border-gray-500 p-2 px-5 bg-orange-50 dark:bg-black w-full'>{value}</span>
                                        <button
                                            type='button'
                                            className='bg-black/70 mx-2 text-white p-1 rounded-full '
                                            onClick={() => removeHandler('property', index, key)}
                                        ><FaMinus /></button>
                                    </div>
                                ))}
                            </div>

                            <div className='inputStyle w-full flex justify-between gap-3'>
                                <input
                                    type="text"
                                    style={{
                                        width: "30%"
                                    }}
                                    placeholder='Label'
                                    className='my-2'
                                    value={label}
                                    onChange={(e) => setLabel(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder='Property'
                                    className=' my-2'
                                    value={property}
                                    onChange={(e) => setProperty(e.target.value)}
                                />
                                <button
                                    type='button'
                                    className='bg-black/70 my-2 text-white p-3 rounded-md'
                                    onClick={handleAdd}
                                ><FaPlus /></button>

                            </div>
                        </div>

                    </div>
                </div>
            </form>
        </>
    );
}

export default AddProductDetails