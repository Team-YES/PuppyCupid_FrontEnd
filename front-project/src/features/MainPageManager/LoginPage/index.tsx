import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  LoginPageStyled,
  SocialLoginBtn,
  DividerText,
  Line,
  Text,
} from "./styled";

// 소셜로그인 버튼 type
export interface ButtonProps {
  $bgColor: string;
  color?: string;
  $border: string;
  $iconURL: string;
  size?: string;
}

const LoginPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  // PC, 모바일 반응형 이미지
  // useEffect(() => {
  //   const check = () => {
  //     setIsMobile(window.innerWidth <= 632);
  //   };
  //   check(); // 초기 체크
  //   window.addEventListener("resize", check);
  //   // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
  //   return () => window.removeEventListener("resize", check);
  // }, []);

  // const handleSocialLogin = (provider: "google" | "kakao" | "naver") => {
  //   window.location.href = `http://localhost:5000/auth/${provider}`;
  // };
  const handleSocialLogin = (provider: "google" | "kakao" | "naver") => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${apiUrl}/auth/${provider}`;
  };

  return (
    <LoginPageStyled>
      {/* 헤더_로고 */}
      <div>
        <a href="/" className="Loginpage_logo">
          <h1 className="Loginpage_logo_container">
            {/* <img
              src={
                isMobile ? "./people_walking_dog.jpg" : "./logopractice2.png"
              }
              alt="logo"
            /> */}
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
            onClick={() => handleSocialLogin("google")}
          >
            구글로 시작하기
          </SocialLoginBtn>
        </div>
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
