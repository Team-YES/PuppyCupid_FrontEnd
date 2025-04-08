// src/components/PowerUserRoute.tsx
import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

interface PowerUserRouteProps {
  children: ReactNode;
}

const PowerUserRoute = ({ children }: PowerUserRouteProps) => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingAuth(false);
      if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        router.push("/login");
      } else if (
        user?.role !== "power_month" &&
        user?.role !== "power_year" &&
        user?.role !== "admin"
      ) {
        alert("이 페이지는 파워 유저만 접근할 수 있습니다.");
        router.push("/");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isLoggedIn, user, router]);

  if (checkingAuth) return <Loading />;
  return <>{children}</>;
};

export default PowerUserRoute;
