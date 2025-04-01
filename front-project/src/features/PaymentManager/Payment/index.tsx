import { GetServerSideProps } from "next";
import { loadTossPayments } from "@tosspayments/payment-sdk";
// import { PaymentPadding, PaymentStyled, PaymentTop } from "./styled";
import {
  PaymentBackGround,
  PaymentPadding,
  PaymentStyled,
  PaymentTop,
  PaymentMid,
} from "@/features/PaymentManager/Payment/styled";
import axios from "axios";

// export const getServerSideProps: GetServerSideProps = async () => {
//   console.log("🔥 getServerSideProps 실행됨!"); // 추가
//   try {
//     const response = await axios.get(
//       "http://localhost:5000/payments/getTossClientKey"
//     );

//     console.log(response.data);

//     const tossClientKey = response.data.tossClientKey;
//     console.log("받아온 Toss Client Key:", tossClientKey);
//     return {
//       props: { tossClientKey },
//     };
//   } catch (error) {
//     console.error("API 호출 실패: ", error);
//     return {
//       props: { tossClientKey: null },
//     };
//   }
// };

interface PaymentProps {
  tossClientKey: string | null;
}
const PaymentPage = ({ tossClientKey }: PaymentProps) => {
  console.log("넘어온 tossClientKey:", tossClientKey);
  const handlePayment = async (amount: number) => {
    if (!tossClientKey) {
      console.error("Toss client key가 없습니다.");
      return;
    }

    const tossPayments = await loadTossPayments(tossClientKey);
    try {
      await tossPayments.requestPayment("카드", {
        amount: amount,
        orderId: `order-${new Date().getTime()}`,
        orderName: `${amount}원 결제`,
        successUrl: "http://localhost:3000/payment/success",
        failUrl: "http://localhost:3000/payment/fail",
      });
    } catch (error) {
      console.error("결제 오류: ", error);
    }
  };

  return (
    <PaymentBackGround>
      <PaymentPadding>
        <PaymentStyled>
          <PaymentTop>
            <h3>
              🐾 파워 유저권으로
              <br /> 우리 아이에게 더 많은 친구를!
            </h3>
            <div>반려동물과 함께하는 행복한 만남, 지금 시작하세요!🐶</div>
            <div>
              <div className="Payment_btns">
                <button
                  onClick={() => handlePayment(3900)}
                  className="Payment_btn_1"
                >
                  <p className="Payment_btn_text1">한 달 유저권</p>
                  <p className="Payment_btn_text2">4,900원</p>
                  <p className="Payment_btn_text3">3,900원</p>
                  <p className="Payment_btn_text4">(부가세 포함)</p>
                </button>
                <button
                  onClick={() => handlePayment(29000)}
                  className="Payment_btn_2"
                >
                  <p className="Payment_btn_text1">연간 유저권</p>
                  <p className="Payment_btn_text2">58,800원</p>
                  <p className="Payment_btn_text3">29,000원</p>
                  <p className="Payment_btn_text4">(부가세 포함)</p>
                </button>
              </div>
            </div>
            <div className="Payment_blueText">
              🎉 프로모션 할인 중! 지금 가입하면 더 저렴한 가격에 이용할 수
              있어요!
            </div>
          </PaymentTop>
          <span className="Payment_borderMid"></span>
          <PaymentMid>
            <div>
              <h2>💜 파워 유저 혜택</h2>
              <p className="Payment_midtext">
                🏡 위치 기반으로 우리 아이와 가까운 친구들을 만날 수 있어요!{" "}
              </p>
              <p className="Payment_midtext">
                🏞️ 산책 친구, 놀이 친구, 소중한 인연을 이어가세요!
              </p>
              <p className="Payment_midtext">
                🐶 파워 유저권을 이용하면 더 많은 댕댕이 친구들을 만날 수
                있어요!
              </p>
              <p className="Payment_midtext2">
                무료 이용자는 최대 3번만 매칭 가능!🐾
              </p>
              <p className="Payment_midtext3">
                우리 아이가 새로운 친구를 만나게 해주세요! 💕
              </p>
            </div>
          </PaymentMid>
        </PaymentStyled>
      </PaymentPadding>
    </PaymentBackGround>
  );
};

export default PaymentPage;
