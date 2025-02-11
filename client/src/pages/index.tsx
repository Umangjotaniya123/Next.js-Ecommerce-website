import Home from '@/components/Home'
import Axios from '@/config/axios';
import { Product } from '@/types/types';
import { decryptedData, encryptedData } from '@/utilities/features';
import { GetServerSideProps } from 'next';

const index = ({ data }: { data: string }) => {
  return (
    <Home data={data}/>
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
    
  return {
      props: {
          data: encryptData,
      }
  }
}