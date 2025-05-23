import React, { useState, useEffect } from "react";
import { HeaderWrapper, Logo, Mid, RightMenu, Nav } from "./styled";
import { useAuth } from "../../context/AuthContext";
import RightMenubar from "../../assets/RightMenubar";
import { useRouter } from "next/router";
import axios from "axios";
import PrivateRoute from "../../components/PrivateRoute";

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
  const { isLoggedIn, logout } = useAuth();

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

  const handleMyPageClick = () => {
    router.push("/mypage");
  };

  const handleLogout = () => {
    logout(); // AuthContext에서 제공하는 logout 함수 호출
    alert("로그아웃 되었습니다.");
    router.push("/"); // 로그아웃 후 홈으로 리다이렉트
  };

  const handleFind = () => {
    router.push("/board");
  };

  return (
    <>
      <HeaderWrapper className={isScrolled ? "scrolled" : ""}>
        <div className="header_logo">
          <Logo>
            <div className="header_logoimg_wrap" onClick={handleLogoClick}>
              <img
                src={
                  isScrolled ? "/puppy_cupid_logo.png" : "/logopractice4.png"
                }
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
          <RightMenu className={isNavOpen ? "open" : ""}>
            <div className="header_right_wrap" onClick={openNav}>
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
                    onClick={() => {
                      closeNav();
                      handleMyPageClick();
                    }}
                  ></i>

                  {/* 찾기 아이콘 */}
                  <i
                    className="fa-solid fa-magnifying-glass"
                    style={{ color: "#000000" }}
                    onClick={() => {
                      closeNav();
                      handleFind();
                    }}
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
                    "게시물 작성하기",
                    "채팅하기",
                    "결제하기",
                    "문의하기",
                  ]}
                  paths={[
                    "/walkingmate",
                    "/board",
                    "/post_registration",
                    "/chat",
                    "/payment",
                    "/help",
                  ]}
                  onClick={closeNav}
                ></RightMenubar>
              </div>
            </div>
            <div
              className="header_logout_btn"
              onClick={() => {
                closeNav();
                isLoggedIn ? handleLogout() : handleLoginClick();
              }}
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
