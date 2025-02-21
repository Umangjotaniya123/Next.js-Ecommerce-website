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
    FaTools,
    FaShoppingCart,
    FaLock,
    FaShippingFast,
    FaArrowRight
} from "react-icons/fa";
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Slider from '@/components/Slider';
import { AiFillTrophy, AiOutlineLock, AiOutlineUndo } from 'react-icons/ai';
import { TbAward } from 'react-icons/tb';
import { MdOutlineReplay, MdOutlineReplay30 } from 'react-icons/md';
import { RiSecurePaymentFill } from 'react-icons/ri';
import { GiRibbonMedal } from 'react-icons/gi';
import { LiaTrophySolid } from 'react-icons/lia';
import { HiTrophy } from 'react-icons/hi2';

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

const sliders = [
    '/images/slider-1',
    '/images/slider-2',
    '/images/slider-3',
    '/images/slider-4',
    '/images/slider-5',
]


const home = ({ data }: { data: string }) => {

    const [products, setProducts] = useState<Product[] | []>([]);

    useEffect(() => {
        setProducts(decryptedData(data));

    }, [data])


    const addToCartHandler = () => {

    };

    return (
        <div className="p-2 flex flex-col m-auto w-full bg-orange-50">
            {/* 
            <div className="w-full max-w-7xl mx-auto grid grid-cols-3 gap-6 p-6 bg-[#f9efe3]">
                <div className="col-span-2 flex justify-center">
                    <Image
                        className="w-full  rounded-lg shadow-lg"
                        src="/banner-3.jpeg"
                        alt="Xiaomi 13T PRO 5G"
                        width={600}
                        height={600}
                    />
                </div>

                <div className="flex flex-col gap-6">
                    <Image
                        className="w-full h-auto rounded-lg shadow-lg"
                        src="/banner-2.jpeg"
                        alt="Nike Air Jordan 1"
                        width={400}
                        height={400}
                    />
                    <Image
                        className="w-full h-auto rounded-lg shadow-lg"
                        src="/banner-1.jpg"
                        alt="Stylish Watch"
                        width={400}
                        height={400}
                    />
                </div>
            </div> */}

            <Slider />

            <section className='w-full flex justify-center gap-28 p-12 text-lg my-6'>
                <div className='flex items-center gap-2'>
                    <FaShippingFast className='text-6xl text-yellow-800' />
                    <div>
                        <p className='font-medium'>Free Shipping</p>
                        <span>When ordering over ₹500</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <MdOutlineReplay30 className='text-6xl text-yellow-800' />
                    <div>
                        <p className='font-medium'>Free Return</p>
                        <span>Get Return within 30 days</span>
                    </div>
                </div><div className='flex items-center gap-2'>
                    <AiOutlineLock className='text-6xl text-yellow-800' />
                    <div>
                        <p className='font-medium'>Secure Payment</p>
                        <span>100% Secure Online Payment</span>
                    </div>
                </div><div className='flex items-center gap-2'>
                    <HiTrophy className='text-6xl text-yellow-800' />
                    <div>
                        <p className='font-medium'>Best Quality</p>
                        <span>Original Product Guaranteed</span>
                    </div>
                </div>
            </section>

            <main className='w-full'>
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

            <section>
                <h1 className='space-x-2 uppercase mx-3 mt-4 text-2xl flex flex-row justify-between items-center gap-1'>
                    Latest Product
                    <Link href="/search" className="text-md">More</Link>
                </h1>
                <main className='m-2 w-full flex gap-3 overflow-x-auto'>
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
            </section>

            <section className='m-20 relative'>
                <Image
                    src={'/images/shop.jpg'}
                    alt='Shop Section'
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='w-[100%] h-[44rem] object-cover object-left-top'
                />
                <div className="absolute top-[30%] right-0 w-[50%] h-auto flex flex-col">
                    <div className='uppercase text-gray-400 tracking-wider text-2xl'>Denim collection</div>
                    <h1 className='text-6xl font-bold my-6'>The casual selection.</h1>
                    <p className='w-[80%] text-lg'>Vel non viverra ligula odio ornare turpis mauris. Odio aliquam, tincidunt ut vitae elit risus. Tempor egestas condimentum et ac rutrum dui, odio.</p>
                    <Link href={'/'} className='my-4 text-2xl font-semibold flex gap-6 items-center' >Shop collection <FaArrowRight /></Link>
                </div>

            </section>
        </div>
    )
}

export default home;
