import "@/styles/globals.scss";
import "@/styles/Index.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "@fontsource/poppins";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/Login");
    }
  }, []);
  return <Component {...pageProps} />;
}
