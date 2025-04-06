import styled from "styled-components";

// 패딩
export const PaymentPadding = styled.div`
  padding: 0px 120px;
  @media (max-width: 767px) {
    padding: 0px 35px;
  }
`;

export const PaymentBackGround = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 0px 150px 0px;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
`;

export const PaymentStyled = styled.div`
  padding: 60px 50px;
  display: flex;
  justify-content: center;
  border-radius: 12px;
  /* height: 90vh; */
  background-color: white;
  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 767px) {
    padding: 50px 20px;
  }
  button {
    all: unset;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }
`;

// 결제 페이지 상단
export const PaymentTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 0px 25px;
  border-right: 1px solid #ddd;
  h3 {
    font-size: 25px;
    padding-bottom: 35px;
    width: 85%;
    font-weight: bold;
    span {
      display: block;
    }
  }

  .Payment_btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding-top: 35px;
    padding-bottom: 35px;
    width: 85%;
    box-sizing: border-box;
    gap: 20px;
    .Payment_btn_text1 {
      font-weight: bold;
      font-size: 15px;
      margin: 6px 0px;
    }
    .Payment_btn_text2 {
      font-size: 13px;
      text-decoration: line-through;
      color: gray;
      margin: 6px 0px;
    }
    .Payment_btn_text3 {
      font-weight: bold;
      font-size: 18px;
      margin: 6px 0px;
    }
    .Payment_btn_text4 {
      font-size: 14px;
      margin: 6px 0px;
    }
  }
  .Payment_btn_1 {
    background-color: ${({ theme }) => theme.colors.softPurple};
    padding: 25px 20px;
    border-radius: 12px;
    flex: 1;
  }
  .Payment_btn_2 {
    background-color: ${({ theme }) => theme.colors.mainPurple};
    padding: 25px 20px;
    border-radius: 12px;
    flex: 1;
  }
  .Payment_blackText {
    width: 85%;
  }
  .Payment_blueText {
    color: rgb(0, 108, 232);
    font-size: 13px;
    width: 85%;
  }
  /* 반응형 */
  @media (max-width: 1024px) {
    width: 90%;
    padding: 0px 25px;
    border-right: none;
    border-bottom: 1px solid #ddd;
    padding-bottom: 50px;
  }
  @media (max-width: 767px) {
    width: 75%;
    padding: 0px 0px;
    padding-bottom: 35px;
    .Payment_btns {
      flex-direction: column;
      justify-content: flex-start;
    }
    .Payment_btn_1 {
      background-color: ${({ theme }) => theme.colors.softPurple};
      padding: 25px 65px;
    }
    .Payment_btn_2 {
      background-color: ${({ theme }) => theme.colors.mainPurple};
      padding: 25px 65px;
    }
  }
  @media (max-width: 480px) {
    .Payment_btn_1 {
      padding: 25px 50px;
    }
    .Payment_btn_2 {
      padding: 25px 50px;
    }
    h3 {
      font-size: 26px;
      span {
        display: inline;
      }
    }
  }
`;

// 결제 페이지 중간
export const PaymentMid = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 35px;

  h2 {
    padding-bottom: 35px;
    font-size: 25px;
  }
  .Payment_midtext {
    font-size: 16px;
    padding-bottom: 20px;
    color: rgb(88, 88, 88);
  }
  .Payment_midtext2 {
    font-size: 15px;
    font-weight: bold;
    padding-top: 15px;
    padding-bottom: 5px;
  }
  /* 반응형 */
  @media (max-width: 1024px) {
    width: 80%;
    padding: 0px 25px;
    padding-top: 50px;
  }
  @media (max-width: 767px) {
    width: 100%;
    padding-top: 35px;
  }
`;
