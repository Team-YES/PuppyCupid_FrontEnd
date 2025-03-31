import React from "react";
import { FooterPadding, FooterWrapper } from "./styled";

const Footer = () => {
  return (
    <FooterPadding>
      <FooterWrapper>
        <div className="footer_AllWrap">
          <div className="footer_Wrap">
            <div className="footer_snsWrap">
              <a href="https://www.instagram.com" target="_blank">
                <span>INSTAGRAM</span>
                <i className="fa-brands fa-square-instagram"></i>
              </a>
              <a href="https://pf.kakao.com" target="_blank">
                <span>KAKAOTALK</span>
                <i className="fa-solid fa-comment"></i>
              </a>
              <a href="https://www.youtube.com" target="_blank">
                <span>YOUTUBE</span>
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a href="https://github.com/Team-YES" target="_blank">
                <span>CONTACT</span>
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
            <div className="footer_CompanyWrap1">
              <p>
                ㈜PUPPY CUPID | 사업자등록번호: 229-111-111111 | 공동대표:
                김은주, 최승연, 최유진
                <br />
                주소: 서울특별시 강남구 테헤란로
              </p>
            </div>
            <div className="footer_CompanyWrap2">
              <p>© PUPPY CUPID</p>
            </div>
          </div>
        </div>
      </FooterWrapper>
    </FooterPadding>
  );
};

export default Footer;
