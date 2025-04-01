import React, { useEffect, useState } from "react";
import { BoardWrapper, WeatherAlim } from "./styled";
import axios from "axios";
import weatherMessages from "@/constants/data";

const Board = () => {
  // 날씨 변수
  type WeatherKey = keyof typeof weatherMessages;
  const [weather, setWeather] = useState<WeatherKey | null>(null);
  // 날씨 아이콘 변수
  const [weatherIcon, setWeatherIcon] = useState(null);
  // 위험 날씨
  const dangerWeather: WeatherKey[] = [
    "Fog",
    "Smoke",
    "Dust",
    "Sand",
    "Ash",
    "Thunderstorm",
    "Squall",
    "Tornado",
  ];
  // dangerWeather 판단
  const isAlert = weather ? dangerWeather.includes(weather) : false;

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
          setWeather(res.data.weather_main);
          setWeatherIcon(res.data.icon);
        } catch (error) {
          console.error("날씨 요청 실패 :", error);
        }
      },
      (err) => {
        console.error("위치 접근 실패: ", err);
      }
    );
  }, []);

  // 날씨정보에 따른 메시지
  const weatherInfo = weather ? weatherMessages[weather] : null;

  return (
    <BoardWrapper>
      {weatherInfo === null ? (
        <WeatherAlim>날씨 정보를 불러오는 중입니다..</WeatherAlim>
      ) : (
        <WeatherAlim alert={isAlert}>
          <img
            src={`http://openweathermap.org/img/wn/${weatherIcon}.png
`}
            alt="Today's Weather"
          />
          <div>
            <span>오늘의 날씨: </span>
            <span>{weatherInfo.message}</span>
          </div>
        </WeatherAlim>
      )}
    </BoardWrapper>
  );
};

export default Board;
