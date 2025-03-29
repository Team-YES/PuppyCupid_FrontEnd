import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const isLoginPage = router.pathname === "/MainPageManager/Login";

  return (
    <>
      {!isLoginPage && <Header />}
      <Component {...pageProps} />
      {!isLoginPage && <Footer />}
    </>
  );
}
