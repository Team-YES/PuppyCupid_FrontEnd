import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";

type UserInfo = {
  id: number;
  email: string;
  role: string;
  phoneNumber: string | null;
  nickname: string | null;
  gender: string | null;
  isPhoneVerified: boolean;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: UserInfo | null;
  checkLogin: () => void;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();

  // 서버에서 로그인 상태를 확인하는 함수
  const checkLogin = async () => {
    try {
      const token = Cookies.get("access_token");
      const tempToken = Cookies.get("temp_access_token"); // 쿠키에서 토큰을 가져옵니다.
      if (!token && tempToken) {
        router.push("/phone");
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      // 서버에 로그인 상태 확인 요청
      const response = await axios.get("http://localhost:5000/auth/check", {
        withCredentials: true, // 쿠키를 포함시켜서 요청
      });

      if (response.data.isLoggedIn) {
        setIsLoggedIn(true);
        setUser(response.data.user);

        if (!response.data.user.phoneNumber && router.pathname !== "/phone") {
          router.push("/phone");
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      // Cookies.remove("access_token"); // 쿠키에서 토큰 삭제
      // Cookies.remove("eid_refresh_token"); // 쿠키에서 토큰 삭제

      setIsLoggedIn(false);
    } catch (error) {
      console.error("로그아웃 오류:", error);
    }
  };

  // 로그인 상태 확인
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, checkLogin, login: () => {}, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
