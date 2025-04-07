import { useRouter } from "next/router";
import axios from "axios";
import { PaymentSuccessPadding } from "@/features/PaymentManager/Success/styled";
import { useEffect, useState } from "react";

export default function SuccessPage() {
  const router = useRouter();
  const { orderId, amount, paymentKey } = router.query;

  const [statusChecked, setStatusChecked] = useState(false);
  const parsedOrderId = Array.isArray(orderId) ? orderId[0] : orderId;
  const parsedAmount = Array.isArray(amount)
    ? parseInt(amount[0], 10)
    : parseInt(amount as string, 10);
  const parsedPaymentKey =
    typeof paymentKey === "string" ? paymentKey : paymentKey?.[0];

  useEffect(() => {
    const checkPaymentStatus = async () => {
      if (!parsedOrderId || !parsedAmount || !parsedPaymentKey) return;

      try {
        const response = await axios.get(
          `https://api.tosspayments.com/v1/payments/${parsedPaymentKey}`,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `${process.env.NEXT_PUBLIC_TOSS_SECRET_KEY}:`
              )}`,
            },
          }
        );

        const paymentData = response.data;

        console.log("💬 Toss 응답 상태:", paymentData.status);

        if (paymentData.status === "DONE" || paymentData.status === "SUCCESS") {
          await axios.post("http://localhost:5000/payments/success", {
            orderId: parsedOrderId,
            amount: parsedAmount,
            paymentKey: parsedPaymentKey,
          });

          setStatusChecked(true);
        } else {
          console.warn("아직 결제 완료 아님:", paymentData.status);
        }
      } catch (err) {
        console.error("Toss 결제 상태 확인 실패", err);
      }
    };

    // 1.5초 딜레이 후 실행
    const timeout = setTimeout(checkPaymentStatus, 1500);
    return () => clearTimeout(timeout);
  }, [parsedOrderId, parsedAmount, parsedPaymentKey]);

  const getPaymentMessage = (amount: number) => {
    if (amount === 3900) return "한 달 유저권 결제 성공!";
    if (amount === 29000) return "연간 유저권 결제 성공!";
    return "결제 성공!";
  };

  return (
    <PaymentSuccessPadding>
      <div className="PaymentSuccessPadding">
        {statusChecked ? (
          <>
            <h1>🎉 {getPaymentMessage(parsedAmount)}</h1>
            <p>주문 번호: {parsedOrderId}</p>
            <p>결제 금액: {parsedAmount}원</p>
            <button onClick={() => router.push("/")}>홈으로</button>
          </>
        ) : (
          <h2>⏳ 결제 확인 중입니다...</h2>
        )}
      </div>
    </PaymentSuccessPadding>
  );
}
