// src/components/PrivateRoute.tsx
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true); // 3초 동안 로딩 상태

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingAuth(false);
      if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        router.push("/login");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <Loading />; // 로딩 중일때 로딩 중 페이지 띄우기
  }

  return <>{children}</>; // 로그인된 경우 자식 컴포넌트 렌더링
};

export default PrivateRoute;
