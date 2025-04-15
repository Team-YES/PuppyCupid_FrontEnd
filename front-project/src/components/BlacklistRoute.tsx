import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Loading from "./Loading";

interface BlacklistRouteProps {
  children: ReactNode;
}

const BlacklistRoute = ({ children }: BlacklistRouteProps) => {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCheckingAuth(false);
      if (!isLoggedIn) {
        alert("로그인이 필요합니다.");
        router.push("/login");
      } else if (user?.role === "blacklist") {
        alert("접근이 제한된 사용자입니다.");
        router.push("/");
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [isLoggedIn, user, router]);

  if (checkingAuth) return <Loading />;
  return <>{children}</>;
};

export default BlacklistRoute;
