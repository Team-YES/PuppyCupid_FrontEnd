import styled from "styled-components";

// 전체
export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  padding: 25px;
  background-color: white;
  height: 130px;
  .header_logo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
`;
// 헤더 로고고
export const Logo = styled.div`
  .header_logoimg_wrap {
    width: 80px;
    overflow: hidden;
  }
  .header_logoimg_wrap img {
    width: 100%;
    object-fit: contain;
    height: auto;
  }
`;
// 헤더 중앙
export const Mid = styled.nav`
  font-size: 13px;
  letter-spacing: 2px;
  font-weight: bold;
`;

// 헤더 오른쪽
export const RightMenu = styled.a`
  .header_right_wrap {
    width: 65px;
    height: auto;
    border: 1px black solid;
    padding: 30px;
    position: relative;
    display: flex;
    justify-content: left;
    align-items: center;
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

  &.open .header_rightnav_content {
    right: 0;
  }

  /* 아이콘 */
  .header_userfindicon {
    font-size: 20px;
    padding: 0px 15px;
  }

  .header_userfindicon i {
    padding-right: 20px;
    cursor: pointer;
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
    width: 13%;
    aspect-ratio: 1/1;
    cursor: pointer;
  }

  .header_rightnav_closebtnWrap span {
    margin: 0;
  }
`;
