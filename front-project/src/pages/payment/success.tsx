import PaymentSuccessPage from "@/features/PaymentManager/Success";
import PrivateRoute from "../../components/PrivateRoute";
const PaymentSuccess = () => {
  return (
    <PrivateRoute>
      <PaymentSuccessPage />
    </PrivateRoute>
  );
};

export default PaymentSuccess;
