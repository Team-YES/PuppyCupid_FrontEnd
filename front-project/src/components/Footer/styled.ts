import styled from "styled-components";

export const FooterWrapper = styled.footer`
  .footerAllWrap {
    background-color: white;
    min-height: 100px;
    border-top: solid 1px black;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-color: #333;
    color: white;
  }

  .footerWrap {
    padding-top: 30px;
    padding-bottom: 10px;
    height: 100%;
    width: 100%;
  }
  .footersnsWrap {
    font-size: 13px;
  }

  .footersnsWrap a {
    margin-left: 10px;
    text-decoration: none;
    color: inherit;
  }

  .footerCompanyWrap1,
  .footerCompanyWrap2 {
    font-size: 12px;
    margin-top: 10px;
  }

  .footersnsWrap a i {
    display: none;
  }
  /* 반응형 CSS */
  @media (max-width: 768px) {
    .footersnsWrap a span {
      display: none;
    }

    .footersnsWrap a i {
      display: inline-block;
      font-size: 15px;
    }
    .footerCompanyWrap1,
    .footerCompanyWrap2 {
      font-size: 10px;
    }
  }
`;
