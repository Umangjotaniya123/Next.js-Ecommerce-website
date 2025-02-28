import Header from "@/components/Header";
import Axios from "@/config/axios";
import "@/styles/globals.css";
import App from "next/app";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "@/context/AuthContext";
import { User } from "@/types/types";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Footer from "@/components/Footer";

interface AppOwnProps {
  data: User | null;
}
 
// export async function getServerSideProps() {
//   // let user = null;
//   console.log('Server.........');
  

//   const res = await Axios.get('/user/verify');
//   console.log(res);

//   return {
//     props: {
//       data: res.data.user
//     }
//   }
// }

export default function MyApp({ Component, pageProps, data }: AppProps & AppOwnProps) {
  return (
    <>
      <HeroUIProvider>
        <UserContextProvider>
          <Provider store={store}>
          <Header />
          <Component {...pageProps} />
          <Footer />
          <Toaster position="bottom-center" />
          </Provider>
        </UserContextProvider>
      </HeroUIProvider>
    </>
  );
}

// MyApp.getInitialProps = async (context: AppContext): Promise<AppOwnProps & AppInitialProps> => {

//   const appProps = await App.getInitialProps(context);
//   // console.log("cookies");
//   const cookies = context.ctx.req?.headers?.cookie || '';


//   const res = await Axios.get('/user/verify');

//   console.log('res---------------', res.data);

//   return {
//     ...appProps,
//     data: res.data.user
//   }
// }