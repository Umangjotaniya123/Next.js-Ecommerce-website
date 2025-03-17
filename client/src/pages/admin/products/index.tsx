import dynamic from "next/dynamic";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import TableHook from "@/components/TableHook";
import Image from "next/image";
import img from '../../../../public/shoose-2.jpeg'
import { Tooltip } from "@heroui/react";
import { GetServerSideProps } from "next";
import Axios from "@/config/axios";
import { decryptedData, encryptedData, responseToast, SERVER } from "@/utilities/features";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { BiEditAlt } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const AdminSidebar = dynamic(() => import('@/components/AdminSidebar'));

const columns = [
  {
    name: "Photo",
    uid: "photo",
  },
  {
    name: "Name",
    uid: "name",
  },
  {
    name: "Price",
    uid: "price",
  },
  {
    name: "Discount",
    uid: "discount",
  },
  {
    name: "Stock",
    uid: "stock",
  },
  {
    name: "Action",
    uid: "action",
  },
];

type Props = {
  data: string;
}

const Products = ({ data }: Props) => {

  const { user } = useAuth()
  const router = useRouter();
  const [productsData, setProductsData] = useState<Product[] | []>([]);

  useEffect(() => {
    setProductsData(decryptedData(data));
  }, [data])

  if(!user)
    return <div>Loading....</div>

  const handleDelete = async (productId: string) => {
    try {
      const res = await Axios.delete(`/product/${productId}?id=${user?._id}`);

      responseToast(res, router, '/admin/products');

    } catch (error: any) {
      responseToast(error.response);
    }
  }

  const products = productsData.map((product) => {
    return {
      _id: product._id,
      photo: <div className="w-full flex justify-center">
        <Image
          src={product.photos && product.photos.length ? `${SERVER}/${product.photos[0]}` : '/images/Image-not-found.png'}
          alt={product.name}
          width={70}
          height={60}
        />
      </div>
      ,
      name: <Link href={`/admin/products/details?id=${product._id}`}>
        <span className="text-blue-500 hover:underline">{product.name}</span>
      </Link>,
      price: product.price,
      discount: <span className="text-green-500 font-semibold">
        {product.discount ? `-${product.discount}%` : '0%'}
      </span>,

      stock: product.stock,
      action:
        <div className="w-full flex gap-6 items-center justify-center">
          <Link href={`/admin/products/details?id=${product._id}`}>
            <Tooltip color="foreground" content='View Product'>
              <span className="text-xl cursor-pointer active:opacity-50">
                <MdOutlineRemoveRedEye />
              </span>
            </Tooltip>
          </Link >

          <Link href={`/admin/products/${product._id}`}>
            <Tooltip color="foreground" content='Edit Product'>
              <span className="text-xl cursor-pointer active:opacity-50">
                <BiEditAlt />
              </span>
            </Tooltip>
          </Link>

          <Tooltip color="danger" content='Delete Product'>
            <span className="text-lg text-danger-500 cursor-pointer active:opacity-50" onClick={() => handleDelete(product._id)}>
              <FaTrash />
            </span>
          </Tooltip>

        </div>
    }
  })

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="w-full flex flex-col items-center max-w-[calc(100% - 360px)] overflow-y-scroll ">
        <h1 className="w-[80%] heading text-2xl font-semibold m-4">All Products</h1>
        <div className="m-8 w-[80%]">
          {products.length ?
            <TableHook columns={columns} items={products} /> :
            <h1>No any Products Available</h1>}
        </div>
        <Link
          className="create-product-btn absolute right-10 top-28 w-10 h-10 rounded-full bg-gray-700 text-white flex justify-center items-center"
          href={"/admin/products/new"}
        >
          <FaPlus />
        </Link>
      </main>
    </div>
  );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async () => {

  let products = null;

  try {
    const { data } = await Axios.get('/product/admin-products')

    if (data) {
      products = encryptedData(data.products);
    }

  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      data: products,
    }
  }
}
