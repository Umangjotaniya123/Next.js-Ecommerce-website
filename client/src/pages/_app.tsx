import Header from "@/components/Header";
import "@/styles/globals.css";
import { HeroUIProvider } from "@heroui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeroUIProvider>
        <Header />
        <Component {...pageProps} />
      </HeroUIProvider>
    </>
  );
}
