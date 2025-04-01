import styled from "styled-components";

// 패딩
export const PaymentPadding = styled.div`
  padding: 0px 120px;
`;

export const PaymentBackGround = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px 0px 150px 0px;
  background-color: ${({ theme }) => theme.colors.backgroundGray};
`;

export const PaymentStyled = styled.div`
  padding: 50px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid #ddd; */
  border-radius: 12px;
  height: 90vh;
  background-color: white;
  button {
    all: unset;
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
  }
  .Payment_borderMid {
    width: 1px;
    height: 100%;
    background-color: #ddd;
  }
`;

// 결제 페이지 상단
export const PaymentTop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 0px 25px;
  h3 {
    font-size: 30px;
    padding-bottom: 20px;
  }
  .Payment_btns {
    padding-top: 15px;
    padding-bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .Payment_btns {
    display: flex;
    justify-content: space-between;
    text-align: center;

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
      font-size: 18px;
    }
    .Payment_btn_text4 {
      font-size: 14px;
    }
  }
  .Payment_btn_1 {
    background-color: ${({ theme }) => theme.colors.softPurple};
    padding: 25px 25px;
    border-radius: 12px;
    flex: 1;
  }
  .Payment_btn_2 {
    background-color: ${({ theme }) => theme.colors.mainPurple};
    padding: 25px 25px;
    border-radius: 12px;
    flex: 1;
  }
  .Payment_blueText {
    color: rgb(0, 108, 232);
    font-size: 13px;
  }
`;

// 결제 페이지 중간
export const PaymentMid = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 0px 35px;

  h2 {
    padding-bottom: 10px;
  }
  .Payment_midtext {
    font-size: 16px;
    padding-bottom: 10px;
    color: rgb(88, 88, 88);
  }
  .Payment_midtext2 {
    font-size: 15px;
    font-weight: bold;
    padding-top: 10px;
    padding-bottom: 5px;
  }
`;
