import Header from "@/components/Header";
import Axios from "@/config/axios";
import "@/styles/globals.css";
import App from "next/app";
import { HeroUIProvider } from "@heroui/react";
import type { AppContext, AppInitialProps, AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeroUIProvider>
        <Header />
        <Component {...pageProps} />
        <Toaster position="bottom-center" />
      </HeroUIProvider>
    </>
  );
}

MyApp.getInitialProps = async ( context: AppContext): Promise<AppInitialProps> => {

  const appProps = await App.getInitialProps(context);
  console.log("cookies");
  const cookies = context.ctx.req?.headers.cookie || '';
  

  const res = await Axios.get('/user/verify',{
    headers: {
      Cookie: cookies,
    }
  });
  console.log('res---------------', res.data);
  
  return {
    ...appProps,
  }
}