import { GetServerSideProps } from "next";
import PaymentPage from "@/features/PaymentManager/Payment";
import axios from "axios";
import PrivateRoute from "../../components/PrivateRoute";
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
  return (
    <PrivateRoute>
      <PaymentPage tossClientKey={tossClientKey} />
    </PrivateRoute>
  );
};

export default Payment;
