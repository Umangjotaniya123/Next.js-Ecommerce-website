import Axios from '@/config/axios';
import { decryptedData, encryptedData } from '@/utilities/features';
import { GetServerSideProps } from 'next';
import React from 'react'

const watchList = ({ data }: { data: string }) => {
    console.log(decryptedData(data));
    
  return (
    <div>watchList</div>
  )
}

export default watchList;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token } = req.cookies;
    let products = null;

    try {
        const { data } = await Axios.get(`/watchList/get?token=${token}`);

        if(data) 
            products = encryptedData(data.watchList);
    } catch (error) {
        console.log(error);
    }

    return {
        props: { data: products }
    }
}