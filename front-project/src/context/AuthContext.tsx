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

import axiosInstance from "@/lib/axios";

type UserInfo = {
  id: number;
  email: string;
  role: string;
  phoneNumber: string | null;
  nickName: string | null;
  gender: string | null;
  isPhoneVerified: boolean;
  power_expired_at: string | null;
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
      const tempToken = Cookies.get("temp_access_token");
      if (!token && tempToken) {
        try {
          const tempResponse = await axios.post(
            "/auth/check-temp-token",
            {},
            {
              headers: {
                Authorization: `Bearer ${tempToken}`,
              },
            }
          );

          if (tempResponse.data.isLoggedIn) {
            const userData: UserInfo = {
              id: tempResponse.data.user.id,
              email: tempResponse.data.user.email,
              role: tempResponse.data.user.role ?? "user",
              phoneNumber:
                tempResponse.data.user.phoneNumber ??
                tempResponse.data.user.phone ??
                null,
              nickName: tempResponse.data.user.nickName ?? null,
              gender: tempResponse.data.user.gender ?? null,
              isPhoneVerified: tempResponse.data.user.isPhoneVerified ?? false,
              power_expired_at: tempResponse.data.user.power_expired_at ?? null,
            };

            setUser(userData);
            dispatch(setReduxUser(userData));
            setIsLoggedIn(false); // 전화번호 인증 전 단계니까 false로 유지
            if (router.pathname !== "/phone") {
              router.push("/phone");
            }
            return;
          }
        } catch (err) {
          console.error("임시 토큰 유효성 실패", err);
        }

        setIsLoggedIn(false);
        setUser(null);
        dispatch(logoutUser());
        return;
      }
      const response = await axiosInstance.get("/auth/check");

      if (response.data.isLoggedIn) {
        setIsLoggedIn(true);

        const userData: UserInfo = {
          id: response.data.user.id,
          email: response.data.user.email,
          role: response.data.user.role ?? "user",
          phoneNumber:
            response.data.user.phoneNumber ?? response.data.user.phone ?? null, // 서버에선 `phone`, Redux에선 `phoneNumber`
          nickName: response.data.user.nickName ?? null,
          gender: response.data.user.gender ?? null,
          isPhoneVerified: response.data.user.isPhoneVerified ?? false,
          power_expired_at: response.data.user.power_expired_at ?? null,
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
      // await axiosInstance.get("/auth/logout");
      Cookies.remove("access_token"); // 쿠키에서 토큰 삭제
      Cookies.remove("refresh_token"); // 쿠키에서 토큰 삭제

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
