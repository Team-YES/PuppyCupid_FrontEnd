import PaymentFailPage from "@/features/PaymentManager/Fail";
import PrivateRoute from "../../components/PrivateRoute";
import BlacklistRoute from "@/components/BlacklistRoute";

const PaymentFail = () => {
  return (
    <BlacklistRoute>
      <PrivateRoute>
        <PaymentFailPage />
      </PrivateRoute>
    </BlacklistRoute>
  );
};

export default PaymentFail;
