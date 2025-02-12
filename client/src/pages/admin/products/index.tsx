import dynamic from "next/dynamic";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import TableHook from "@/components/TableHook";
import Image from "next/image";
import img from '../../../../public/shoose-2.jpeg'
import { Tooltip } from "@heroui/react";
import { GetServerSideProps } from "next";
import Axios from "@/config/axios";
import { decryptedData, encryptedData, SERVER } from "@/utilities/features";
import { useEffect, useState } from "react";
import { Product } from "@/types/types";

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

    const [productsData, setProductsData] = useState<Product[] | []>([]);

    useEffect(() => {
        setProductsData(decryptedData(data));
    }, [data])
    

      const products = productsData.map((product) => {
        return {
          _id: product._id,
          photo: (
            <Image
              src={`${SERVER}/${product.photo}`}
              alt={product.name}
              width={70}
              height={60}
            />
          ),
          name: product.name,
          price: product.price,
          stock: product.stock,
          action: <Link href={`/admin/products/${product._id}`}>
            <Tooltip color="primary" content='Edit Product'>
              <span className="text-lg text-primary-500 cursor-pointer active:opacity-50">
                Manage
              </span>
            </Tooltip>
          </Link>
        }
      })

    return (
        <div className="admin-container">
            <AdminSidebar />
            <main className="bg-slate-100 w-full flex justify-center max-w-[calc(100% - 360px)] overflow-y-scroll ">
                <div className="m-16 w-[60%]">
                    {products.length ?
                        <TableHook columns={columns} items={products} /> :
                        <h1>No any Products Available</h1>}
                </div>
                <Link
                    className="create-product-btn absolute right-10 top-20 w-10 h-10 rounded-full bg-gray-700 text-white flex justify-center items-center"
                    href={"/admin/products/new"}
                >
                    <FaPlus />
                </Link>
            </main>
        </div>
    );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async() => {

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
