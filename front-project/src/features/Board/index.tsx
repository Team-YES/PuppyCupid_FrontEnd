import React, { useEffect, useState } from "react";
import { WeatherWrapper, WeatherAlim, AllPostsWrap } from "./styled";
import axios from "axios";
import weatherMessages from "@/constants/weatherData";
import PostComp from "@/components/Post";
import Search from "@/components/Search";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPosts } from "@/reducers/getAllPostsSlice";
import { AppDispatch, RootState } from "@/store/store";
import DetailPost from "@/components/DetailPost";
import { useRouter } from "next/router";

// Props 타입 선언
export type Post = {
  id: number;
  title: string;
  category: string;
  like_count: number;
  liked: boolean;
  content: string;
  currentUser: number;
  created_at: string;
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
  // 1. 타입 선언
  type WeatherKey = keyof typeof weatherMessages;

  // 2. 상태 정의
  // 전체게시물
  const [posts, setPosts] = useState<Post[]>([]);
  // 현재 로그인한 유저
  const [loginUser, setLoginUser] = useState<CurrentUser | null>(null);
  // 검색된 게시물
  const [searchResult, setSearchResult] = useState<Post[]>([]);
  // 날씨
  const [weather, setWeather] = useState<WeatherKey | null>(null);
  const [weatherIcon, setWeatherIcon] = useState(null);

  const dispatch = useDispatch<AppDispatch>();

  // 3. 데이터 가져오기
  const data = useSelector((state: RootState) => state.posts.posts);
  const dataUser = useSelector((state: RootState) => state.posts.currentUser);

  // 4. 위험 날씨 판단용 상수
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
  const isAlert = weather ? dangerWeather.includes(weather) : false;

  // console.log("검색결과: ", searchResult);
  // console.log("상위컴포", posts);
  // console.log("로그인유저", loginUser);

  // 5. 전체 게시글 요청
  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  // 6. Redux 데이터 -> 로컬 상태로 저장
  useEffect(() => {
    if (data.length > 0) setPosts(data);
    if (dataUser) setLoginUser(dataUser);
  }, [data, dataUser]);

  // 7. 날씨 정보 요청
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

  // 8. 날씨 메시지 매핑
  const weatherInfo = weather ? weatherMessages[weather] : null;

  // 9. 상세 페이지 이동
  const router = useRouter();
  const [selectPost, setSelectPost] = useState<number | null>(null);

  useEffect(() => {
    console.log(router.query.id);
    if (router.query.id) {
      setSelectPost(Number(router.query.id));
    } else {
      setSelectPost(null);
    }
  }, [router.query.id]);

  // 게시글 클릭 시 주소 변경
  const handlePostClick = (postId: number) => {
    router.push(
      {
        pathname: "/board",
        query: { id: postId },
      },
      `/post_detail/${postId}`, // 브라우저 주소에만 표시할 경로
      { shallow: true }
    );
  };

  // 모달 닫기
  const handleCloseModal = () => {
    router.push("/board", undefined, { shallow: true });
  };

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

      {/* 검색 기능 */}
      <div style={{ position: "relative" }}>
        <Search setSearchResult={setSearchResult} />
      </div>

      {/* 전체 게시글 */}
      <AllPostsWrap>
        {(searchResult.length > 0 ? searchResult : posts).map((post, i) => (
          <div key={post.id} onClick={() => handlePostClick(post.id)}>
            <PostComp
              key={i}
              post={post}
              loginUser={loginUser?.id}
              isDetailPage={false}
            />
          </div>
        ))}
      </AllPostsWrap>
      {selectPost && (
        <DetailPost postId={selectPost} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Board;
