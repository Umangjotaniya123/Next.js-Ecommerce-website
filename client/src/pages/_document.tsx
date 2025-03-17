import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {

  return (
    <Html lang="en">
      <Head />
      <body className="antialiased bg-orange-50 pt-[5.5rem] dark:bg-gray-900/65 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
