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
    background-color: #232323;
    color: rgb(201, 201, 201);
  }

  .footerWrap {
    padding-top: 50px;
    padding-bottom: 50px;
    height: 100%;
    width: 100%;
  }
  .footersnsWrap {
    font-size: 12px;
  }

  .footersnsWrap a {
    margin-left: 10px;
    text-decoration: none;
    color: inherit;
  }

  .footerCompanyWrap1,
  .footerCompanyWrap2 {
    font-size: 10px;
    margin-top: 10px;
    color: #8f8f8f;
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

export const FooterPadding = styled.footer`
  padding: 0px 100px;
`;
