import React, { useEffect, useState } from "react";
import { BoardWrapper } from "./styled";
import axios from "axios";

const Board = () => {
  // 날씨 변수
  const [weather, setWeather] = useState(null);

  // 날씨 api 요청
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude; // 위도
        const lon = pos.coords.longitude; // 경도
        console.log("위도: ", lat, " 경도: ", lon);

        try {
          const res = await axios.get("http://localhost:5000/weather", {
            params: {
              lat,
              lon,
            },
          });
          console.log("백엔드 응답:", res.data);
        } catch (error) {
          console.error("날씨 요청 실패 :", error);
        }
      },
      (err) => {
        console.error("위치 접근 실패: ", err);
      }
    );
  }, []);

  return (
    <BoardWrapper>
      <div></div>
    </BoardWrapper>
  );
};

export default Board;
