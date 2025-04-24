import React, { ReactNode, useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import Cookies from "js-cookie";

interface BlacklistRouteProps {
  children: ReactNode;
}

const BlacklistRoute = ({ children }: BlacklistRouteProps) => {
  const { checkLogin, user } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const hasRedirected = useRef(false);

  //   useEffect(() => {
  //     const checkAuth = async () => {
  //       const token = Cookies.get("access_token");

  //       if (!token) {
  //         alert("로그인이 필요합니다.");
  //         router.push("/login");
  //         return;
  //       }

  //       await checkLogin(); // 쿠키가 있으니 실제 유저 정보 확인
  //       setCheckingAuth(false);
  //     };

  //     checkAuth();
  //   }, [checkLogin, router]);

  //   useEffect(() => {
  //     if (!checkingAuth && user?.role === "blacklist") {
  //       alert("접근이 제한된 사용자입니다.");
  //       router.push("/");
  //     }
  //   }, [checkingAuth, user, router]);

  //   if (checkingAuth) return <Loading />;
  //   return <>{children}</>;
  // };
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

      await checkLogin(); // 토큰이 있다면 사용자 정보 확인
      setCheckingAuth(false);
    };

    checkAuth();
  }, [checkLogin, router]);

  useEffect(() => {
    if (!checkingAuth && user?.role === "blacklist") {
      if (!hasRedirected.current) {
        hasRedirected.current = true;
        alert("접근이 제한된 사용자입니다.");
        router.push("/");
      }
    }
  }, [checkingAuth, user, router]);

  if (checkingAuth) return <Loading />;
  return <>{children}</>;
};

export default BlacklistRoute;
