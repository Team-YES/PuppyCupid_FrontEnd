import PaymentFailPage from "@/features/PaymentManager/Fail";
import PrivateRoute from "../../components/PrivateRoute";
const PaymentFail = () => {
  return (
    <PrivateRoute>
      <PaymentFailPage />
    </PrivateRoute>
  );
};

export default PaymentFail;
