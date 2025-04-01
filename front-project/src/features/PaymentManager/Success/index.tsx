import { useRouter } from "next/router";
import axios from "axios";
import { PaymentSuccessPadding } from "@/features/PaymentManager/Success/styled";
import { useEffect } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const { orderId, amount, status } = router.query;

  useEffect(() => {
    // 결제 완료 후 서버에 결제 상태 확인 요청을 보낼 수 있음
    if (orderId && amount && status) {
      axios
        .post("http://localhost:5000/api/verifyPayment", {
          orderId,
          amount,
          status,
        })
        .then((response) => {
          // 결제 결과 처리
          if (response.data.success) {
            // 결제 성공 처리
            console.log("결제 성공!");
          } else {
            // 결제 실패 처리
            console.log("결제 실패:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("결제 확인 오류", error);
        });
    }
  }, [orderId, amount, status]);

  return (
    <PaymentSuccessPadding>
      <div>
        <h1>✅ 결제 성공!</h1>
        <p>주문 ID: {orderId}</p>
        <p>결제 금액: {amount}원</p>
        <button onClick={() => router.push("/")}>홈으로</button>
      </div>
    </PaymentSuccessPadding>
  );
}
