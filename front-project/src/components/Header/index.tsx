import React, { useState, useEffect } from "react";
import { HeaderWrapper, Logo, Mid, RightMenu, Nav } from "./styled";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <>
      <HeaderWrapper>
        <div className="header_logo">
          <Logo>
            <div className="header_logoimg_wrap">
              <img src="/logopractice2.png" alt="puppycupid logo" />
            </div>
          </Logo>
          <Mid>
            <div className="header_mid_wrap">
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
                  stroke-width="2.5"
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
            <div className="header_rightnav_topWrap">
              <div className="header_userfindicon">
                <i
                  className="fa-regular fa-user"
                  style={{ color: "#000000" }}
                ></i>
                <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ color: "#000000" }}
                ></i>
              </div>
              {/* 닫기 버튼 */}
              <div className="header_rightnav_closebtnWrap" onClick={closeNav}>
                <span className="header_rightnav_closebtn">
                  <i className="fa-solid fa-xmark"></i>
                </span>
              </div>
            </div>
            {/* 메뉴바 열림 중간 메뉴 이동 버튼들 */}
            <div className="header_rightnav_midWrap"></div>
          </div>
        </div>
      </Nav>
    </>
  );
};

export default Header;
