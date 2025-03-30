import styled from "styled-components";

export const FooterWrapper = styled.footer`
  .footer_AllWrap {
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

  .footer_Wrap {
    padding-top: 50px;
    padding-bottom: 50px;
    height: 100%;
    width: 100%;
  }
  .footer_snsWrap {
    font-size: 12px;
  }

  .footer_snsWrap a {
    margin-left: 10px;
    text-decoration: none;
    color: inherit;
  }

  .footer_CompanyWrap1,
  .footer_CompanyWrap2 {
    font-size: 10px;
    margin-top: 10px;
    color: #8f8f8f;
  }

  .footer_snsWrap a i {
    display: none;
  }
  /* 반응형 CSS */
  @media (max-width: 768px) {
    .footer_snsWrap a span {
      display: none;
    }

    .footer_snsWrap a i {
      display: inline-block;
      font-size: 15px;
    }
    .footer_CompanyWrap1,
    .footer_CompanyWrap2 {
      font-size: 10px;
    }
  }
`;

export const FooterPadding = styled.footer`
  padding: 0px 100px;
`;
