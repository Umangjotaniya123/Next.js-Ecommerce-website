import Axios from '@/config/axios';
import { encryptedData } from '@/utilities/features';
import ProductDetails from '@/components/ProductDetails';
import React from 'react'
import AdminSidebar from '@/components/AdminSidebar';

const details = ({ data }: { data: string }) => {
  return (
    <main className="w-full flex justify-center">
      <ProductDetails data={data} />
    </main>
  )
}

export default details;

export const getServerSideProps = async (context: any) => {

  const { id } = context.query;

  let product;
  try {

    const { data } = await Axios.get(`/product/${id}`)

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