import Axios from '@/config/axios';
import { encryptedData } from '@/utilities/features';
import React from 'react'
import ProductDetails from '@/components/ProductDetails';


const productId = ({ data }: { data: string }) => {
    return (
        <ProductDetails data={data} />
    )
}

export default productId;

export const getServerSideProps = async (context: any) => {

    const { productId } = context.query;

    let product;
    try {

        const { data } = await Axios.get(`/product/${productId}`)

        if (data) {
            product = encryptedData(data.product)
        }
    } catch (error) {
        console.log(error);
    }

    return {
        props: { data: product },
    }
}