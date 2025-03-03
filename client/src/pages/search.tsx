import { ProductCard } from '@/components/ProductCard';
import Axios from '@/config/axios';
import { Product, SearchRequestQuery } from '@/types/types';
import { decryptedData, encryptedData } from '@/utilities/features';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa6';

const search = ({ data }: { data: string }) => {

    const router = useRouter();

    const divRef = useRef<HTMLElement>(null);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(200000);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [allCategory, setAllCategory] = useState<string[] | []>([]);
    const [page, setPage] = useState(1);
    const [maxPage, setMaxPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [searchAllProducts, setSearchAllProducts] = useState<Product[]>([]);
    const [searchProducts, setSearchProducts] = useState<Product[]>([]);

    useEffect(() => {        

        if (data) {
            const decryptData = decryptedData(data);
            setAllCategory(decryptData.categories);
            setPage(1);
            setSearchAllProducts(decryptData.products);
            setMaxPage(decryptData.totalPage);
        }
    }, [data]);
    
    useEffect(() => {
        const startIndex = 20 * (page - 1);
        const products = searchAllProducts?.slice(startIndex, startIndex + 20);
        setSearchProducts(products);
        divRef.current?.scroll(0, 0);
    }, [page, searchAllProducts]);
    
    
    useEffect(() => {
        
        // const getSearchProducts = async() => {
            
        //     try {
        //         const { data } = await Axios.get(url);
                
        //         if(data) {
        //         }
                
        //     } catch (error) {
        //         console.log('Error - ', error);
        //     }
        // }
        
        const query: SearchRequestQuery = {}

        query.price = `${maxPrice}`;
        if(search) query.search = `${search}`; 
        if(selectedCategory) query.category = `${selectedCategory}`; 
        if(sort) query.sort = `${sort}`; 
        
        router.query = { ...query }
        router.replace(router);
        // getSearchProducts();

    }, [search, maxPrice, selectedCategory, sort]);

    return (
        <div className="w-full h-[calc(100vh-5rem)] pt-8 flex flex-col md:flex-row gap-2">
            {/* Mobile: Search Bar + Filter Button */}
            <div className="flex justify-between items-center w-full px-4 md:hidden">
                <input
                    className="border p-2 rounded-lg w-full"
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <button
                    className="ml-2 p-2 bg-yellow-800 text-white rounded-lg"
                    onClick={() => setShowModal(!showModal)}
                >
                    <FaFilter className="text-xl" />
                </button>
            </div>

            {/* Filter Sidebar: Always visible on large screens, modal on mobile */}
            {showModal && (
                <aside className="fixed top-16 left-4 w-[80%] h-auto p-6 bg-white shadow-lg rounded-lg transition-all duration-300 md:hidden">
                    <h2 className="text-lg sm:text-xl font-semibold text-center">Filters</h2>
                    {/* Sort */}
                    <div className="inputStyle">
                        <h4>Sort</h4>
                        <select value={sort} onChange={e => setSort(e.target.value)} className="border p-2 rounded-lg">
                            <option value="">None</option>
                            <option value="asc">Price (Low to High)</option>
                            <option value="dsc">Price (High to Low)</option>
                        </select>
                    </div>
                    {/* Max Price */}
                    <div className="inputStyle">
                        <h4>Max Price: {maxPrice || ""}</h4>
                        <input
                            type="range"
                            min={100}
                            max={200000}
                            value={maxPrice}
                            onChange={e => setMaxPrice(Number(e.target.value))}
                            className="w-full"
                        />
                    </div>
                    {/* Category */}
                    <div className="inputStyle">
                        <h4>Category</h4>
                        <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="border p-2 rounded-lg">
                            <option value="">ALL</option>
                        </select>
                    </div>
                </aside>
            )}

            {/* Sidebar for larger screens */}
            <aside className="hidden md:flex w-[20%] h-full p-8 shadow-gray-500/50 flex-col gap-4 sm:gap-6">
                <h2 className="text-lg sm:text-xl font-semibold text-center">Filters</h2>
                {/* Sort */}
                <div className="inputStyle">
                    <h4>Sort</h4>
                    <select value={sort} onChange={e => setSort(e.target.value)} className="border p-2 rounded-lg">
                        <option value="">None</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="dsc">Price (High to Low)</option>
                    </select>
                </div>
                {/* Max Price */}
                <div className="inputStyle">
                    <h4>Max Price: {maxPrice || ""}</h4>
                    <input
                        type="range"
                        min={100}
                        max={200000}
                        value={maxPrice}
                        onChange={e => setMaxPrice(Number(e.target.value))}
                        className="w-full"
                    />
                </div>
                {/* Category */}
                <div className="inputStyle">
                    <h4>Category</h4>
                    <select value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} className="border p-2 rounded-lg">
                        <option value="">ALL</option>
                        {Array.isArray(allCategory) && allCategory.map((cat, index) => (
                            <option key={index} value={cat}>{cat.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
            </aside>

            {/* Main Content */}
            <main ref={divRef} className="w-full md:w-[80%] p-8 border-l-2 border-black overflow-y-scroll">
                {/* Search Bar (Only for Desktop) */}
                <div className="hidden md:flex w-full px-4 mb-4">
                    <input
                        className="border p-2 rounded-lg w-full"
                        type="text"
                        placeholder="Search by name..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                {/* Products Grid */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-6 py-6">
                    {searchProducts?.map((product, index) => (
                        <ProductCard key={index} product={product} latest />
                    ))}
                </div>

                {/* Pagination */}
                <article className="flex justify-center items-center gap-2 sm:gap-4">
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
                </article>
            </main>
        </div>
    );
};


export default search;

export const getServerSideProps: GetServerSideProps = async (context) => {

    let products = [];

    const { category, search, price, sort } = context.query;
    
    let url = `/product/all?price=${price}`;
    if(search) url += `&search=${search}`; 
    if(category) url += `&category=${category}`; 
    if(sort) url += `&sort=${sort}`; 
    
    try {
        const { data } = await Axios.get(url)
        
        if (data)
            products = data;
    } catch (error) {
        console.log("Error - ", error);
    }
    
    const encryptData = encryptedData(products);

    return {
        props: { data: encryptData }
    }
}