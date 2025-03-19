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
import AdminSidebar from "@/components/AdminSidebar";

export default function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  return (
    <>
      <HeroUIProvider>
        <Provider store={store}>
          <UserContextProvider>
            <ThemeProvider>
              <Navbar />
              {router.pathname.includes('/admin') ?
                <div className="w-full flex justify-center">
                  <div className="w-[93%] max-w-[120rem] flex justify-center gap-4 py-4 min-h-[calc(100vh-5.5rem)]">
                    <AdminSidebar />
                    <Component {...pageProps} />
                  </div>
                </div> :
                <>
                  <Component {...pageProps} />
                  <Footer />
                </>
              }
              <Toaster position="bottom-center" gutter={4} />
            </ThemeProvider>
          </UserContextProvider>
        </Provider>
      </HeroUIProvider>
    </>
  );
}