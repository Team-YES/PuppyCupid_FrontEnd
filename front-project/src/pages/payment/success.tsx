import PaymentSuccessPage from "@/features/PaymentManager/Success";
import PrivateRoute from "../../components/PrivateRoute";
import BlacklistRoute from "@/components/BlacklistRoute";

const PaymentSuccess = () => {
  return (
    <BlacklistRoute>
      <PrivateRoute>
        <PaymentSuccessPage />
      </PrivateRoute>
    </BlacklistRoute>
  );
};

export default PaymentSuccess;
