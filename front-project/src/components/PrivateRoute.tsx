// src/components/PrivateRoute.tsx
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [hasRedirected, setHasRedirected] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      alert("로그인이 필요합니다.");
      setHasRedirected(true);
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return <div>로딩 중...</div>; // 로그인되지 않았을 경우 아무것도 렌더링하지 않음
  }

  return <>{children}</>; // 로그인된 경우 자식 컴포넌트 렌더링
};

export default PrivateRoute;
