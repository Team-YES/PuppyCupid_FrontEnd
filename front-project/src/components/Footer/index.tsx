import React from "react";
import { FooterWrapper } from "./styled";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <div className="footerAllWrap">
        <div className="footerWrap">
          <div className="snsWrap">
            <a href="https://www.instagram.com">
              <span>INSTAGRAM</span>
              <i className="fa-brands fa-square-instagram"></i>
            </a>
            <a href="https://pf.kakao.com">
              <span>KAKAOTALK</span>
              <i className="fa-solid fa-comment"></i>
            </a>
            <a href="https://www.youtube.com">
              <span>YOUTUBE</span>
              <i className="fa-brands fa-youtube"></i>
            </a>
            <a
              href="mailto:bakezy123@bakezy.com"
              onClick={(e) => {
                e.preventDefault();
                alert("준비중입니다!\nThank you for contacting us!");
              }}
            >
              <span>CONTACT</span>
              <i className="fa-solid fa-envelope"></i>
            </a>
          </div>
          <div className="companyWrap1">
            <p>
              ㈜BAKEZY | 사업자등록번호: 229-111-222211 | 공동대표: 김은주
              손한별
              <br />
              서울특별시 강남구 테헤란로
            </p>
          </div>
          <div className="companyWrap2">
            <p>©BAKEZY</p>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;
