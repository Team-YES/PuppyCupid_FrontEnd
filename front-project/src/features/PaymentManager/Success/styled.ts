import styled from "styled-components";

export const PaymentSuccessPadding = styled.div`
  padding: 0px 120px;
  .PaymentSuccessPadding {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f7f7f7;
    margin: 50px 0px;
    border-radius: 12px;
  }

  /* 결제 성공 메시지 스타일 */
  .PaymentSuccessPadding h1 {
    font-size: 2rem;
    color: black;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
  }

  /* 주문 ID와 결제 금액 스타일 */
  .PaymentSuccessPadding p {
    font-size: 1.2rem;
    color: #333;
    margin: 5px 0;
    text-align: center;
  }

  /* 홈으로 버튼 스타일 */
  .PaymentSuccessPadding button {
    background-color: ${({ theme }) => theme.colors.accentPurple};
    color: #fff;
    padding: 10px 20px;
    font-size: 1.1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
  }

  .PaymentSuccessPadding button:hover {
    background-color: ${({ theme }) => theme.colors.accentHoverPurple};
  }

  .PaymentSuccessPadding button:focus {
    outline: none;
  }
`;
