import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  LoginPageStyled,
  SocialLoginBtn,
  DividerText,
  Line,
  Text,
} from "./styled";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import AdminLogin from "@/components/AdminLogin";
import { useClickOutside } from "@/hooks/useClickOutside";

// 소셜로그인 버튼 type
export interface ButtonProps {
  $bgColor: string;
  color?: string;
  $border: string;
  $iconURL?: string;
  size?: string;
}

const LoginPage = () => {
  const router = useRouter();

  // 창 열고 닫기
  const [showModal, setShowModal] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  const handleSocialLogin = (provider: "google" | "kakao" | "naver") => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  const ready = () => {
    alert("준비중 입니다.");
  };

  // 테스트용 로그인
  const handleTestLogin = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    try {
      const response = await axios.post(
        `${apiUrl}/auth/login`,
        {
          email: "teamYES@teamYes.com", // ← 여기에 임의 이메일
          password: "teamYESsuperUser", // ← 여기에 임의 비밀번호
        },
        {
          withCredentials: true,
        }
      );

      if (response.data.ok) {
        // console.log("로그인 성공", response.data);
        const { access_token, refresh_token } = response.data;

        // 토큰을 쿠키에 저장 (js-cookie 사용)
        Cookies.set("access_token", access_token, {
          expires: 1 / 24, // 1시간
          path: "/",
          sameSite: "Strict",
        });

        Cookies.set("refresh_token", refresh_token, {
          expires: 7,
          path: "/",
          sameSite: "Strict",
        });

        alert("테스트 로그인 성공");
        // console.log("로그인 성공", response.data);
        router.push("/").then(() => {
          setTimeout(() => {
            window.location.reload();
          }, 100);
        });
      } else {
        // console.log("로그인 실패: ", response.data);
        alert("로그인 실패: " + response.data.message);
      }
    } catch (error: any) {
      console.error("테스트 로그인 실패:", error);
      alert("테스트 로그인 중 오류 발생");
    }
  };

  return (
    <LoginPageStyled>
      {/* 헤더_로고 */}
      <div>
        <a href="/" className="Loginpage_logo">
          <h1 className="Loginpage_logo_container">
            <img src="./people_walking_dog.jpg" alt="logo" />
          </h1>
        </a>
      </div>

      <div className="Loginpage_content">
        <h2>
          <span>반려견 산책메이트를 </span>
          <span>만나보세요!</span>
        </h2>
      </div>

      {/* 메인 */}
      <div className="Loginpage_main_container">
        <div>
          <DividerText>
            <Line />
            <Text>
              <span>회원가입 없이</span> 소셜로그인으로 바로 시작!
            </Text>
            <Line />
          </DividerText>

          <SocialLoginBtn
            $bgColor="#03c75a"
            color="#fff"
            $border="none"
            $iconURL="/btnG_naver_login_icon.png"
            size="30px"
            onClick={() => handleSocialLogin("naver")}
          >
            네이버로 시작하기
          </SocialLoginBtn>
          <SocialLoginBtn
            $bgColor="#fee500"
            color="#000000"
            $border="none"
            $iconURL="/icon-kakao.svg"
            size="20px"
            onClick={() => handleSocialLogin("kakao")}
          >
            카카오로 시작하기
          </SocialLoginBtn>
          <SocialLoginBtn
            className="Loginpage_google_login"
            $bgColor="#ffffff"
            color="#000000"
            $border="thin solid #888"
            $iconURL="/google-logo.png"
            size="19px"
            onClick={() => ready()}
          >
            구글로 시작하기
          </SocialLoginBtn>
          <SocialLoginBtn
            $bgColor="#ccb6fd"
            color="#fff"
            $border="thin solid #fff"
            size="19px"
            onClick={() => {
              handleTestLogin();
            }}
          >
            테스트 로그인
          </SocialLoginBtn>
        </div>
      </div>
      <div
        className="LoginPage_admin_login"
        onClick={() => {
          setShowModal(true);
        }}
      >
        관리자 로그인
      </div>

      {/* 관리자 로그인 모달 */}
      {showModal && <AdminLogin onClose={() => setShowModal(false)} />}
    </LoginPageStyled>
  );
};

export default LoginPage;
