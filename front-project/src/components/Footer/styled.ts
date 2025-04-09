import styled from "styled-components";

export const FooterWrapper = styled.footer`
  .footer_AllWrap {
    min-height: 100px;
    border-top: solid 1px black;
    background-color: #232323;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: rgb(201, 201, 201);
  }

  .payment_footer {
    background-color: white;
    border: none;
    border-top: 1px solid #ddd;
    color: gray;
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
      font-size: 14px;
    }
    .footer_CompanyWrap1,
    .footer_CompanyWrap2 {
      font-size: 9px;
    }
  }
`;

export const FooterPadding = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isNotMainPage",
})<{ isNotMainPage: boolean }>`
  padding: ${(props) => (props.isNotMainPage ? "0" : "0 120px")};
  background-color: ${(props) => (props.isNotMainPage ? "#f9f9f9" : "#fff")};
  @media (max-width: 1024px) {
    padding: ${(props) => (props.isNotMainPage ? "0" : "0 20px")};
  }
`;
