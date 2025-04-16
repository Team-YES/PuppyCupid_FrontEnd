import { GetServerSideProps } from "next";
import PaymentPage from "@/features/PaymentManager/Payment";
import axios from "axios";
import PrivateRoute from "../../components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import BlacklistRoute from "@/components/BlacklistRoute";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/payments/getTossClientKey"
    );
    const tossClientKey = response.data.tossClientKey;
    return { props: { tossClientKey } };
  } catch (error) {
    console.error("API 호출 실패: ", error);
    return { props: { tossClientKey: null } };
  }
};

const Payment = ({ tossClientKey }: { tossClientKey: string | null }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === "power_month" || user?.role === "power_year") {
      alert(
        "이미 파워 유저권을 사용 중입니다. 이용 기간이 끝난 후 다시 결제해 주세요."
      );
      router.replace("/");
    }
  }, [user, router]);

  return (
    <BlacklistRoute>
      <PrivateRoute>
        <PaymentPage tossClientKey={tossClientKey} />
      </PrivateRoute>
    </BlacklistRoute>
  );
};

export default Payment;
