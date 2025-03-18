import AdminSidebar from '@/components/AdminSidebar';
import React from 'react'
import Axios from '@/config/axios';
import { encryptedData } from '@/utilities/features';
import AddProductDetails from '@/components/AddProductDetails';

const newProduct = () => {

    return (
        <main className="w-full overflow-y-scroll px-4">
            <AddProductDetails />
        </main>
    );
}

export default newProduct;