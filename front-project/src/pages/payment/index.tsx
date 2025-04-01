import { GetServerSideProps } from "next";
import PaymentPage from "@/features/PaymentManager/Payment";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async () => {
  console.log("🔥 getServerSideProps 실행됨!");
  try {
    const response = await axios.get(
      "http://localhost:5000/payments/getTossClientKey"
    );
    const tossClientKey = response.data.tossClientKey;
    console.log("받아온 Toss Client Key:", tossClientKey);
    return { props: { tossClientKey } };
  } catch (error) {
    console.error("API 호출 실패: ", error);
    return { props: { tossClientKey: null } };
  }
};

// ✅ PaymentPage에 tossClientKey를 props로 전달해야 함
const Payment = ({ tossClientKey }: { tossClientKey: string | null }) => {
  return <PaymentPage tossClientKey={tossClientKey} />;
};

export default Payment;
