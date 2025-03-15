import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { UserContextProvider } from "@/context/AuthContext";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import ThemeProvider from "@/context/ThemeContext";

export default function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <>
      <HeroUIProvider>
        <Provider store={store}>
          <UserContextProvider>
            <ThemeProvider>
              <Navbar />
              <Component {...pageProps} />
              {router.pathname.includes('/admin') ? <></> : <Footer />}
              <Toaster position="bottom-center" gutter={4} />
            </ThemeProvider>
          </UserContextProvider>
        </Provider>
      </HeroUIProvider>
    </>
  );
}