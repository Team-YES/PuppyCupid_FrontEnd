import { WalkingMateStyled } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  distance: number; // km 단위
}

const WalkingMate = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await axios.post("http://localhost:5000/users/nearby", {
          latitude,
          longitude,
        });
        setUsers(res.data);
      });
    }
  }, []);
  return (
    <WalkingMateStyled>
      <div>
        <h1>📍 주변 사용자</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} - {user.distance.toFixed(1)}km 떨어져 있음
            </li>
          ))}
        </ul>
      </div>
    </WalkingMateStyled>
  );
};

export default WalkingMate;
