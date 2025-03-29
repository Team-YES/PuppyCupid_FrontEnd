import React from "react";
import { FooterPadding, FooterWrapper } from "./styled";

const Footer: React.FC = () => {
  return (
    <FooterPadding>
      <FooterWrapper>
        <div className="footerAllWrap">
          <div className="footerWrap">
            <div className="footersnsWrap">
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
            <div className="footerCompanyWrap1">
              <p>
                ㈜PUPPY CUPID | 사업자등록번호: 229-111-111111 | 공동대표:
                김은주, 최승연, 최유진
                <br />
                주소: 서울특별시 강남구 테헤란로
              </p>
            </div>
            <div className="footerCompanyWrap2">
              <p>© PUPPY CUPID</p>
            </div>
          </div>
        </div>
      </FooterWrapper>
    </FooterPadding>
  );
};

export default Footer;
