import AdminSidebar from '@/components/AdminSidebar';
import React from 'react'
import Axios from '@/config/axios';
import { encryptedData } from '@/utilities/features';
import AddProductDetails from '@/components/AddProductDetails';

const newProduct = () => {

    return (
        <div className="admin-container h-[calc(100vh-6rem)]">
            <AdminSidebar />
            <main className="product-management w-full  max-w-[calc(100% - 360px)] overflow-y-scroll">
                <AddProductDetails />
            </main>
        </div>
    );
}

export default newProduct;