import React, { useEffect, useState } from "react";
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
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 632);
    };
    check(); // 초기 체크
    window.addEventListener("resize", check);
    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleSocialLogin = async (provider: "google" | "kakao" | "naver") => {
    try {
      // 소셜 로그인 API 요청
      const response = await fetch(`http://localhost:5000/auth/${provider}`, {
        method: "GET",
        credentials: "include", // 쿠키 자동 포함
      });

      const data = await response.json();

      if (data.ok) {
        // 로그인 성공 시 alert 띄우고 메인 페이지로 이동
        alert("로그인 성공!");
        window.location.href = "/"; // 메인 페이지로 이동
      } else {
        // 로그인 실패 시 alert 띄우기
        alert("로그인 실패: " + data.error);
      }
    } catch (error) {
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <LoginPageStyled>
      {/* 헤더_로고 */}
      <div>
        <a href="/" className="Loginpage_logo">
          <h1 className="Loginpage_logo_container">
            <img
              src={
                isMobile ? "./people_walking_dog.jpg" : "./logopractice2.png"
              }
              alt="logo"
            />
          </h1>
        </a>
      </div>

      <div className="Loginpage_content">
        <h2>
          반려견 산책메이트를
          <br />
          만나보세요!
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
