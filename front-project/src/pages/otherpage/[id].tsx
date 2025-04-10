import OtherPagePage from "@/features/OtherPage";
import PrivateRoute from "../../components/PrivateRoute";
const OtherPage = () => {
  return (
    <PrivateRoute>
      <OtherPagePage />
    </PrivateRoute>
  );
};

export default OtherPage;
