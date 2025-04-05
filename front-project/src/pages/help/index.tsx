import HelpPage from "@/features/Help";
import PrivateRoute from "../../components/PrivateRoute";
const Help = () => {
  return (
    <PrivateRoute>
      <HelpPage />
    </PrivateRoute>
  );
};

export default Help;
