import index from '@/pages';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';
import Image from 'next/image';
import { Autoplay, EffectCreative, Navigation, Pagination } from 'swiper/modules';

const sliders = [
    '/images/slider-1.jpeg',
    '/images/slider-2.jpeg',
    '/images/slider-3.jpeg',
    '/images/slider-4.jpeg',
    '/images/slider-5.jpeg',
]

const Slider = () => {
    return (
            <Swiper
                spaceBetween={10}
                slidesPerView={1}
                loop={true}
                navigation={true}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                effect={'creative'}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ['100%', 0, 400],
                    },
                }}
                modules={[Navigation, Autoplay, Pagination, EffectCreative]}
                className="rounded-lg shadow-lg h-full"
            >
                {sliders.map((src, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Image
                                key={index}
                                src={src}
                                alt={`Slide ${index + 1}`}
                                width={0}
                                height={0}
                                sizes="100vw"
                                className={`w-full h-full`}
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
    )
}

export default Slider;
