import { useDispatch } from "react-redux";
import { setReduxUser, logoutUser } from "../reducers/userSlice";

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
import { AppDispatch } from "../store/store";

type UserInfo = {
  id: number;
  email: string;
  role: string;
  phoneNumber: string | null;
  nickName: string | null;
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
  const dispatch = useDispatch<AppDispatch>();
  // 서버에서 로그인 상태를 확인하는 함수
  const checkLogin = async () => {
    try {
      const token = Cookies.get("access_token");
      const tempToken = Cookies.get("temp_access_token"); // 쿠키에서 토큰을 가져옵니다.
      if (!token && tempToken) {
        router.push("/phone");
        setIsLoggedIn(false);
        setUser(null);
        dispatch(logoutUser()); // 추가중
        return;
      }

      // 서버에 로그인 상태 확인 요청
      const response = await axios.get("http://localhost:5000/auth/check", {
        withCredentials: true, // 쿠키를 포함시켜서 요청
      });

      if (response.data.isLoggedIn) {
        setIsLoggedIn(true);
        console.log(response.data.user, "response.data.user??");
        // setUser(response.data.user);
        // console.log(response.data.user, "response.data.user???");
        // dispatch(setUser(response.data.user as UserInfo));

        const userData: UserInfo = {
          id: response.data.user.id,
          email: response.data.user.email,
          role: response.data.user.role ?? "user",
          phoneNumber:
            response.data.user.phoneNumber ?? response.data.user.phone ?? null, // 서버에선 `phone`, Redux에선 `phoneNumber`
          nickName: response.data.user.nickName ?? null,
          gender: response.data.user.gender ?? null,
          isPhoneVerified: response.data.user.isPhoneVerified ?? false,
        };
        setUser(userData);
        dispatch(setReduxUser(userData));
        if (
          !userData.phoneNumber &&
          userData.phoneNumber !== undefined &&
          router.pathname !== "/phone"
        ) {
          router.push("/phone");
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
        dispatch(logoutUser());
      }
    } catch (error) {
      setIsLoggedIn(false);
      setUser(null);
      dispatch(logoutUser());
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
      setUser(null); // 추가중
      dispatch(logoutUser()); // 추가중
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
