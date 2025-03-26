import { ProductCard } from '@/components/ProductCard';
import Axios from '@/config/axios';
import { Product } from '@/types/types';
import { decryptedData, encryptedData } from '@/utilities/features';
import { GetServerSideProps } from 'next';
import React, { use, useEffect, useState } from 'react'

const wishlist = ({ data }: { data: string }) => {

    const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (data) {
            setWishlistItems(decryptedData(data));
        }
    }, [data]);

    return (
        <div className="w-full h-[calc(100vh-5rem)] pt-8 flex flex-col items-center">
            <main className="w-full md:w-[80%] p-8">
                {/* Search Bar (Only for Desktop) */}
                {/* <div className="hidden md:flex w-full px-4 mb-4">
                    <input
                        className="border p-2 rounded-lg w-full"
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div> */}

                {/* Products Grid */}
                <h1 className="text-center font-bold text-2xl">Wishlist Items</h1>
                {wishlistItems && wishlistItems.length > 0 ?
                    <div className="w-full columns-3xs gap-6 py-6">
                        {wishlistItems?.map((product, index) => (
                            <ProductCard key={index} product={product} latest wishlist />
                        ))}
                    </div> :
                    <h1 className="w-full heading my-8 text-center text-lg font-semibold">No Items Added</h1>
                }

                {/* Pagination */}
                {/* <article className="flex justify-center items-center gap-2 sm:gap-4">
                <button
                className={`font-semibold rounded-3xl px-6 py-2 bg-orange-900 text-white text-sm ${page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    >
                    Prev
                    </button>
                    <span className="font-semibold">{page}</span>
                    <button
                    className={`font-semibold rounded-3xl px-6 py-2 bg-orange-900 text-white text-sm ${page === maxPage ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={page === maxPage}
                    onClick={() => setPage((prev) => prev + 1)}
                >
                Next
                </button>
                </article> */}
            </main>
        </div>
    )
}

export default wishlist;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token } = req.cookies;
    let products = null;

    try {
        const { data } = await Axios.get(`/wishlist/get`, {
            headers: { token },
        });

        if (data)
            products = encryptedData(data.wishlistItems);
        
    } catch (error) {
        console.log(error);
    }

    return {
        props: { data: products }
    }
}