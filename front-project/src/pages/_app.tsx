import "@/styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ThemeProvider } from "styled-components";
import theme from "../styles/theme";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  const [isClient, setIsClient] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const router = useRouter();
  const isLoginPage = router.pathname === "/login";
  const isAdminPage = router.pathname === "/admin";

  if (!isClient) return null;

  return (
    <Provider store={store}>
      <div className="app_wrapper">
        <ThemeProvider theme={theme}>
          {!isLoginPage && !isAdminPage && (
            <Header isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
          )}
          <div className="app_content">
            <Component
              {...pageProps}
              isScrolled={isScrolled}
              setIsScrolled={setIsScrolled}
            />
          </div>
          <div className="app_footer">
            {!isLoginPage && !isAdminPage && <Footer />}
          </div>
        </ThemeProvider>
      </div>
    </Provider>
  );
}
