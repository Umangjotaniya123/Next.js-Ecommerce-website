import AddProductDetails from '@/components/AddProductDetails';
import AdminSidebar from '@/components/AdminSidebar';
import Axios from '@/config/axios';
import { encryptedData } from '@/utilities/features';


type Props = {
  data: string
}

const productManage = ({ data }: Props) => {

  return (
    <main className="w-full overflow-y-scroll px-4">
      <AddProductDetails data={data} />
    </main>
  )
};
export default productManage;

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