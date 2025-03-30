import React, { useState } from "react";
import { LoginPageStyled, SocialLoginBtn, DividerText, Line, Text } from "./styled";

export interface ButtonProps {
  $bgColor: string;
  color?: string;
  $border: string;
  $iconURL: string;
  size?: string;
}

const LoginPage = () => {
  return (
    <LoginPageStyled>
      {/* 헤더_로고 */}
      <div>
        <a href="/" className="Loginpage_login_logo">
          <h1 className="Loginpage_logo_container">
            <img src="./logopractice2.png" alt="logo" />
          </h1>
        </a>
      </div>

      <div className="Loginpage_content">
        <h2>반려견 산책메이트를 만나보세요!</h2>
      </div>

      {/* 메인 */}
      <div className="Loginpage_main_container">
        <div>
          <DividerText>
            <Line />
            <Text>회원가입 없이 소셜로그인으로 바로 시작!</Text>
            <Line />
          </DividerText>

          <SocialLoginBtn
            $bgColor="#03c75a"
            color="#fff"
            $border="none"
            $iconURL="/btnG_naver_login_icon.png"
            size="30px"
          >
            네이버로 시작하기
          </SocialLoginBtn>
          <SocialLoginBtn
            $bgColor="#fee500"
            color="#000000"
            $border="none"
            $iconURL="/icon-kakao.svg"
            size="20px"
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
          >
            구글로 시작하기
          </SocialLoginBtn>
        </div>
      </div>
    </LoginPageStyled>
  );
};

export default LoginPage;
