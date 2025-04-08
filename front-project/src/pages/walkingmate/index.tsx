import WalkingMatePage from "@/features/WalkingMate";
import PowerUserRoute from "@/components/PowerUserRoute";
const WalkingMate = () => {
  return (
    <PowerUserRoute>
      <WalkingMatePage />
    </PowerUserRoute>
  );
};

export default WalkingMate;
