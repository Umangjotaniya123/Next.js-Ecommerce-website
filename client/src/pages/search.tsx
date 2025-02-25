import { ProductCard } from '@/components/ProductCard';
import Axios from '@/config/axios';
import { Product } from '@/types/types';
import { decryptedData, encryptedData } from '@/utilities/features';
import { GetServerSideProps } from 'next';
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { FaFilter } from 'react-icons/fa6';

const search = ({ data }: { data: string }) => {

    const divRef = useRef<HTMLElement>(null);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(200000);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(0);
    const [maxPage, setMaxPage] = useState(1);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [phoneActive, setPhoneActive] = useState<boolean>(false);
    const [searchAllProducts, setSearchAllProducts] = useState<Product[] | []>([])
    const [searchProducts, setSearchProducts] = useState<Product[] | []>([])


    useEffect(() => {
        if(data){
            const products = decryptedData(data);
            setSearchAllProducts(products.products);
            setPage(1);
            setMaxPage(products.totalPage);
        }
    }, [data])

    useEffect(() => {
        const resizeHandler = () => {
            setPhoneActive(window.innerWidth < 630);
        };

        resizeHandler();

        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    useEffect(() => {
        if(!phoneActive)
            setShowModal(true);
        else
            setShowModal(false);
    }, [phoneActive])

    useEffect(() => {
        const si = 20 * page - 20;
        const products = searchAllProducts.slice(si, si + 20);
        setSearchProducts(products);
        divRef.current?.scroll(0, 0);
    }, [page])

    return (
        <div className="w-full h-[calc(100vh-5rem)] pt-8 flex gap-2">
            {phoneActive && (
                <button className='fixed' id="hamburger" onClick={() => setShowModal(!showModal)}>
                    <FaFilter />
                </button>
            )}
            {showModal && <aside className={`${phoneActive ? 'fixed transition-all duration-300 w-[80%] h-96 top-12 left-8 mr-4 ring-2 ring-gray-600' : ''} w-[20%] h-full flex flex-col justify-start items-stretch gap-2 sm:gap-4 sm:min-w-80 px-4 py-4 sm:p-8 shadow-gray-500/50 rounded-lg`}>
                <h2 className='heading text-lg sm:text-xl flex justify-center mb-2'>Filters</h2>
                <div className='inputStyle'>
                    <h4>Sort</h4>
                    <select value={sort} onChange={e => setSort(e.target.value)}>
                        <option value="">None</option>
                        <option value="asc">Price (Low to High)</option>
                        <option value="dsc">Price (High to Low)</option>
                    </select>
                </div>
                <div className='inputStyle'>
                    <h4>Max Price: {maxPrice || ""}</h4>
                    <input
                        type="range"
                        min={100}
                        max={200000}
                        value={maxPrice}
                        onChange={e => setMaxPrice(Number(e.target.value))}
                    />
                </div>
                <div className='inputStyle '>
                    <h4>Category</h4>
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="">ALL</option>
                        {/* {!loadingCategories &&
                            categoriesResponse?.categories.map(i => (
                                <option key={i} value={i}>{i.toUpperCase()}</option>
                            ))
                        } */}
                    </select>
                </div>  
            </aside>}
            <main ref={divRef} className='w-[80%] p-8 border-l-2 border-black overflow-y-scroll'>
                {/* <h1 className='heading text-xl sm:text-2xl mx-4'>Products</h1> */}
                <input
                    className='border mx-8  p-1 rounded-lg'
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="w-full grid grid-cols-4 gap-8 py-8"
                >
                    {//loadingSearchProducts ? <Skeleton length={10} /> :
                        searchProducts?.map((product, index) => (
                            <ProductCard key={index} product={product} latest />
                        ))
                    }
                </div>

                <article className='flex felx-row justify-center items-center gap-2 sm:gap-4'>
                    <button className={`font-semibold rounded-3xl cursor-pointer px-8 py-2 bg-orange-900 text-white text-sm ${page == 1 ? 'disabled:cursor-not-allowed opacity-50' : ''}`}
                        disabled={page == 1}
                        onClick={() => setPage((prev) => prev - 1)}
                    >Prev</button>
                    <span className='font-semibold'>{page}</span>
                    <button className={`font-semibold rounded-3xl cursor-pointer px-8 py-2 bg-orange-900 text-white text-sm ${page == maxPage ? 'disabled:cursor-not-allowed opacity-50' : ''}`}
                        disabled={page == maxPage}
                        onClick={() => setPage((prev) => prev + 1)}
                    >Next</button>
                </article>
            </main>
        </div>
    )
}

export default search;

export const getServerSideProps: GetServerSideProps = async() => {

    let searchProducts = null;

    try {
        const { data } = await Axios.get('/product/all');

        if(data) 
            searchProducts = encryptedData(data);
    } catch (error) {
        console.log("Error - ", error);
    }
    return {
        props: { data: searchProducts }
    }
}