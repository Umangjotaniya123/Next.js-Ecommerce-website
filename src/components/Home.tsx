import ProductCard from '@/components/ProductCard';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const products = [
    {
        "_id": "6787ba4de88165bff1ae82d6",
        "name": "Laptop - 3",
        "photo": "uploads/5af98d8106f3a8c47cc190c05.webp",
        "price": 132455,
        "stock": 15,
        "category": "laptop",
        "createdAt": "2024-11-15T13:38:21.147Z",
        "updatedAt": "2025-01-16T12:19:24.524Z",
        "__v": 0
    },
    {
        "_id": "6788dc3cb7eec95383fbeca4",
        "name": "shoose",
        "photo": "uploads/5af98d8106f3a8c47cc190c04.jpeg",
        "price": 2342,
        "stock": 23,
        "category": "shoose",
        "createdAt": "2024-03-16T10:15:24.936Z",
        "updatedAt": "2025-01-16T10:15:24.936Z",
        "__v": 0
    },
    {
        "_id": "67890292b7eec95383fbf5d2",
        "name": "nike",
        "photo": "uploads/5af98d8106f3a8c47cc190c06.jpeg",
        "price": 1234,
        "stock": 10,
        "category": "shoose",
        "createdAt": "2024-11-16T12:58:58.852Z",
        "updatedAt": "2025-01-16T12:58:58.852Z",
        "__v": 0
    }
]

const home = () => {

    const addToCartHandler = () => {

    };

    return (
        <div className="p-2 flex flex-col m-auto w-full ">
            <section className='w-full h-96 m-auto bg-no-repeat bg-center bg-cover'
                style={{ backgroundImage: "url('/cover.jpg')" }}
            ></section>
            <h1 className='space-x-2 uppercase mx-3 mt-4 text-2xl flex flex-row justify-between items-center gap-1'>
                Latest Product
                <Link href="/search" className="text-md">More</Link>
            </h1>
            <main className='m-2 w-full flex gap-1 overflow-x-auto'>
                {products?.map((product, index) => (
                    <ProductCard
                        key={product._id}
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