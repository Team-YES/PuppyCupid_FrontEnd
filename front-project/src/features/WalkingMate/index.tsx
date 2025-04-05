import { WalkingMateStyled } from "./styled";
import { useEffect, useState } from "react";
import axios from "axios";

interface Dog {
  id: number;
  name: string;
  distance: number; // km 단위
}

const WalkingMate = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const dogId = 1; // 임시로 설정 — 실제로는 props나 전역 상태에서 받아와야 해
  const token = localStorage.getItem("accessToken"); // JWT 토큰 가져오기

  useEffect(() => {
    if (navigator.geolocation && token) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await axios.post(
            `http://localhost:5000/dogs/${dogId}/location`,
            { latitude, longitude },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.ok) {
            setDogs(res.data.dogs);
          }
        } catch (err) {
          console.error("위치 전송 실패:", err);
        }
      });
    }
  }, []);

  return (
    <WalkingMateStyled>
      <div>
        <h1>📍 주변 강아지</h1>
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>
              {dog.name} - {dog.distance.toFixed(1)}km 떨어져 있음
            </li>
          ))}
        </ul>
      </div>
    </WalkingMateStyled>
  );
};

export default WalkingMate;
