import React, { useEffect, useRef, useState } from "react";
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

  // 무한 스크롤
  // const { posts: data, currentUser: dataUser, hasMore, loading } = useSelector(
  //   (state: RootState) => state.posts
  // );

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
  console.log("상위컴포", posts);
  // console.log("로그인유저", loginUser);

  // 5. 전체 게시글 요청(무한스크롤 전)
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
  const [selectPostId, setSelectPostId] = useState<number | null>(null);
  const [selectPost, setSelectPost] = useState(false);

  // console.log(selectPostId);

  // 게시글 클릭 시 상세 모달 띄우기
  const handlePostClick = (postId: number) => {
    setSelectPostId(postId);
  };

  // 모달 닫기
  const handleCloseModal = () => {
    setSelectPostId(null);
  };

  // 현재 선택된 게시글
  const selectedPost = posts.find((p) => p.id === selectPostId);

  console.log("현재 선택된게시글", selectedPost);
  console.log("dataUser : ", dataUser);

  // 10. 무한 스크롤
  // const [page, setPage] = useState(1);
  // const limit = 2; // 테스트는 1개씩
  // const observerTargetRef = useRef<HTMLDivElement | null>(null);

  // 첫 데이터 호출
  // useEffect(() => {
  //   dispatch(fetchPostsByPage({ page, limit }));
  // }, [dispatch, page]);
  // // IntersectionObserver 호출
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         console.log("보임 → 페이지 증가");
  //         setPage((prev) => prev + 1);
  //       }
  //     },
  //     {
  //       threshold: 1.0,
  //     }
  //   );

  //   const target = observerTargetRef.current;
  //   if (target) observer.observe(target);

  //   return () => {
  //     if (target) observer.unobserve(target);
  //   };
  // }, []);

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
              onClick={() => handlePostClick(post.id)}
            />
          </div>
        ))}
        {/* 무한스크롤 감시 대상 (페이지 끝) */}
        {/* <div ref={observerTargetRef} style={{ height: 1 }} /> */}
      </AllPostsWrap>

      {/* 상세 게시글 */}
      {selectedPost && (
        <DetailPost
          post={selectedPost}
          loginUser={loginUser?.id}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Board;
