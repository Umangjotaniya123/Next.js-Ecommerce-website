import AdminSidebar from '@/components/AdminSidebar';
import React, { ChangeEvent, useState } from 'react'
import Image from 'next/image';
import { FaTrash } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';


type Props = {
  data: string
}

const productManage = ({ data }: Props) => {

  // const product: Product = decryptData(data);

  const product = {
    "_id": "6787ba4de88165bff1ae82d6",
    "name": "Laptop - 3",
    "photo": "uploads/5af98d8106f3a8c47cc190c05.webp",
    "price": 132455,
    "stock": 15,
    "category": "laptop",
    "createdAt": "2024-11-15T13:38:21.147Z",
    "updatedAt": "2025-01-16T12:19:24.524Z",
    "__v": 0
  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: product?.name || '',
      price: product?.price || null,
      stock: product?.stock || null,
      category: product.category || '',
      photo: product.photo || '',
    }
  });

  const router = useRouter();
  // const [updateProduct] = useUpdateProductMutation();
  // const [deleteProduct] = useDeleteProductMutation();
  const [photoPrev, setPhotoPrev] = useState<string>('');
  const [photo, setPhoto] = useState<File | null>(null);

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

    // const formData = new FormData();
    // formData.set('name', data.name);
    // formData.set('stock', data.stock);
    // formData.set('price', data.price);
    // formData.set('category', data.category);
    // if (photo) {
    //   formData.set('file', photo);
    // }
    // else {
    //   formData.set('photo', data.photo);
    // }

    // const res = await updateProduct({
    //   productId: product._id,
    //   formData,
    // });

    // if (res.data) {
    //   router.replace(`/admin/products/${product._id}`);
    //   reset({ ...data });
    //   setPhotoPrev('');
    // }
    // responseToast(res);
  }

  const deleteHandler = async () => {
    // const res = await deleteProduct({
    //   productId: product._id,
    // })

    // if (res.data) {
    //   router.replace(`/admin/products`);
    // }
    // responseToast(res);
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
          <strong className='font-medium'>ID - {product._id}</strong>
          <Image src={`/shoose-2.jpeg`} alt='product' width={200} height={200} />
          {product?.stock > 0 ? (
            <span className="text-green-500 absolute right-8 top-8 text-lg tracking-wider font-medium">{product?.stock} Available</span>
          ) : (
            <span className="text-red-500 absolute right-8 top-8 text-lg tracking-wider font-medium"> Not Available</span>
          )}
          <div>
            <p className='text-center tracking-wide'>{product.name}</p>
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
                <input required type="file" onChange={changeImageHandler} />
              </div>

            </div>
            {photoPrev && <Image className='rounded-md' src={photoPrev} alt='Photo' width={100} height={100} />}
            <button className="w-48 m-6 bg-blue-500 rounded-2xl text-white font-semibold px-3 py-2">Create</button>
          </form>
        </article>
      </main>
    </div>
  )
};
export default productManage;

// export const getServerSideProps = async (context: any) => {

//   const { productId } = context.query;

//   let product;
//   try {
//     const res = await fetch(`http://localhost:3000/api/product/${productId}`)

//     if (res.ok) {
//       product = (await res.json()).product;
//     }
//   } catch (error) {
//     console.log(error);
//   }

//   const data = encryptData(product);

//   return {
//     props: { data },
//   }
// }