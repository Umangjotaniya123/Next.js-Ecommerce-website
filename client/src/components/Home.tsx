import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/types';
import { decryptedData } from '@/utilities/features';
import {
    FaShippingFast,
    FaArrowRight
} from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Slider from '@/components/Slider';
import { AiOutlineLock } from 'react-icons/ai';
import { MdOutlineReplay30 } from 'react-icons/md';
import { HiTrophy } from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation'
import { categoriesWithIcons } from '@/utilities/data';

const home = ({ data }: { data: string }) => {

    const [products, setProducts] = useState<Product[] | []>([]);

    useEffect(() => {
        setProducts(decryptedData(data));

    }, [data])

    return (
        <div className="p-2 flex flex-col m-auto w-full bg-orange-50">
            {/* Sliders */}
            <div className="w-full h-[40rem] px-20">
                <Slider />
            </div>

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

            {/* All Categories */}
            <main className='w-full'>
                <h1 className='space-x-2 uppercase mx-3 mt-4 text-2xl flex flex-row justify-between items-center gap-1'>
                    Search With Categories
                    {/* <Link href="/search" className="text-md">More</Link> */}
                </h1>
                <div className='w-full grid grid-cols-7 py-6 px-12 gap-7'>
                    {categoriesWithIcons.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <div key={index} className='h-32 text-md font-semibold flex flex-col justify-center items-center gap-2 cursor-pointer'>
                                <div className='bg-orange-200 p-4 text-2xl rounded-full'><Icon /></div>
                                <span>{cat.name}</span>
                            </div>
                        )
                    })}
                </div>
            </main>

            {/* Latest Products */}
            <section className='w-full'>
                <h1 className='space-x-2 uppercase mx-3 mt-4 text-2xl flex flex-row justify-between items-center gap-1'>
                    Latest Products
                    <Link href="/search" className="text-md">More</Link>
                </h1>
                <main className='py-4 w-full'>
                    <Swiper
                        slidesPerView={6}
                        spaceBetween={30}
                        navigation
                        freeMode={true}
                        modules={[FreeMode, Navigation]}
                        className='w-full'
                        style={{ padding: '2.25rem' }}
                    >
                        {Array.isArray(products) && products.map((product, index) => (
                            <SwiperSlide>
                                <ProductCard key={index} product={product} latest />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </main>
            </section>

            {/* casual selection */}
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
                    <Link href={'/'} className='w-fit my-4 text-2xl font-semibold flex gap-6 items-center' >Shop collection <FaArrowRight /></Link>
                </div>

            </section>

            {/* Best Selling Products */}
            <section className='w-full'>
                <h1 className='space-x-2 uppercase mx-3 mt-4 text-2xl flex flex-row justify-between items-center gap-1'>
                    Best Selling Products
                    <Link href="/search" className="text-md">More</Link>
                </h1>
                <main className='py-4 w-full'>
                    <Swiper
                        slidesPerView={5}
                        spaceBetween={30}
                        navigation
                        freeMode={true}
                        modules={[FreeMode, Navigation]}
                        className='w-full'
                        style={{ padding: '2.25rem' }}
                    >
                        {Array.isArray(products) && products.map((product, index) => (
                            <SwiperSlide>
                                <ProductCard key={index} product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </main>
            </section>
        </div>
    )
}

export default home;
