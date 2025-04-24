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
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axios";

interface PaymentProps {
  tossClientKey: string | null;
}
const PaymentPage = ({ tossClientKey }: PaymentProps) => {
  const handlePayment = async (amount: number) => {
    if (!tossClientKey) {
      console.error("Toss client key가 없습니다.");
      return;
    }

    try {
      const token = Cookies.get("access_token");

      // const res = await axios.post(
      //   `${process.env.NEXT_PUBLIC_API_URL}/payments/create`,
      //   {
      //     amount,
      //     method: "card",
      //   },
      //   {
      //     withCredentials: true,
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
      // );

      const res = await axiosInstance.post("/payments/create", {
        amount,
        method: "card",
      });
      const { orderId } = res.data;

      // 2. Toss 결제 요청
      const tossPayments = await loadTossPayments(tossClientKey);

      await tossPayments.requestPayment("카드", {
        amount: amount,
        orderId: orderId,
        orderName: `${amount}원 결제`,
        successUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?orderId=${orderId}&amount=${amount}`,
        failUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/fail?orderId=${orderId}&amount=${amount}`,
      });
    } catch (error) {
      console.error("결제 요청 중 오류:", error);
      window.location.href = "/payment/fail";
    }
  };

  return (
    <PaymentBackGround>
      <PaymentPadding>
        <PaymentStyled>
          <PaymentTop>
            <h3>
              <span>🐾 파워 유저권으로 </span>
              <span>우리 아이에게 더 많은 친구를!</span>
            </h3>
            <div className="Payment_blackText">
              반려동물과 함께하는 행복한 만남, 지금 시작하세요!🐶
            </div>

            <div className="Payment_btns">
              <button
                onClick={() => handlePayment(2900)}
                className="Payment_btn_1"
              >
                <p className="Payment_btn_text1">한 달 유저권</p>
                <p className="Payment_btn_text2">4,900원</p>
                <p className="Payment_btn_text3">2,900원</p>
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
                🐾 "MBTI + 실시간 위치 기반 매칭"으로 우리 아이와 성격도 잘 맞고
                가까이에 있는 친구를 찾아드려요!
              </p>
              <p className="Payment_midtext">
                🏡 위치 기반만으로도 우리 아이와 가까운 친구들을 만날 수 있어요!{" "}
              </p>
              <p className="Payment_midtext">
                🐶 파워 유저권이 있어야만 매칭 기능을 사용할 수 있어요.
              </p>
              <p className="Payment_midtext">
                🏞️ 산책 친구, 놀이 친구, 소중한 인연을 이어가세요!
              </p>
              <p className="Payment_midtext2">
                🚫 무료 이용자는 매칭이 제공되지 않습니다.
              </p>
              <p className="Payment_midtext3">
                지금 바로 파워 유저로 업그레이드하고 우리 아이에게 특별한 친구를
                선물하세요! 💕
              </p>
            </div>
          </PaymentMid>
        </PaymentStyled>
      </PaymentPadding>
    </PaymentBackGround>
  );
};

export default PaymentPage;
