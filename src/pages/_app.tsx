import "@/styles/globals.scss";
import "@/styles/Index.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "@fontsource/poppins";
import type { AppProps } from "next/app";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { Provider } from "react-redux";
import store from "../store";
import { apiUsers } from "@/services/apiSlice";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/") {
      router.push("/Login");
    }
  }, []);

  return (
    <ApiProvider api={apiUsers}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ApiProvider>
  );
}
