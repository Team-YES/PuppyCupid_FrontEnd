import styled from "styled-components";

export const PaymentFailPadding = styled.div`
  padding: 0px 120px;
  padding: 0px 120px;
  .PaymentFailPadding {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background-color: #f7f7f7;
    margin: 50px 0px;
    border-radius: 12px;
  }

  /* 결제 성공 메시지 스타일 */
  .PaymentFailPadding h1 {
    font-size: 2rem;
    color: black;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
  }

  /* 주문 ID와 결제 금액 스타일 */
  .PaymentFailPadding p {
    font-size: 1.2rem;
    color: #333;
    margin: 5px 0;
    text-align: center;
  }

  /* 홈으로 버튼 스타일 */
  .PaymentFailPadding button {
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

  .PaymentFailPadding button:hover {
    background-color: ${({ theme }) => theme.colors.accentHoverPurple};
  }

  .PaymentFailPadding button:focus {
    outline: none;
  }

  /* 반응형 */
  @media (max-width: 1024px) {
    padding: 0px 60px;

    .PaymentFailPadding {
      margin: 40px 0;
    }

    .PaymentFailPadding h1 {
      font-size: 1.8rem;
    }

    .PaymentFailPadding p {
      font-size: 1.1rem;
    }

    .PaymentFailPadding button {
      font-size: 1rem;
      padding: 8px 18px;
    }
  }

  @media (max-width: 768px) {
    padding: 0px 30px;

    .PaymentFailPadding {
      margin: 30px 0;
      min-height: 60vh;
    }

    .PaymentFailPadding h1 {
      font-size: 1.6rem;
    }

    .PaymentFailPadding p {
      font-size: 1rem;
    }

    .PaymentFailPadding button {
      font-size: 0.95rem;
      padding: 8px 16px;
    }
  }

  @media (max-width: 480px) {
    padding: 0px 20px;

    .PaymentFailPadding {
      margin: 20px 0;
      min-height: 55vh;
    }

    .PaymentFailPadding h1 {
      font-size: 1.4rem;
    }

    .PaymentFailPadding p {
      font-size: 0.95rem;
    }

    .PaymentFailPadding button {
      font-size: 0.9rem;
      padding: 7px 14px;
    }
  }
`;
