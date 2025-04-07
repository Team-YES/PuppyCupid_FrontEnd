import WalkingMatePage from "@/features/WalkingMate";
import PrivateRoute from "@/components/PrivateRoute";
const WalkingMate = () => {
  return (
    <PrivateRoute>
      <WalkingMatePage />
    </PrivateRoute>
  );
};

export default WalkingMate;
