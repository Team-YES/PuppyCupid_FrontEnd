import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PaymentFailPadding } from "@/features/PaymentManager/Fail/styled";

export default function FailPage() {
  const router = useRouter();
  const [errorInfo, setErrorInfo] = useState({ code: "", message: "" });

  useEffect(() => {
    if (router.isReady) {
      setErrorInfo({
        code: (router.query.code as string) || "알 수 없는 오류",
        message: (router.query.message as string) || "오류 메시지가 없습니다.",
      });
    }
  }, [router.isReady, router.query]);

  return (
    <PaymentFailPadding>
      <div>
        <h1>❌ 결제 실패</h1>
        <p>오류 코드: {errorInfo.code}</p>
        <p>오류 메시지: {errorInfo.message}</p>
        <button onClick={() => router.push("/")}>홈으로</button>
      </div>
    </PaymentFailPadding>
  );
}
