import WalkingMatePage from "@/features/WalkingMate";
import PowerUserRoute from "@/components/PowerUserRoute";
import BlacklistRoute from "@/components/BlacklistRoute";

const WalkingMate = () => {
  return (
    <BlacklistRoute>
      <PowerUserRoute>
        <WalkingMatePage />
      </PowerUserRoute>
    </BlacklistRoute>
  );
};

export default WalkingMate;
