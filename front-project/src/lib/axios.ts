import axios from "axios";
import Router from "next/router";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ 응답 인터셉터 설정
axiosInstance.interceptors.response.use(
  (response) => response, // 정상 응답 그대로 통과
  async (error) => {
    const originalRequest = error.config;

    // access_token 만료로 401 에러가 발생하고, 아직 재시도 안한 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh_token이 쿠키에 있으므로 자동으로 포함됨
        await axios.get("http://localhost:5000/auth/refresh", {
          withCredentials: true,
        });

        // access_token이 재발급되었으니, 원래 요청 재시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 → 로그인 페이지로 이동
        console.error("리프레시 토큰 검증 실패:", refreshError);
        Router.push("/login");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
