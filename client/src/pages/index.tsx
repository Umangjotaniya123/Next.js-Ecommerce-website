import Home from '@/components/Home'
import Axios from '@/config/axios';
import { Product } from '@/types/types';
import { decryptedData, encryptedData } from '@/utilities/features';
import { GetServerSideProps } from 'next';

const index = ({ data: products }: { data: Product[] }) => {
  return (
    <Home data={products}/>
  );
};

export default index;

export const getServerSideProps: GetServerSideProps = async() => {

  let datas = null

  try {
      const { data } = await Axios.get('/product/latest');

      if(data) datas = data.products;

      
    } catch (error) {
      
    }
    const encryptData = encryptedData(datas);
    console.log(encryptData);

    const decryptData = decryptedData(encryptData);
    console.log(decryptData);
    
  return {
      props: {
          data: datas
      }
  }
}