import axios from "axios";
import Router from "next/router";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 환경변수 사용
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${Cookies.get("access_token")}`,
  },
});

// 요청 인터셉터에서 `access_token`을 동적으로 추가
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ✅ 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 통과
  async (error) => {
    const originalRequest = error.config;

    // access_token 만료로 401 에러가 발생하고, 아직 재시도 안한 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/check-temp-token")
    ) {
      originalRequest._retry = true;
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      try {
        const refreshToken = Cookies.get("refresh_token");

        if (!refreshToken) {
          Router.push("/login");
          return Promise.reject(error);
        }

        // refresh_token을 서버로 보내서 access_token을 갱신
        const response = await axios.get(`${baseURL}/auth/refresh`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${refreshToken}`, // refresh_token을 Authorization 헤더에 포함시켜서 요청
          },
        });

        // 새로 발급받은 access_token을 쿠키에 저장
        const newAccessToken = response.data.access_token;
        Cookies.set("access_token", newAccessToken);
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 원래 요청을 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        const tempToken = Cookies.get("temp_access_token");
        if (tempToken) {
          Router.push("/phone");
        } else {
          Router.push("/login");
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
