import AdminSidebar from '@/components/AdminSidebar';
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';
import Axios from '@/config/axios';
import { decryptedData, encryptedData, responseToast, SERVER } from '@/utilities/features';
import { Product } from '@/types/types';
import { useAuth } from '@/context/AuthContext';


type Props = {
  data: string
}

const productManage = ({ data }: Props) => {

  const { user } = useAuth();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    setProduct(decryptedData(data));
  }, [data])

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>({
    defaultValues: {
      name: '',
      price: undefined,
      stock: undefined,
      category: '',
    }
  });

  const router = useRouter();
  const [photoPrev, setPhotoPrev] = useState<string>('');
  const [img, setImg] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);

  useEffect(() => {
    if (product) {
      reset({
        name: product?.name || '',
        price: product?.price || undefined,
        stock: product?.stock || undefined,
        category: product.category || '',
      })
      setImg(`${SERVER}/${product.photo}`);
    }
  }, [product])

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

  const onSubmit = async (data: any) => {
    // console.log(data);

    const formData = new FormData();
    formData.set('name', data.name);
    formData.set('stock', data.stock);
    formData.set('price', data.price);
    formData.set('category', data.category);
    if (photo) {
      formData.set('photo', photo);
    }
    else {
      formData.set('photo', data.photo);
    }

    try {
      const res = await Axios.put(`/product/${product?._id}?id=${user?._id}`, formData);

      if (res.data) {
        reset({ ...data });
        setPhotoPrev('');
        setProduct({
          ...product,
          ...data
        })
      }
      responseToast(res)
      router.replace(`/admin/products/${product?._id}`);

    } catch (error: any) {
      responseToast(error.response);
    }

  }

  const deleteHandler = async () => {

    try {
      const res = await Axios.delete(`/product/${product?._id}?id=${user?._id}`);
  
      responseToast(res, router, '/admin/products');

    } catch (error: any) {
      responseToast(error.response);
    }
  }

  const handleBack = () => {
    router.replace('/admin/products');
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management bg-slate-100 w-full flex justify-center items-center gap-6 max-w-[calc(100% - 360px)] overflow-y-scroll">
        <section className='relative w-2/5 h-[75vh] bg-white flex flex-col justify-between items-center gap-4 shadow-xl rounded-lg sm:max-w-[80%] lg:max-w-[75%] p-20'>
          <button className="btn -top-4 -left-4" onClick={handleBack}><BiArrowBack /></button>
          <strong className='font-medium'>ID - {product?._id}</strong>
          {img && <Image src={img} alt='product' width={200} height={200} />}
          {product && product?.stock > 0 ? (
            <span className="text-green-500 absolute right-8 top-8 text-lg tracking-wider font-medium">{product?.stock} Available</span>
          ) : (
            <span className="text-red-500 absolute right-8 top-8 text-lg tracking-wider font-medium"> Not Available</span>
          )}
          <div>
            <p className='text-center tracking-wide'>{product?.name}</p>
            <h3 className='text-lg text-center font-semibold'>₹{product?.price}</h3>
          </div>
        </section>
        <article className='relative w-2/5 h-[75vh] bg-white flex flex-col justify-center items-center shadow-xl rounded-lg sm:max-w-[80%] lg:max-w-[75%]'>
          <form
            className='p-6 flex flex-col justify-center items-center'
            onSubmit={handleSubmit(onSubmit)}
          >
            <button className="btn -top-4 -right-4" onClick={deleteHandler}>
              <FaTrash />
            </button>
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
                <input type="file" onChange={changeImageHandler} />
              </div>

            </div>
            {photoPrev && <Image className='rounded-md' src={photoPrev} alt='Photo' width={100} height={100} />}
            <button className="w-48 m-6 bg-blue-500 rounded-2xl text-white font-semibold px-3 py-2">Submit</button>
          </form>
        </article>
      </main>
    </div>
  )
};
export default productManage;

export const getServerSideProps = async (context: any) => {

  const { productId } = context.query;

  let product;
  try {

    const { data } = await Axios.get(`/product/${productId}`)

    if (data) {
      product = encryptedData(data.product)
    }
  } catch (error) {
    console.log(error);
  }


  return {
    props: { data: product },
  }
}