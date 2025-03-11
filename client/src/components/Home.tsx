import { ProductCard } from '@/components/ProductCard';
import { Product } from '@/types/types';
import { decryptedData } from '@/utilities/features';
import { FaShippingFast, FaArrowRight } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Slider from '@/components/Slider';
import { AiOutlineLock } from 'react-icons/ai';
import { MdOutlineReplay30 } from 'react-icons/md';
import { HiTrophy } from 'react-icons/hi2';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { categoriesWithIcons } from '@/utilities/data';
import { useRouter } from 'next/router';

const Home = ({ data }: { data: string }) => {
    const [products, setProducts] = useState<Product[] | []>([]);
    const router = useRouter();

    useEffect(() => {
        setProducts(decryptedData(data));
    }, [data]);

    return (
        <div className="p-4 flex flex-col mx-auto w-full bg-orange-50">
            {/* Sliders */}
            <div className="w-full h-[30rem] md:h-[40rem] px-4 md:px-20">
                <Slider />
            </div>

            {/* Features Section */}
            <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 lg:gap-16 p-6 md:p-12 text-lg">
                {[
                    { icon: FaShippingFast, title: 'Free Shipping', desc: 'When ordering over ₹500' },
                    { icon: MdOutlineReplay30, title: 'Free Return', desc: 'Get Return within 30 days' },
                    { icon: AiOutlineLock, title: 'Secure Payment', desc: '100% Secure Online Payment' },
                    { icon: HiTrophy, title: 'Best Quality', desc: 'Original Product Guaranteed' },
                ].map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center">
                        <item.icon className="text-4xl md:text-6xl text-yellow-800 mb-2" />
                        <p className="font-medium">{item.title}</p>
                        <span className="text-sm">{item.desc}</span>
                    </div>
                ))}
            </section>


            {/* All Categories */}
            <main className="w-full">
                <h1 className="uppercase mx-3 mt-4 text-xl md:text-2xl flex justify-between items-center">
                    Search With Categories
                </h1>
                <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 py-6 px-4 md:px-12 gap-4 md:gap-7 md:gap-x-20">
                    {categoriesWithIcons.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <div 
                                key={index} 
                                className="h-24 md:h-32 text-sm md:text-md font-semibold flex flex-col justify-center items-center gap-2 cursor-pointer"
                                onClick={() => {
                                    router.push(`/search?category=${cat.name.toLowerCase()}`);
                                }}
                            >
                                <div className="bg-orange-200 p-3 md:p-4 text-xl md:text-2xl rounded-full">
                                    <Icon />
                                </div>
                                <span>{cat.name}</span>
                            </div>
                        );
                    })}
                </div>
            </main>

            {/* Latest Products */}
            <section className="w-full">
                <h1 className="uppercase mx-3 mt-4 text-xl md:text-2xl flex justify-between items-center">
                    Latest Products
                    <Link href="/search" className="text-sm md:text-md">More</Link>
                </h1>
                <main className="py-4 w-full">
                    <Swiper
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                        }}
                        spaceBetween={20}
                        navigation
                        freeMode={true}
                        modules={[FreeMode, Navigation]}
                        className="w-full"
                        style={{ padding: '2.25rem' }}
                    >
                        {Array.isArray(products) && products.map((product, index) => (
                            <SwiperSlide key={index}>
                                <ProductCard product={product} latest />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </main>
            </section>

            {/* Casual Selection */}
            <section className="relative m-6 md:m-20">
                <Image
                    src="/images/shop.jpg"
                    alt="Shop Section"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-[26rem] md:h-[40rem] object-cover object-left-top"
                />
                <div className="absolute top-[50%] left-4 md:right-16 md:left-auto transform -translate-y-1/2 w-[90%] md:w-[45%] bg-white/60 md:bg-transparent p-4 md:p-0 rounded-lg">
                    <div className="uppercase text-gray-600 tracking-wide text-base md:text-2xl">Denim collection</div>
                    <h1 className="text-4xl md:text-6xl font-bold my-3 md:my-6 leading-tight">The Casual Selection</h1>
                    <p className="text-sm md:text-lg w-full md:w-[80%] text-gray-800">
                        Vel non viverra ligula odio ornare turpis mauris. Odio aliquam, tincidunt ut vitae elit risus. Tempor egestas condimentum et ac rutrum dui, odio.
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 md:gap-4 text-lg md:text-2xl font-semibold mt-4 text-gray-800 hover:underline"
                    >
                        Shop Collection <FaArrowRight />
                    </Link>
                </div>
            </section>




            {/* Best Selling Products */}
            <section className="w-full">
                <h1 className="uppercase mx-3 mt-4 text-xl md:text-2xl flex justify-between items-center">
                    Best Selling Products
                    <Link href="/search" className="text-sm md:text-md">More</Link>
                </h1>
                <main className="py-4 w-full">
                    <Swiper
                        slidesPerView={2}
                        breakpoints={{
                            640: { slidesPerView: 3 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 5 },
                        }}
                        spaceBetween={20}
                        navigation
                        freeMode={true}
                        modules={[FreeMode, Navigation]}
                        className="w-full"
                        style={{ padding: '2.25rem' }}
                    >
                        {Array.isArray(products) && products.map((product, index) => (
                            <SwiperSlide key={index}>
                                <ProductCard product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </main>
            </section>
        </div>
    );
};

export default Home;
