import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";
import Cookies from "js-cookie";

interface BlacklistRouteProps {
  children: ReactNode;
}

// const BlacklistRoute = ({ children }: BlacklistRouteProps) => {
//   const { isLoggedIn, user } = useAuth();
//   const router = useRouter();
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setCheckingAuth(false);
//       if (!isLoggedIn) {
//         alert("로그인이 필요합니다.");
//         router.push("/login");
//       } else if (user?.role === "blacklist") {
//         alert("접근이 제한된 사용자입니다.");
//         router.push("/");
//       }
//     }, 500);
//     return () => clearTimeout(timer);
//   }, [isLoggedIn, user, router]);

//   if (checkingAuth) return <Loading />;
//   return <>{children}</>;
// };

// ver 2
// const BlacklistRoute = ({ children }: BlacklistRouteProps) => {
//   const { isLoggedIn, user, checkLogin } = useAuth(); // checkLogin 추가
//   const router = useRouter();
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       await checkLogin(); // 로그인 상태를 먼저 확인
//       setCheckingAuth(false); // 상태 확인 후 로딩 종료

//       if (!isLoggedIn) {
//         alert("로그인이 필요합니다.");
//         router.push("/login");
//       } else if (user?.role === "blacklist") {
//         alert("접근이 제한된 사용자입니다.");
//         router.push("/");
//       }
//     };

//     checkAuthStatus();
//   }, [isLoggedIn, user, router]);

//   if (checkingAuth) return <Loading />;
//   return <>{children}</>;
// };
const BlacklistRoute = ({ children }: BlacklistRouteProps) => {
  const { checkLogin, user } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("access_token");

      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      await checkLogin(); // 쿠키가 있으니 실제 유저 정보 확인
      setCheckingAuth(false);
    };

    checkAuth();
  }, [checkLogin, router]);

  useEffect(() => {
    if (!checkingAuth && user?.role === "blacklist") {
      alert("접근이 제한된 사용자입니다.");
      router.push("/");
    }
  }, [checkingAuth, user, router]);

  if (checkingAuth) return <Loading />;
  return <>{children}</>;
};

export default BlacklistRoute;
