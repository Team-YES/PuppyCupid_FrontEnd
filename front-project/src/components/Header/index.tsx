import React, { useState, useEffect } from "react";
import { HeaderWrapper, Logo, Mid, RightMenu, Nav } from "./styled";
import RightMenubar from "../../assets/RightMenubar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import axios from "axios";
const Header = ({
  isScrolled,
  setIsScrolled,
}: {
  isScrolled: boolean;
  setIsScrolled: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const [isNavOpen, setIsNavOpen] = useState(false);
  // 로그인 여부
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("access_token"); // 쿠키에서 access token 가져오기

    axios
      .get("http://localhost:5000/auth/check", {
        withCredentials: true, // 쿠키 포함
      })
      .then((response) => {
        setIsLoggedIn(response.data.isLoggedIn);
      })
      .catch(() => {
        setIsLoggedIn(false);
      });
  }, []);

  // 스크롤에 따른 헤더 변화
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const openNav = () => {
    setIsNavOpen(true);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = () => {
    router.push("/");
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  // 로그아웃 처리 함수
  const handleLogout = async () => {
    try {
      // 서버 로그아웃 API 호출
      await axios.get("http://localhost:5000/auth/logout", {
        withCredentials: true, // 쿠키를 포함하려면 true
      });

      // 로그인 상태를 false로 설정
      setIsLoggedIn(false);

      // 로그인 페이지로 리다이렉트
      router.push("/");
    } catch (error) {
      console.error("로그아웃 처리 중 오류 발생:", error);
    }
  };

  return (
    <>
      <HeaderWrapper className={isScrolled ? "scrolled" : ""}>
        <div className="header_logo">
          <Logo>
            <div className="header_logoimg_wrap" onClick={handleLogoClick}>
              <img
                src={isScrolled ? "/logo1.png" : "/logopractice4.png"}
                alt="puppycupid logo"
              />
            </div>
          </Logo>
          <Mid>
            <div className="header_mid_wrap" onClick={handleLogoClick}>
              PUPPY
              <svg
                width="20"
                height="20"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="header_heartbeat"
                  d="M20 35
        C 11 28, 6 20, 10 12
        C 14 6, 19 10, 20 16
        C 22 10, 28 8, 31 11
        C 36 21, 28 28, 20 35 Z"
                  stroke="#444"
                  strokeWidth="2.5"
                />
              </svg>
              CUPID
            </div>
          </Mid>
          <RightMenu onClick={openNav} className={isNavOpen ? "open" : ""}>
            <div className="header_right_wrap">
              <span className="header_btn_line1"></span>
              <span className="header_btn_line2"></span>
              <span className="header_btn_line3"></span>
              <span className="header_menu_text">MENU</span>
            </div>
          </RightMenu>
        </div>
      </HeaderWrapper>
      <Nav className={isNavOpen ? "open" : ""}>
        {/* 메뉴바 열림 윗부분 */}
        {isNavOpen && <div className="header_overLay" onClick={closeNav}></div>}
        <div className="header_rightnav_wrap">
          <div className="header_rightnav_content">
            <div>
              <div className="header_rightnav_topWrap">
                <div className="header_userfindicon">
                  {/* 유저 아이콘 */}
                  <i
                    className="fa-regular fa-user"
                    style={{ color: "#000000" }}
                    onClick={handleLoginClick}
                  ></i>

                  {/* 찾기 아이콘 */}
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ color: "#000000" }}
                  ></i>
                </div>
                {/* 닫기 버튼 */}
                <div
                  className="header_rightnav_closebtnWrap"
                  onClick={closeNav}
                >
                  <span className="header_rightnav_closebtn">
                    <i className="fa-solid fa-xmark"></i>
                  </span>
                </div>
              </div>
              {/* 메뉴바 열림 중간 메뉴 이동 버튼들 */}
              <div className="header_rightnav_midWrap">
                <RightMenubar
                  titles={[
                    "산책 메이트 찾기",
                    "전체 게시물 보기",
                    "채팅하기",
                    "결제하기",
                  ]}
                  paths={["/walkingmate", "/board", "/chat", "/payment"]}
                  onClick={closeNav}
                ></RightMenubar>
              </div>
            </div>
            <div
              className="header_logout_btn"
              onClick={isLoggedIn ? handleLogout : handleLoginClick}
            >
              {isLoggedIn ? "로그아웃 하기" : "로그인 하기"}
            </div>
          </div>
        </div>
      </Nav>
    </>
  );
};

export default Header;
