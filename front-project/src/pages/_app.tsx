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
import "antd/dist/reset.css";
import { AuthProvider } from "../context/AuthContext";

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
  // 헤더 있으면 메인 패딩 주기
  const contentStyle = {
    paddingTop: !isLoginPage && !isAdminPage ? "130px" : "0px",
  };
  const isPaymentPage = router.pathname === "/payment";
  const isPaymentSuccessPage = router.pathname === "/payment/success";
  const isPaymentFailPage = router.pathname === "/payment/fail";
  return (
    <Provider store={store}>
      <div className="app_wrapper">
        <ThemeProvider theme={theme}>
          <AuthProvider>
            {!isLoginPage && !isAdminPage && (
              <Header isScrolled={isScrolled} setIsScrolled={setIsScrolled} />
            )}

            <div className="app_content" style={contentStyle}>
              <Component
                {...pageProps}
                isScrolled={isScrolled}
                setIsScrolled={setIsScrolled}
              />
            </div>
          </AuthProvider>
          <div className="app_footer">
            {!isLoginPage && !isAdminPage && (
              <Footer
                isPaymentPage={isPaymentPage}
                isPaymentSuccessPage={isPaymentSuccessPage}
                isPaymentFailPage={isPaymentFailPage}
              />
            )}
          </div>
        </ThemeProvider>
      </div>
    </Provider>
  );
}
