import Link from 'next/link';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import { Product } from '@/types/types';
import { ProductCard } from './ProductCard';

type Propstype = {
    products: Product[] | [];
    title: string;
    latest?: boolean
}

const ProductList = ({ products, title, latest }: Propstype) => {
    return (
        <>
            <h1 className="uppercase mx-3 mt-4 text-xl md:text-2xl flex justify-between items-center">
                {title}
                <Link href="/search" className="text-sm md:text-md">More</Link>
            </h1>
            <main className="py-4 w-full">
                <Swiper
                    slidesPerView={2}
                    breakpoints={{
                        740: { slidesPerView: 3 },
                        1000: { slidesPerView: 4 },
                        1224: { slidesPerView: 5 },
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
                            <ProductCard product={product} latest={latest} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </main>
        </>
    )
}

export default ProductList;