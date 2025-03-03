import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "@/context/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Footer from "@/components/Footer";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeroUIProvider>
        <Provider store={store}>
          <UserContextProvider>
            <Navbar />
            <Component {...pageProps} />
            <Footer />
            <Toaster position="bottom-center" />
          </UserContextProvider>
        </Provider>
      </HeroUIProvider>
    </>
  );
}