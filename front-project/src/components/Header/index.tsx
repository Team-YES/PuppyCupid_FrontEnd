import React, { useState, useEffect } from "react";
import { HeaderWrapper, Logo, Mid, RightMenu, Nav } from "./styled";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      // 스크롤 50px 이상 내려가면
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
            {/* <img src="/logopractice2.png" alt="puppycupid logo" /> */}
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
      <Nav className={isNavOpen ? "open" : ""}>
        {/* 메뉴바 열림 윗부분 */}
        {isNavOpen && <div className="header_overLay" onClick={closeNav}></div>}
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
      </Nav>
    </HeaderWrapper>
  );
};

export default Header;
