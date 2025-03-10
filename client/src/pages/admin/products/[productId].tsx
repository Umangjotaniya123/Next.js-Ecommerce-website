import AddProductDetails from '@/components/AddProductDetails';
import AdminSidebar from '@/components/AdminSidebar';
import Axios from '@/config/axios';
import { encryptedData } from '@/utilities/features';


type Props = {
  data: string
}

const productManage = ({ data }: Props) => {

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management w-full  max-w-[calc(100% - 360px)] overflow-y-scroll">
        <AddProductDetails data={data} />
      </main>
    </div>
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