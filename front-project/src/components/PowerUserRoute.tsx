// src/components/PowerUserRoute.tsx
import React, { ReactNode, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import Cookies from "js-cookie";
interface PowerUserRouteProps {
  children: ReactNode;
}

const PowerUserRoute = ({ children }: PowerUserRouteProps) => {
  const { isLoggedIn, user, checkLogin } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const hasRedirected = useRef(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("access_token");
      if (!token) {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          alert("로그인이 필요합니다.");
          router.push("/login");
        }
        return;
      }

      await checkLogin();
      setCheckingAuth(false);
    };

    checkAuth();
  }, [checkLogin, router]);

  // role 확인
  useEffect(() => {
    if (!checkingAuth && user) {
      if (
        user.role !== "power_month" &&
        user.role !== "power_year" &&
        user.role !== "admin"
      ) {
        if (!hasRedirected.current) {
          hasRedirected.current = true;
          alert("이 페이지는 파워 유저만 접근할 수 있습니다.");
          router.push("/");
        }
      }
    }
  }, [checkingAuth, user, router]);

  if (checkingAuth) return <Loading />;
  return <>{children}</>;
};

export default PowerUserRoute;
