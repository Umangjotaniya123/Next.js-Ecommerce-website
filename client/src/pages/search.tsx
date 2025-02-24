import { SlideProductCard } from '@/components/ProductCard';
import Axios from '@/config/axios';
import { Product } from '@/types/types';
import { decryptedData, encryptedData } from '@/utilities/features';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react'
import { FaFilter } from 'react-icons/fa6';

const searchProducts = [
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

const search = ({ data }: { data: string }) => {

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [maxPrice, setMaxPrice] = useState(200000);
    const [category, setCategory] = useState("");
    const [page, setPage] = useState(1);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [phoneActive, setPhoneActive] = useState<boolean>(false);
    const [searchProducts, setSearchProducts] = useState<Product[] | []>([])

    useEffect(() => {
        if(data)
            setSearchProducts(decryptedData(data));
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

    const isPrevPage = page > 1;
    const isNextPage = page < page;

    const addToCartHandler = () => {

    };

    return (
        <div className="w-full h-[100vh] border flex gap-2">
            {phoneActive && (
                <button className='fixed' id="hamburger" onClick={() => setShowModal(!showModal)}>
                    <FaFilter />
                </button>
            )}
            {showModal && <aside className={`${phoneActive ? 'fixed transition-all duration-300 w-[80%] h-96 top-12 left-8 mr-4 ring-2 ring-gray-600' : ''} w-[20%] h-full border flex flex-col justify-start items-stretch gap-2 sm:gap-4 sm:min-w-80 px-4 py-4 sm:p-8 shadow-gray-500/50 rounded-lg`}>
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
            <main className='w-[80%] h-full p-4 border border-red-500'>
                {/* <h1 className='heading text-xl sm:text-2xl mx-4'>Products</h1> */}
                <input
                    className='border mx-8 p-1 rounded-lg'
                    type="text"
                    placeholder="Search by name..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <div className="w-full grid grid-cols-4 gap-4 py-4 overflow-y-scroll"
                >
                    {//loadingSearchProducts ? <Skeleton length={10} /> :
                        searchProducts?.map((product, index) => (
                            
                            <SlideProductCard key={index} product={product} latest />
                        ))
                    }
                </div>

                {/* <article className='flex felx-row justify-center items-center gap-2 sm:gap-4'>
                    <button className='flex felx-row justify-center items-center rounded-md cursor-pointer px-2 py-1 sm:p-2 bg-teal-400 text-sm '
                        disabled={!isPrevPage}
                        onClick={() => setPage((prev) => prev - 1)}
                    >Prev</button>
                    <span className='font-semibold'>{page}</span>
                    <button className='flex felx-row justify-center items-center rounded-md cursor-pointer px-2 py-1 sm:p-2 bg-teal-400 text-sm '
                        disabled={!isNextPage}
                        onClick={() => setPage((prev) => prev + 1)}
                    >Next</button>
                </article> */}
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
            searchProducts = encryptedData(data.products);
    } catch (error) {
        
    }

    return {
        props: { data: searchProducts }
    }
}