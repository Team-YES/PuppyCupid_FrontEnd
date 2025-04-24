// src/components/PrivateRoute.tsx
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";
import Cookies from "js-cookie";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn, checkLogin } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true); // 3초 동안 로딩 상태

  //1. 수정 ver 1
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setCheckingAuth(false);
  //     if (!isLoggedIn) {
  //       alert("로그인이 필요합니다.");
  //       router.push("/login");
  //     }
  //   }, 500);

  //   return () => clearTimeout(timer);
  // }, [isLoggedIn, router]);

  // if (!isLoggedIn) {
  //   return <Loading />; // 로딩 중일때 로딩 중 페이지 띄우기
  // }

  // return <>{children}</>; // 로그인된 경우 자식 컴포넌트 렌더링
  //2. 수정 ver 2
  //   useEffect(() => {
  //     // checkLogin 함수가 로그인 상태를 확인하도록 호출
  //     const checkUserAuth = async () => {
  //       await checkLogin(); // 인증 상태 확인
  //       setCheckingAuth(false); // 인증 상태 확인 완료
  //     };

  //     checkUserAuth();
  //   }, [checkLogin]);

  //   if (checkingAuth) {
  //     return <Loading />; // 인증 상태 확인 중에는 로딩 화면 표시
  //   }

  //   if (!isLoggedIn) {
  //     alert("로그인이 필요합니다.");
  //     router.push("/login");
  //     return null; // 로그인되지 않은 경우 렌더링 중지
  //   }

  //   return <>{children}</>; // 로그인된 경우 자식 컴포넌트 렌더링
  // };
  useEffect(() => {
    // 쿠키에서 직접 access_token을 확인
    const accessToken = Cookies.get("access_token");
    console.log(accessToken, "accesstoken 시간 차가 있나?");
    // access_token이 있으면 로그인 상태로 간주
    if (accessToken) {
      setCheckingAuth(false); // 로딩 종료
    } else {
      setCheckingAuth(false); // 로딩 종료 후 로그인되지 않은 상태로 처리
      alert("로그인이 필요합니다.");
      router.push("/login");
    }
  }, [router]);

  if (checkingAuth) {
    return <Loading />; // 인증 상태 확인 중에는 로딩 화면 표시
  }

  return <>{children}</>; // 로그인된 경우 자식 컴포넌트 렌더링
};

export default PrivateRoute;
