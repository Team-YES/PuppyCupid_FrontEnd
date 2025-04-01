import styled from "styled-components";

export const PaymentStyled = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 50px;
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 1px solid #ddd;
  width: 50%;
  h3 {
    font-size: 25px;
    padding-bottom: 10px;
  }
  div {
    text-align: center;
    padding-bottom: 10px;
  }
  .Payment_btns {
    display: flex;
    justify-content: center;
    text-align: center;
    gap: 25px;
    .Payment_btn_text1 {
      font-weight: bold;
      font-size: 15px;
    }
    .Payment_btn_text2 {
      font-size: 13px;
      text-decoration: line-through;
      color: gray;
    }
    .Payment_btn_text3 {
      font-weight: bold;
      font-size: 25px;
    }
    .Payment_btn_text4 {
      font-size: 14px;
    }
  }
  .Payment_btn_1 {
    background-color: ${({ theme }) => theme.colors.mainPurple};
    padding: 25px 35px;
    border-radius: 12px;
  }
  .Payment_btn_2 {
    background-color: ${({ theme }) => theme.colors.softPurple};
    padding: 25px 35px;
    border-radius: 12px;
  }
`;

// 결제 페이지 중간
export const PaymentMid = styled.div`
  width: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
`;

// 패딩
export const PaymentPadding = styled.div`
  padding: 0px 120px;
`;
