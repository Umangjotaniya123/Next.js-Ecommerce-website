// "use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const sliders = [
    '/images/slider-1.jpeg',
    '/images/slider-2.jpeg',
    '/images/slider-3.jpeg',
    '/images/slider-4.jpeg',
    '/images/slider-5.jpeg',
]

const ImageSlider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {

            if (currentIndex === 4) setCurrentIndex(0);
            else setCurrentIndex(currentIndex + 1);

        }, 3000);

        return () => clearInterval(interval);
    }, [currentIndex])

    return (
        <div className="relative w-full mx-auto px-24">
            {/* Image Display */}
            <div className="overflow-hidden relative w-full h-[40rem] rounded-lg">
                {sliders.map((src, index) => (
                    <Image
                        key={index}
                        src={src}
                        alt={`Slide ${index + 1}`}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className={`absolute top-0 left-0 w-full h-full transition-transform duration-1000 ${index === currentIndex ? "translate-x-0" : "translate-x-full opacity-0"}`}
                    />
                ))}
            </div>

            {/* Dots Navigation */}
            <div className="flex justify-center mt-4">
                {sliders.map((_, index) => (
                    <div
                        key={index}
                        className={`w-3 h-3 mx-1 rounded-full transition-all ${index === currentIndex ? "bg-black" : "bg-gray-400"
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    ></div>
                ))}
            </div>
        </div>


    );
};

export default ImageSlider;
