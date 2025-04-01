import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";

type AuthContextType = {
  isLoggedIn: boolean;
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

  // 서버에서 로그인 상태를 확인하는 함수
  const checkLogin = async () => {
    try {
      const token = Cookies.get("access_token"); // 쿠키에서 토큰을 가져옵니다.
      if (!token) {
        setIsLoggedIn(false);
        return;
      }

      // 서버에 로그인 상태 확인 요청
      const response = await axios.get("http://localhost:5000/auth/check", {
        withCredentials: true, // 쿠키를 포함시켜서 요청
      });

      setIsLoggedIn(response.data.isLoggedIn);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  // 로그아웃 함수
  const logout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true,
      });
      Cookies.remove("access_token"); // 쿠키에서 토큰 삭제
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
      value={{ isLoggedIn, checkLogin, login: () => {}, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
