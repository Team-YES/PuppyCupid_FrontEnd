import React, { useEffect, useState } from "react";
import { WeatherWrapper, WeatherAlim, AllPostsWrap } from "./styled";
import axios from "axios";
import weatherMessages from "@/constants/weatherData";
import PostComp from "@/components/Post";
import Search from "@/components/Search";

// Props 타입 선언
export type Post = {
  id: number;
  title: string;
  category: string;
  like_count: number;
  liked: boolean;
  content: string;
  currentUser: number;
  user: {
    id: number;
    nickName: string;
  };
  images: { image_url: string; id: number }[];
};

export type CurrentUser = {
  id: number;
};

const Board = () => {
  // 전체게시물 저장
  const [posts, setPosts] = useState<Post[]>([]);
  // 현재 로그인한 유저의 아이디
  const [loginUser, setLoginUser] = useState<CurrentUser | null>(null);
  // 검색된 포스트 저장
  const [searchResult, setSearchResult] = useState<Post[]>([]);

  console.log("검색결과: ", searchResult);

  // console.log("상위컴포", posts);
  // console.log("로그인유저", loginUser);

  // 전체게시물 받아오기
  useEffect(() => {
    axios
      .get("http://localhost:5000/posts", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log("전체 게시물 데이터", res.data);
        const { posts, currentUser } = res.data;
        setPosts(posts);
        setLoginUser(currentUser);
      })
      .catch((err) => console.error(err));
  }, []);

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
        // console.log("위도: ", lat, " 경도: ", lon);

        try {
          const res = await axios.get("http://localhost:5000/weather", {
            params: {
              lat,
              lon,
            },
          });
          // console.log("백엔드 응답:", res.data);
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
    <div>
      {/* 날씨정보 */}
      <WeatherWrapper>
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
      </WeatherWrapper>
      <div style={{ position: "relative" }}>
        {/* 검색 기능 */}
        <Search setSearchResult={setSearchResult} />
      </div>
      <AllPostsWrap>
        {/* 전체 게시글 */}
        {(searchResult.length > 0 ? searchResult : posts).map((post, i) => (
          <PostComp key={i} post={post} loginUser={loginUser?.id} />
        ))}
      </AllPostsWrap>
    </div>
  );
};

export default Board;
