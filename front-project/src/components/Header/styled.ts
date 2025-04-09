import styled from "styled-components";

// 전체
export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 130px;
  box-sizing: border-box;

  /* 스크롤에 따른 헤더 CSS 변경 */
  &.scrolled {
    height: 65px;
    .header_mid_wrap {
      opacity: 0;
      visibility: hidden;
    }
    .header_right_wrap {
      border: none;
    }
    .header_menu_text {
      opacity: 0;
      visibility: hidden;
    }
  }
  @media (max-width: 1024px) {
    z-index: 20;
  }

  @media (min-width: 1025px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 5;
    &.scrolled {
      .header_logoimg_wrap {
        width: 80px;
        margin-right: 5px;
      }
    }
  }
  @media (max-width: 1024px) {
    &.scrolled {
      height: 65px;
      transition: height 0.3s ease-in-out;
      .header_logoimg_wrap {
        width: 65px;
        overflow: hidden;
        transition: height 0.3s ease-in-out;
      }
      .header_right_wrap {
        border: none;
      }
      .header_menu_text {
        opacity: 0;
        visibility: hidden;
        transition: height 0.3s ease-in-out;
      }
    }
    z-index: 20;
  }
  .header_logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .header_heartbeat {
    fill: #ccb6fd;
    transform-origin: center;
    animation: beat 1s infinite ease-in-out;
  }

  @keyframes beat {
    0%,
    100% {
      transform: scale(1);
    }
    25% {
      transform: scale(1.2);
    }
    50% {
      transform: scale(0.8);
    }
    75% {
      transform: scale(1.05);
    }
  }
  /* 반응형 */
  @media (max-width: 767px) {
    .header_menu_text {
      opacity: 0;
      visibility: hidden;
    }
  }
`;
// 헤더 로고
export const Logo = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  .header_logoimg_wrap {
    width: 80px;
    overflow: hidden;
    /* &:hover {
      cursor: url("/cursor-hover1.png") 16 16, auto;
    } */
    cursor: pointer;
  }
  .header_logoimg_wrap img {
    padding-right: 7px;
    width: 100%;
    object-fit: contain;
    height: auto;
  }
`;
// 헤더 중앙
export const Mid = styled.nav`
  flex: none;
  text-align: center;
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: bold;
  .header_mid_wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
      margin: 0px 5px;
    }
  }
  @media (max-width: 480px) {
    .header_mid_wrap {
      display: none;
    }
  }
`;

// 헤더 오른쪽
export const RightMenu = styled.a`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  .header_right_wrap {
    width: 65px;
    height: 65px;
    border: 1px black solid;
    padding: 30px;
    position: relative;
    display: flex;
    justify-content: left;
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
  }
  .header_btn_line1,
  .header_btn_line2,
  .header_btn_line3 {
    position: absolute;
    background: #333;
  }
  .header_btn_line1 {
    top: 23px;
    width: 35%;
    left: 20px;
    height: 3px;
  }
  .header_btn_line2 {
    top: 30px;
    width: 35%;
    height: 3px;
    left: 20px;
    transform: scaleX(0.55);
    transform-origin: left;
    transition: width 0.3s ease, height 0.3s ease, transform 0.3s ease;
  }
  .header_btn_line3 {
    top: 37px;
    width: 35%;
    height: 3px;
    left: 20px;
  }
  .header_menu_text {
    position: absolute;
    left: 15px;
    font-size: 10px;
    letter-spacing: 1px;
    top: 120%;
    margin-top: -5px;
    text-align: right;
    color: black;
  }

  /* 호버 시 길이 변경 */
  .header_right_wrap:hover .header_btn_line2 {
    width: 35%;
    transform: scaleX(1);
    left: 20px;
    height: 3.5px;
  }

  @media (max-width: 1024px) {
    .header_menu_text {
      left: -50px;
      top: 50%;
    }
  }
  @media (min-width: 1025px) {
    .header_right_wrap {
      width: 35px;
      height: auto;
      border: 1px black solid;
      padding: 25px;
      position: relative;
      display: flex;
      justify-content: left;
      align-items: center;
      cursor: pointer;
    }
    .header_btn_line1 {
      top: 16px;
      width: 35%;
      height: 3px;
      left: 15px;
    }
    .header_btn_line2 {
      top: 23px;
      width: 35%;
      height: 3px;
      left: 15px;
      transform: scaleX(0.55);
      transform-origin: left;
      transition: width 0.3s ease, height 0.3s ease, transform 0.3s ease;
    }
    .header_btn_line3 {
      top: 30px;
      width: 35%;
      height: 3px;
      left: 15px;
    }
    /* 호버 시 길이 변경 */
    .header_right_wrap:hover .header_btn_line2 {
      width: 35%;
      transform: scaleX(1);
      left: 15px;
      height: 3.5px;
    }
    .header_menu_text {
      position: absolute;
      left: 10px;
      font-size: 10px;
      letter-spacing: 1px;
      top: 120%;
      margin-top: -5px;
      text-align: right;
      color: black;
    }
  }
  /* 반응형 */
  @media (max-width: 767px) {
    /* .header_right_wrap {
      border: none;
    } */
  }
  @media (max-width: 480px) {
    .header_right_wrap {
      border: none;
    }
  }
`;

// 헤더 메뉴바
export const Nav = styled.nav`
  /* 오버레이 */
  .header_rightnav_topWrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px;
    box-sizing: border-box;
  }
  .header_rightnav_content {
    position: fixed;
    top: 0;
    right: -45vw;
    width: 45vw;
    height: 100vh;
    background: white;
    transition: right 0.3s ease-in-out;
    box-shadow: -5px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
  }
  /* @media (min-width: 1025px;) {
    .header_rightnav_content {
      z-index: 9999;
    }
  } */
  @media (max-width: 480px) {
    .header_rightnav_content {
      right: -100vw;
      width: 100vw;
    }
  }
  .header_overLay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9998;
    transition: opacity 0.3s ease;
  }
  .header_rightnav_wrap {
    position: relative;
    z-index: 9999;
  }
  &.open .header_rightnav_content {
    right: 0;
  }

  /* 아이콘 */
  .header_userfindicon {
    font-size: 28px;
    padding: 0px 15px;
    padding-top: 8px;
  }

  .header_userfindicon i {
    padding-right: 20px;
    cursor: pointer;
  }
  @media (max-width: 767px) {
    .header_userfindicon i {
      padding-right: 15px;
    }
  }
  /* right menu bar */
  .header_rightnav_midWrap {
    padding: 30px 30px 30px 45px;
    .RightMenubar_title {
      cursor: pointer;
      padding-bottom: 25px;
      font-size: 23px;
      &:hover {
        color: ${({ theme }) => theme.colors.pointPurple};
      }
    }
  }

  /* 닫기 버튼 */
  .header_rightnav_closebtnWrap {
    font-size: 25px;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 55px;
    aspect-ratio: 1/1;
    cursor: pointer;
  }
  @media (max-width: 767px) {
    .header_rightnav_closebtnWrap {
      font-size: 25px;
      background-color: white;
      color: black;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      width: 55px;
      aspect-ratio: 1/1;
      cursor: pointer;
    }
    .header_rightnav_midWrap {
      .RightMenubar_title {
        cursor: pointer;
        padding-bottom: 25px;
        font-size: 20px;
      }
    }
  }
  .header_rightnav_closebtnWrap span {
    margin: 0;
  }

  .header_logout_btn {
    font-size: 20px;
    font-weight: bold;
    display: flex;
    justify-content: right;
    padding-right: 30px;
    padding-bottom: 30px;
    cursor: pointer;
    &:hover {
      color: ${({ theme }) => theme.colors.pointPurple};
    }
  }
  @media (max-width: 767px) {
    .header_logout_btn {
      font-size: 15px;
    }
    .header_userfindicon {
      font-size: 20px;
      padding-top: 3px;
    }
  }
`;
