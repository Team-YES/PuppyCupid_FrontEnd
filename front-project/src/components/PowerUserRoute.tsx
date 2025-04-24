// src/components/PowerUserRoute.tsx
import React, { ReactNode, useEffect, useState } from "react";
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

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCheckingAuth(false);
  //     if (!isLoggedIn) {
  //       alert("로그인이 필요합니다.");
  //       router.push("/login");
  //     } else if (
  //       user?.role !== "power_month" &&
  //       user?.role !== "power_year" &&
  //       user?.role !== "admin"
  //     ) {
  //       alert("이 페이지는 파워 유저만 접근할 수 있습니다.");
  //       router.push("/");
  //     }
  //   }, 500);
  //   return () => clearTimeout(timer);
  // }, [isLoggedIn, user, router]);

  // if (checkingAuth) return <Loading />;
  // ver2
  //   useEffect(() => {
  //     const checkAuthStatus = async () => {
  //       await checkLogin(); // 로그인 상태를 먼저 확인
  //       setCheckingAuth(false); // 상태 확인 후 로딩 종료

  //       if (!isLoggedIn) {
  //         alert("로그인이 필요합니다.");
  //         router.push("/login");
  //       } else if (
  //         user?.role !== "power_month" &&
  //         user?.role !== "power_year" &&
  //         user?.role !== "admin"
  //       ) {
  //         alert("이 페이지는 파워 유저만 접근할 수 있습니다.");
  //         router.push("/");
  //       }
  //     };

  //     checkAuthStatus();
  //   }, [isLoggedIn, user, router]);

  //   if (checkingAuth) return <Loading />;

  //   return <>{children}</>;
  // };
  const PowerUserRoute = ({ children }: PowerUserRouteProps) => {
    const { checkLogin, user } = useAuth();
    const router = useRouter();
    const [checkingAuth, setCheckingAuth] = useState(true);

    // 1. 먼저 access_token 쿠키 확인
    useEffect(() => {
      const checkAuth = async () => {
        const token = Cookies.get("access_token");

        if (!token) {
          alert("로그인이 필요합니다.");
          router.push("/login");
          return;
        }

        await checkLogin(); // 토큰이 있으므로 사용자 상태 불러오기
        setCheckingAuth(false); // 확인 완료 후 로딩 종료
      };

      checkAuth();
    }, [checkLogin, router]);

    // 2. 사용자 role 체크
    useEffect(() => {
      if (!checkingAuth) {
        if (
          user?.role !== "power_month" &&
          user?.role !== "power_year" &&
          user?.role !== "admin"
        ) {
          alert("이 페이지는 파워 유저만 접근할 수 있습니다.");
          router.push("/");
        }
      }
    }, [checkingAuth, user, router]);

    if (checkingAuth) return <Loading />;
    return <>{children}</>;
  };
};

export default PowerUserRoute;
