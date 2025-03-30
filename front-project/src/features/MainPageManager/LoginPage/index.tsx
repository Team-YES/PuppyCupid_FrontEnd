import React, { useState } from "react";
import { LoginPageStyled } from "./styled";

const LoginPage = () => {
  return (
    <LoginPageStyled>
      {/* 하트(임시) */}
      <svg width="30" height="30" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
        <path
          className="heartbeat"
          d="M20 35
        C 11 28, 6 20, 10 12
        C 14 6, 19 10, 20 16
        C 22 10, 28 8, 31 11
        C 36 21, 28 28, 20 35 Z"
          stroke="#444"
          stroke-width="2.5"
        />
      </svg>

      {/* 헤더_로고 */}
      <div>
        <a href="/" className="login_logo">
          <h1 className="Loginpage_logo_container">
            <img src="./puppy_cupid_logo.png" alt="logo" />
          </h1>
        </a>
      </div>

      {/* 메인 */}
      <div className="Loginpage_main_container">
        <div>
          <div className="login_wrap">
            <div className="Loginpage_naver_login">
              <button>네이버 아이디로 로그인</button>
            </div>
            <div className="Loginpage_kakao_login">
              <button>카카오 아이디로 로그인</button>
            </div>
            <div className="Loginpage_google_login">
              <button>구글 아이디로 로그인</button>
            </div>
          </div>
        </div>
      </div>
      <ul className="Loginpage_find_id">
        <li>
          <a href="/findid">아이디 찾기</a>
        </li>
      </ul>
    </LoginPageStyled>
  );
};

export default LoginPage;
