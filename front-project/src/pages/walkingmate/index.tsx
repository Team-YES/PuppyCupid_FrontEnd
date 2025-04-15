import WalkingMatePage from "@/features/WalkingMate";
import PowerUserRoute from "@/components/PowerUserRoute";
import BlacklistRoute from "@/components/BlacklistRoute";

const WalkingMate = () => {
  return (
    <PowerUserRoute>
      <BlacklistRoute>
        <WalkingMatePage />
      </BlacklistRoute>
    </PowerUserRoute>
  );
};

export default WalkingMate;
