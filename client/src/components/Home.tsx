import ProductCard from '@/components/ProductCard';
import Axios from '@/config/axios';
import index from '@/pages';
import { Product } from '@/types/types';
import { decryptedData } from '@/utilities/features';
import {
    FaTshirt, FaShoePrints, FaMobileAlt, FaLaptop, FaClock,
    FaCouch, FaHome, FaBlender, FaGamepad,
    FaBox, FaBook, FaPaintBrush,
    FaShoppingBag,
    FaTools
} from "react-icons/fa";
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const categoriesWithIcons = [
    { name: "Clothing", icon: <FaTshirt /> },
    { name: "Footwear", icon: <FaShoePrints /> },
    { name: "Mobile Phones", icon: <FaMobileAlt /> },
    { name: "Laptops", icon: <FaLaptop /> },
    { name: "Smartwatches", icon: <FaClock /> },
    { name: "Furniture", icon: <FaCouch /> },
    { name: "Home Decor", icon: <FaHome /> },
    { name: "Kitchen Appliances", icon: <FaBlender /> },
    { name: "Toys", icon: <FaGamepad /> },
    { name: "Packaged Food", icon: <FaBox /> },
    { name: "E-books", icon: <FaBook /> },
    { name: "Makeup", icon: <FaPaintBrush /> },
    { name: "Accessories", icon: <FaShoppingBag /> },
    { name: "Hardware Tools", icon: <FaTools /> }
];

const latestProducts = [
    {
      _id: "1",
      name: "Wireless Earbuds",
      price: 49.99,
      discount: "20%",
      stock: 25,
      photo: "https://www.pngall.com/wp-content/uploads/5/Wireless-Earbuds-PNG.png"
    },
    {
      _id: "2",
      name: "Smartwatch Pro",
      price: 129.99,
      discount: "15%",
      stock: 18,
      photo: "https://www.pngall.com/wp-content/uploads/5/Smartwatch-PNG.png"
    },
    {
      _id: "3",
      name: "Gaming Mouse",
      price: 39.99,
      discount: "10%",
      stock: 30,
      photo: "https://www.pngall.com/wp-content/uploads/5/Gaming-Mouse-PNG.png"
    },
    {
      _id: "4",
      name: "Bluetooth Speaker",
      price: 59.99,
      discount: "25%",
      stock: 20,
      photo: "https://www.pngall.com/wp-content/uploads/5/Bluetooth-Speaker-PNG-Image.png"
    },
    {
      _id: "5",
      name: "DSLR Camera",
      price: 499.99,
      discount: "18%",
      stock: 12,
      photo: "https://www.pngall.com/wp-content/uploads/5/DSLR-Camera-PNG-Clipart.png"
    }
  ];
  
  
const home = ({ data }: { data: string }) => {

    const [products, setProducts] = useState<Product[] | []>([]);

    useEffect(() => {
        setProducts(decryptedData(data));

    }, [data])


    const addToCartHandler = () => {

    };

    return (
        <div className="p-2 flex flex-col m-auto w-full bg-orange-50">
            {/* <section className='w-full h-96 m-auto bg-no-repeat bg-center bg-cover'
                style={{ backgroundImage: "url('/cover.jpg')" }}
            ></section> */}

            <main className='w-full shadow-lg'>
                <h1 className='space-x-2 uppercase mx-3 mt-4 text-2xl flex flex-row justify-between items-center gap-1'>
                    Search With Categories
                    {/* <Link href="/search" className="text-md">More</Link> */}
                </h1>
                <div className='w-full grid grid-cols-7 py-6 px-12 gap-7'>
                    {categoriesWithIcons.map((cat, index) => {
                        return (
                            <div key={index} className='h-32 text-md font-semibold flex flex-col justify-center items-center gap-2 cursor-pointer'>
                                <div className='bg-orange-200 p-4 text-2xl rounded-full'>{cat.icon}</div>
                                <span>{cat.name}</span>
                            </div>
                        )
                    })}
                </div>
            </main>

            <h1 className='space-x-2 uppercase mx-3 mt-4 text-2xl flex flex-row justify-between items-center gap-1'>
                Latest Product
                <Link href="/search" className="text-md">More</Link>
            </h1>
            <main className='m-2 w-full flex gap-1 overflow-x-auto'>
                {latestProducts?.map((product, index) => (
                    <ProductCard
                        key={index}
                        productId={product._id}
                        name={product.name}
                        price={product.price}
                        photo={product.photo}
                        stock={product.stock}
                        handler={addToCartHandler}
                    />
                ))}
            </main>
        </div>
    )
}

export default home;
