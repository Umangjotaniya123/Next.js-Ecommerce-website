import TableHook from '@/components/TableHook';
import Axios from '@/config/axios';
import { useAuth } from '@/context/AuthContext';
import { Categories } from '@/types/types';
import { decryptedData, encryptedData, responseToast } from '@/utilities/features';
import { Tooltip } from '@heroui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BiEditAlt } from 'react-icons/bi';
import { FaPlus, FaTrash } from 'react-icons/fa';

const ManageCategory = ({ data }: { data: string }) => {

    const router = useRouter();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [editCategory, setEditCategory] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [allCategories, setAllCategories] = useState<Categories[] | []>([]);

    useEffect(() => {
        if (data)
            setAllCategories(decryptedData(data));
    }, [data])

    const columns = [
        {
            name: 'Name',
            uid: 'name',
        },
        {
            name: 'Description',
            uid: 'description',
        },
        {
            name: 'Action',
            uid: 'action',
        },
    ];

    const categories = allCategories.length ? allCategories.map(({ _id, name, description }) => {
        return {
            _id,
            name: (
                <div className="flex items-center gap-2 mx-20">
                    <span className="break-all text-start font-medium ">{name}</span>
                </div>
            ),
            description: (
                <article className=" text-start px-2 py-1">
                    <p className="break-all text-sm text-gray-700 dark:text-gray-300">
                        {description}
                    </p>
                </article>
            ),
            action: (
                <div className="flex gap-8 items-center justify-center mx-10">

                    <Tooltip color="foreground" content='Edit Category'>
                        <span
                            className="text-xl cursor-pointer active:opacity-50"
                            onClick={() => {
                                setName(name);
                                setDescription(description);
                                setIsOpen(true);
                                setEditCategory(_id);
                            }}
                        >
                            <BiEditAlt />
                        </span>
                    </Tooltip>

                    <Tooltip color="danger" content='Delete Category'>
                        <span className="text-lg text-danger-500 cursor-pointer active:opacity-50" onClick={() => handleDelete(_id)}>
                            <FaTrash />
                        </span>
                    </Tooltip>

                </div>
            ),
        }
    }) : [];

    const handleSave = async () => {
        if (!name) return toast.error('Enter the name of the category');

        if (editCategory) {

            try {
                const res = await Axios.put(`/category/${editCategory}?id=${user?._id}`, {
                    name, description
                })

                responseToast(res, router, router.pathname);
                if (res.data) {
                    setIsOpen(false);
                    setName('');
                    setDescription('');
                }

            } catch (error: any) {
                responseToast(error.response);
            }

        } else {
            try {
                const res = await Axios.post(`/category/new?id=${user?._id}`, {
                    name, description
                })

                responseToast(res, router, router.pathname);
                if (res.data) {
                    setIsOpen(false);
                    setName('');
                    setDescription('');
                }

            } catch (error: any) {
                responseToast(error.response);
            }
        }



    }

    const handleDelete = async (id: string) => {
        if (!id) return;

        try {
            const res = await Axios.delete(`/category/${id}?id=${user?._id}`);

            responseToast(res, router, router.pathname);
        } catch (error: any) {
            responseToast(error.response);
        }
    }

    return (
        <main className={`w-full flex flex-col items-center relative`}>
            <div className='w-[80%] flex justify-between items-center m-4'>
                <h1 className="heading text-2xl font-semibold">Manage Categories</h1>
                <button
                    className="py-2 px-3 rounded-xl bg-gray-700 text-white flex justify-center items-center gap-2 font-semibold uppercase"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    Add New<FaPlus />
                </button>
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-gray-100 bg-opacity-40 backdrop-brightness-50 dark:bg-gray-950/50 dark:bg-opacity-60 dark:backdrop-brightness-90 z-10"></div>
            )}

            {/* Popup Content */}
            {isOpen && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                      w-[25%] bg-orange-100 dark:bg-gray-800 p-6 rounded-lg shadow-lg z-20 flex flex-col gap-8">
                    <h2 className="w-full text-center text-xl heading font-bold">Category</h2>

                    <div className='w-full px-3 flex flex-col gap-6'>
                        <div className="inputStyle w-full">
                            <label>Name</label>
                            <input
                                type="text"
                                placeholder="Write category name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="inputStyle w-full">
                            <label>Description</label>
                            <input
                                type="text"
                                placeholder="Write category description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='flex flex-wrap'
                            />
                        </div>
                    </div>

                    <div className='w-full px-3 flex justify-between gap-6 font-semibold'>
                        <button
                            onClick={() => {
                                setIsOpen(false);
                                setName('');
                                setDescription('');
                            }}
                            className="w-full p-3 bg-gray-500 text-white rounded-lg"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleSave}
                            className="w-full bg-indigo-900 dark:bg-indigo-700 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )
            }
            <div className="m-8 w-[80%]">
                {categories.length ?
                    <TableHook columns={columns} items={categories} /> :
                    <h1>No any Categories Available</h1>}
            </div>
        </main >
    );
};

export default ManageCategory;

export const getServerSideProps: GetServerSideProps = async () => {

    let categories = null;

    try {
        const { data } = await Axios.get('/category/all');

        if (data)
            categories = encryptedData(data.categories);

    } catch (error) {
        console.log(error);
    }

    return {
        props: { data: categories }
    }
}