import AdminSidebar from '@/components/AdminSidebar';
import React, { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { BiArrowBack, BiCross } from 'react-icons/bi';
import Image from 'next/image';
import { FaWindowClose } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';

const newProduct = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            price: null,
            stock: null,
            category: '',
            photo: '',
        }
    });

    const router = useRouter();
    const [photoPrev, setPhotoPrev] = useState<string>('');
    const [photo, setPhoto] = useState<File | null>(null);

    const onSubmit = async (data: any) => {
        // console.log(data);

        // const formData = new FormData();

        // formData.set('name', data.name);
        // formData.set('stock', data.stock);
        // formData.set('price', data.price);
        // formData.set('category', data.category);
        // if (photo)
        //     formData.set('file', photo!);

        // const res = await newProduct({ formData });

        // if (res.data) {
        //     router.replace('/admin/products');
        // }
        // responseToast(res);
    }

    const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file: File | undefined = e.target.files?.[0];

        const reader: FileReader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPhotoPrev(reader.result);
                }
            };
            setPhoto(file);
        }
    };

    const handleBack = () => {
        router.replace('/admin/products');
    }

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="product-management bg-slate-100 w-full flex flex-col items-center max-w-[calc(100% - 360px)] overflow-y-scroll">
                <form
                    className='p-6 m-6 mt-16 bg-white flex flex-col justify-center items-center shadow-xl rounded-lg sm:max-w-[80%] lg:max-w-[75%] relative'
                    onSubmit={handleSubmit(onSubmit)}
                >
                <button className="product-delete-btn" onClick={handleBack}><CgClose /></button>
                    <h2 className="heading text-xl sm:text-2xl">New Product</h2>
                    <div className="box flex flex-col justify-center items-start gap-8 w-full p-8 px-12">
                        <div className="inputStyle w-full flex gap-4 items-center">
                            <label className='w-1/3'>Name</label>
                            <input
                                type="text"
                                placeholder="Name"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && <small>{errors?.name.message}</small>}
                        </div>
                        <div className="inputStyle w-full flex gap-4 items-center">
                            <label className='w-1/3'>Price</label>
                            <input
                                type="number"
                                placeholder="Price"
                                {...register('price', { required: 'Price is required' })}
                            />
                            {errors.price && <small>{errors?.price.message}</small>}
                        </div>
                        <div className="inputStyle w-full flex gap-4 items-center">
                            <label className='w-1/3'>Stock</label>
                            <input
                                type="number"
                                placeholder="Stock"
                                {...register('stock', { required: 'Stock is required' })}
                            />
                            {errors.stock && <small>{errors?.stock.message}</small>}
                        </div>
                        <div className="inputStyle w-full flex gap-4 items-center">
                            <label className='w-1/3'>Category</label>
                            <input
                                type="text"
                                placeholder="eg. laptop, camera etc"
                                {...register('category', { required: 'Category is required' })}
                            />
                            {errors.category && <small>{errors?.category.message}</small>}
                        </div>

                        <div className="inputStyle w-full flex gap-4 items-center">
                            <label className='w-1/3'>Photo</label>
                            <input required type="file" onChange={changeImageHandler} />
                        </div>

                    </div>
                    {photoPrev &&  <Image className='rounded-md' src={photoPrev} alt='Photo' width={100} height={100} />}
                    <button className="w-48 m-6 bg-blue-500 rounded-2xl text-white font-semibold px-3 py-2">Create</button>
                </form>
            </main>
        </div>
    );
}

export default newProduct;