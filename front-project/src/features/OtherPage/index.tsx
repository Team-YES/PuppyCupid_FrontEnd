import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useRouter } from "next/router";
import axios from "axios";
import {
  OtherPagePadding,
  OtherPageStyled,
  OtherPageRight,
  OtherPageLeft,
  OtherPageBottom,
} from "./styled";
import Otherpostcount from "../../assets/Otherpostcount";
import PuppyProfile from "../../assets/PuppyProfile";
import PostList from "../../components/PostList";

// 쿠키 토큰 재발급 해보기
import axiosInstance from "@/lib/axios";

interface Puppy {
  name: string;
  breed: string;
  personality: string;
  age: string;
  mbti: string;
  gender: string;
  image: string;
  id: string;
  dog_image: string;
}
interface PostData {
  id: number;
  title: string;
  content: string;
  like_count: number;
  commentCount: number;
  main_image_url: string;
}

interface UserData {
  email: string;
  postCount: number;
  followersCount: number;
  followingCount: number;
  puppy: Puppy;
}
const OtherPage = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [puppy, setPuppy] = useState<Puppy | null>(null);
  const [data, setData] = useState<PostData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("posts");
  const user = useSelector((state: RootState) => state.user.user);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastPostElementRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const [dogs, setDogs] = useState<Puppy[]>([]);
  const [nickName, setNickName] = useState<string>("");
  const [isSending, setIsSending] = useState(false);

  const { id: otherUserId } = router.query;
  // 유저 아이디 가져오기
  useEffect(() => {
    if (!router.isReady || !otherUserId) return;
    handleFetchData("posts");
  }, [router.isReady, otherUserId]);

  const titles = ["게시물", "팔로워", "팔로우"];
  const count = userData
    ? [userData.postCount, userData.followersCount, userData.followingCount]
    : [0, 0, 0];

  const MypageTitles = [
    { title: "게시물", icon: "fa-solid fa-border-all", type: "posts" },
  ];

  // 데이터 업데이트
  const updatePuppyData = (updatedPuppy: Puppy) => {
    setPuppy(updatedPuppy);
  };

  // 게시물 데이터 요청 함수
  const handleFetchData = async (type: string) => {
    if (!router.isReady || !otherUserId) return;
    setSelectedType(type);
    setLoading(true);
    setPage(1);
    setHasMore(true);
    setData(null);
    try {
      const response = await axiosInstance.get(
        `http://localhost:5000/users/otherpage/${otherUserId}`,
        {
          params: {
            [`${type}Page`]: 1,
            limit: 9,
          },
        }
      );

      if (response.data.ok) {
        const result = response.data[type];
        setNickName(response.data.nickName);
        setData(result.items);
        setHasMore(result.hasMore);
        setDogs(response.data.dogs);
      }
    } catch (error) {
      console.error(`${type} 데이터를 가져오는 중 오류 발생:`, error);
    }
    setLoading(false);
  };

  // 무한스크롤
  // const fetchInitialData = async (type: string) => {
  //   if (!router.isReady || !otherUserId) return;
  //   try {
  //     setLoading(true);

  //     const response = await axiosInstance.get(
  //       `http://localhost:5000/users/otherpage/${otherUserId}?type=${type}&page=1`
  //     );
  //     if (response.data.ok) {
  //       const result = response.data[type];
  //       setData(result);
  //       setHasMore(result.length > 0);
  //     }
  //   } catch (error) {
  //     console.error("초기 데이터 불러오기 오류:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  // 무한스크롤 추가
  const fetchMoreData = async () => {
    if (!router.isReady || !otherUserId) return;
    const nextPage = page + 1;

    try {
      const response = await axiosInstance.get(
        `http://localhost:5000/users/otherpage/${otherUserId}`,
        {
          params: {
            [`${selectedType}Page`]: nextPage,
            limit: 9,
          },
        }
      );

      if (response.data.ok) {
        const result = response.data[selectedType];

        setData((prevData) =>
          prevData ? [...prevData, ...result.items] : result.items
        );
        setHasMore(result.hasMore);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("❌ 더 많은 데이터를 불러오는 중 오류:", error);
    }
  };

  // 감지
  useEffect(() => {
    if (!router.isReady || !otherUserId) return;
    const target = lastPostElementRef.current;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (hasMore && !loading) {
            fetchMoreData();
          }
        }
      },
      {
        threshold: 1.0,
      }
    );

    if (target) observer.current.observe(target);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [data, loading, hasMore, page]);

  // 처음 마이페이지 들어갔을 때 실행
  // useEffect(() => {
  //   if (!router.isReady || !otherUserId) return;
  //   // 처음 페이지 로딩 시 게시물 데이터를 가져오기
  //   fetchInitialData("posts");

  //   // 페이지가 로드되면 observer 설정
  //   const target = lastPostElementRef.current;
  //   if (observer.current) observer.current.disconnect();

  //   observer.current = new IntersectionObserver(
  //     (entries) => {
  //       if (entries[0].isIntersecting) {
  //         if (hasMore && !loading) {
  //           fetchMoreData();
  //         }
  //       }
  //     },
  //     {
  //       threshold: 1.0,
  //     }
  //   );

  //   if (target) observer.current.observe(target);

  //   return () => {
  //     if (observer.current) observer.current.disconnect();
  //   };
  // }, []);

  // 게시물, 팔로우, 팔로워 axios
  useEffect(() => {
    if (!router.isReady || !otherUserId) return;
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(
          `http://localhost:5000/users/otherpage/${otherUserId}`,
          {
            params: {
              postsPage: 1,
              limit: 9,
              otherUserId,
            },
          }
        );
        const data = res.data;
        if (data.ok) {
          setUserData({
            email: user?.email || "",
            postCount: data.postCount || 0,
            followersCount: data.followerCount || 0,
            followingCount: data.followingCount || 0,
            puppy: data.dog,
          });

          if (data.dogs && Array.isArray(data.dogs)) {
            setDogs(data.dogs);
          }
        } else {
          console.error("유저 정보 오류:", data.error);
        }
      } catch (err) {
        console.error("유저 페이지 데이터 가져오기 실패:", err);
      }
    };
    fetchData();
  }, [otherUserId]);

  // 채팅하기로 이동 (메시지 보내기)
  const handleChatRequest = async () => {
    if (!otherUserId || isSending) return;
    setIsSending(true);

    try {
      const res = await axiosInstance.post(
        "http://localhost:5000/messages",
        {
          receiverId: Number(otherUserId),
          content: "채팅 신청합니다!",
        },
        {
          withCredentials: true,
        }
      );

      // 채팅방으로 이동
      router.push(`/chat?receiverId=${otherUserId}`);
    } catch (error) {
      alert("채팅 요청에 실패했습니다.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <OtherPagePadding>
      <OtherPageStyled>
        <div className="OtherPage_top_wrap">
          <OtherPageLeft>
            <div className="OtherPage_left_profileImg">
              <img
                src={
                  dogs.length > 0 && dogs[0].dog_image
                    ? `http://localhost:5000${dogs[0].dog_image}`
                    : "/puppy_profile.png"
                }
                alt="profile img"
              ></img>
            </div>
          </OtherPageLeft>
          <OtherPageRight>
            <div className="OtherPage_right_profile">
              {/* 팔로우 메시지 버튼 */}
              <div className="OtherPage_right_namebtns">
                <div className="OtherPage_profile_nickname">
                  {nickName ? nickName : "Guest"}
                </div>

                <div className="OtherPage_profile_editbtns">
                  {Number(otherUserId) !== user?.id && (
                    <div className="OtherPage_profile_editbtns">
                      <div className="OtherPage_profile_btns">팔로우</div>
                      <div
                        className="OtherPage_profile_btns"
                        onClick={handleChatRequest}
                      >
                        메시지 보내기
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {/* 게시물 팔로워 팔로우 */}
              <Otherpostcount titles={titles} count={count}></Otherpostcount>
              {/* 강아지 정보 */}
              <PuppyProfile puppyprofile={dogs ? dogs : []} />
            </div>
          </OtherPageRight>
        </div>
        {/* 하단 게시글 메뉴바 */}
        <OtherPageBottom>
          <div className="OtherPage_board_titles">
            {MypageTitles.map((item, index) => (
              <div
                key={index}
                className={`OtherPage_board_item ${
                  selectedType === item.type ? "selected" : ""
                }`}
                onClick={() => handleFetchData(item.type)}
              >
                <i className={item.icon}></i>
                {item.title}
              </div>
            ))}
          </div>
          {/* 하단 게시글, 좋아요, 알림 정보 */}
          <div>
            <PostList data={data ?? []} />
            {/* 무한스크롤 감지 */}
            {hasMore && (
              <div
                ref={lastPostElementRef}
                style={{
                  height: "100px",
                  textAlign: "center",
                  lineHeight: "100px",
                }}
              ></div>
            )}
          </div>
        </OtherPageBottom>
      </OtherPageStyled>
    </OtherPagePadding>
  );
};

export default OtherPage;
