import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();
  const isLoginPage = router.pathname === "/login";

  if (!isClient) return null;

  return (
    <>
      <ThemeProvider theme={theme}>
        {!isLoginPage && <Header />}
        <Component {...pageProps} />
        {!isLoginPage && <Footer />}
      </ThemeProvider>
    </>
  );
}
