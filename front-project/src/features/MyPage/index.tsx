import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";

import {
  MyPagePadding,
  MyPageStyled,
  MyPageRight,
  MyPageLeft,
  MyPageBottom,
} from "./styled";
// 게시물 카운트
import Mypostcount from "../../assets/Mypostcount";
// 강아지 프로필 부분
import PuppyProfile from "../../assets/PuppyProfile";
// 강아지 정보 등록
import PuppyForm from "../../components/PuppyForm";
// 내 정보 수정
import PersonForm from "../../components/PersonForm";
// 하단 게시물
import PostList from "../../components/PostList";
import AlertList from "../../components/AlertList";
// 강아지 정보 수정
import PuppyFormFix from "../../components/PuppyFormFix";

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
  followers: [];
  followings: [];
}
const MyPage = () => {
  const [isPuppyModalVisible, setIsPuppyModalVisible] = useState(false);
  const [isPersonModalVisible, setIsPersonModalVisible] = useState(false);
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
  const [dogs, setDogs] = useState<Puppy[]>([]);
  const [nickName, setNickName] = useState<string>("");

  // 알림 정보 읽음 처리
  const [hasUnread, setHasUnread] = useState(true);

  useEffect(() => {
    // 초기 상태 로드: 로컬스토리지에서 알림 상태를 가져오고
    const storedHasUnread = localStorage.getItem("hasUnread");

    if (storedHasUnread !== null) {
      setHasUnread(JSON.parse(storedHasUnread)); // 로컬스토리지에서 상태 설정
    }

    // 서버에서 알림 상태를 가져옵니다
    const fetchNotificationStatus = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/notifications/status`
        );
        const newHasUnread = response.data.hasUnread; // 서버에서 받아온 상태
        setHasUnread(newHasUnread); // 상태 업데이트
        localStorage.setItem("hasUnread", JSON.stringify(newHasUnread)); // 로컬스토리지에 저장
      } catch (error) {
        console.error("알림 상태 가져오기 실패", error);
      }
    };

    fetchNotificationStatus(); // 서버에서 알림 상태 가져오기
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const handleMarkAsRead = async () => {
    try {
      await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/notifications/read`
      );
      setHasUnread(false); // 읽음 처리 후 빨간 점 사라짐
      localStorage.setItem("hasUnread", JSON.stringify(false)); // 로컬스토리지에 상태 저장
    } catch (error) {
      console.error("알림 읽음 처리 실패", error);
    }
  };
  // 유저 아이디 가져오기
  const userId = user?.id;

  useEffect(() => {
    handleFetchData("posts");
  }, []);

  // 강아지 프로필 데이터 불러오기
  useEffect(() => {
    const fetchPuppyProfile = async () => {
      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/dogs/profile`
        );
        if (response.data.ok) {
          setPuppy(response.data.dog);
        } else {
          setPuppy(null);
        }
      } catch (error) {
        console.error("강아지 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchPuppyProfile();
  }, []);

  const titles = ["게시물", "팔로워", "팔로우"];
  const count = userData
    ? [userData.postCount, userData.followersCount, userData.followingCount]
    : [0, 0, 0];

  const MypageTitles = [
    { title: "작성한 게시물", icon: "fa-solid fa-border-all", type: "posts" },
    { title: "좋아요 한 게시물", icon: "fa-regular fa-heart", type: "liked" },
    { title: "알림 정보", icon: "fa-regular fa-bell", type: "notifications" },
  ];

  const handlePuppyEditClick = () => {
    setIsPuppyModalVisible(true);
  };
  const handlePersonEditClick = () => {
    setIsPersonModalVisible(true);
  };

  const handleClosePuppyModal = () => {
    setIsPuppyModalVisible(false);
  };

  const handleClosePersonModal = () => {
    setIsPersonModalVisible(false);
  };
  // 데이터 업데이트
  const updatePuppyData = (updatedPuppy: Puppy) => {
    setPuppy(updatedPuppy);
  };
  // 게시물 데이터 요청 함수
  const handleFetchData = async (type: string) => {
    setSelectedType(type);
    setLoading(true);
    setPage(1);
    setHasMore(true);
    setData(null);
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/mypage`,
        {
          params: {
            [`${type}Page`]: 1,
            limit: 9,
          },
        }
      );

      if (response.data.ok) {
        const result = response.data[type];
        setData(result.items);
        setHasMore(result.hasMore);
        setNickName(response.data.nickName);
        setDogs(response.data.dogs);
      }
    } catch (error) {
      console.error(`${type} 데이터를 가져오는 중 오류 발생:`, error);
    }
    setLoading(false);
  };
  // 왕관색 바꾸기
  const getCrownClass = (role?: string) => {
    switch (role) {
      case "power_year":
        return "crown-purple";
      case "admin":
        return "crown-red";
      case "power_month":
      default:
        return "crown-gold";
    }
  };

  // 무한스크롤
  const fetchInitialData = async (type: string) => {
    try {
      setLoading(true);

      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/mypage?type=${type}&page=1`
      );
      if (response.data.ok) {
        const result = response.data[type];
        setData(result);
        setHasMore(result.length > 0);
        setNickName(response.data.nickName);
        setDogs(response.data.dogs);
      }
    } catch (error) {
      console.error("초기 데이터 불러오기 오류:", error);
    } finally {
      setLoading(false);
    }
  };

  // 무한스크롤 추가
  const fetchMoreData = async () => {
    const nextPage = page + 1;

    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/mypage`,
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
        setNickName(response.data.nickName);
        setDogs(response.data.dogs);
      }
    } catch (error) {
      console.error("❌ 더 많은 데이터를 불러오는 중 오류:", error);
    }
  };
  // 감지
  useEffect(() => {
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
  }, [data, loading, hasMore]);

  // 처음 마이페이지 들어갔을 때 실행
  useEffect(() => {
    // 처음 페이지 로딩 시 게시물 데이터를 가져오기
    fetchInitialData("posts");

    // 페이지가 로드되면 observer 설정
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
  }, []);

  // 게시물, 팔로우, 팔로워 axios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get("/users/mypage", {
          params: {
            postsPage: 1,
            limit: 9,
            userId,
          },
        });

        const data = res.data;
        if (data.ok) {
          setUserData({
            email: user?.email || "",
            postCount: data.postCount || 0,
            followersCount: data.followerCount || 0,
            followingCount: data.followingCount || 0,
            puppy: data.dog,
            followers: data.followers || [],
            followings: data.followings || [],
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
  }, [userId]);

  return (
    <MyPagePadding>
      <MyPageStyled>
        <div className="MyPage_top_wrap">
          <MyPageLeft>
            <div className="MyPage_left_profileImg">
              <img
                src={
                  puppy?.image
                    ? `${process.env.NEXT_PUBLIC_API_URL}${puppy.image}`
                    : "/puppy_profile.png"
                }
                alt="profile img"
              ></img>
            </div>
          </MyPageLeft>
          <MyPageRight>
            <div className="MyPage_right_profile">
              {/* 이메일 프로필 편집 버튼 */}
              <div className="MyPage_right_namebtns">
                <div className="MyPage_profile_nickname">
                  {user ? user.nickName || user.email : "Guest"}

                  {/* 왕관 */}
                  {(user?.role === "power_month" ||
                    user?.role === "power_year" ||
                    user?.role === "admin") && (
                    <div className="MyPage_crown_wrap">
                      <i
                        className={`fa-solid fa-crown MyPage_crown ${getCrownClass(
                          user?.role
                        )}`}
                      ></i>
                      {(user?.role === "power_month" ||
                        user?.role === "power_year") &&
                        user?.power_expired_at && (
                          <div className="MyPage_crownText">
                            {user.role === "power_month" && (
                              <span className="MyPage_text-plan">
                                월간 이용권 이용 중입니다.
                              </span>
                            )}
                            {user.role === "power_year" && (
                              <span className="MyPage_text-plan">
                                연간 이용권 이용 중입니다.
                              </span>
                            )}
                            <br />
                            <span className="MyPage_text-expired">
                              만료일:{" "}
                              {new Date(
                                user.power_expired_at
                              ).toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </span>
                          </div>
                        )}
                    </div>
                  )}
                </div>

                <div className="MyPage_profile_editbtns">
                  <div
                    className="MyPage_profile_btns"
                    onClick={handlePersonEditClick}
                  >
                    프로필 편집
                  </div>
                  <div
                    className="MyPage_profile_btns"
                    onClick={handlePuppyEditClick}
                  >
                    강아지 프로필 편집
                  </div>
                </div>
              </div>
              {/* 게시물 팔로워 팔로우 */}
              <Mypostcount
                titles={titles}
                count={count}
                followers={userData?.followers || []}
                followings={userData?.followings || []}
              ></Mypostcount>
              {/* 강아지 정보 */}
              <PuppyProfile puppyprofile={puppy ? [puppy] : []} />
            </div>
          </MyPageRight>
        </div>
        {/* 하단 게시글 메뉴바 */}
        <MyPageBottom>
          <div className="MyPage_board_titles">
            {MypageTitles.map((item, index) => (
              <div
                key={index}
                className={`MyPage_board_item ${
                  selectedType === item.type ? "selected" : ""
                }`}
                onClick={() => {
                  handleFetchData(item.type);
                  if (item.title === "알림 정보") {
                    handleMarkAsRead();
                  }
                }}
              >
                <i className={item.icon}></i>
                {item.title}
                {item.title === "알림 정보" && hasUnread && (
                  <span className="MyPage_red-dot" />
                )}
              </div>
            ))}
          </div>
          {/* 하단 게시글, 좋아요, 알림 정보 */}
          <div>
            {selectedType === "notifications" ? (
              <AlertList data={data ?? []} />
            ) : (
              <PostList data={data ?? []} />
            )}
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
          {/* 강아지 정보 모달 */}
          {isPuppyModalVisible && (
            <div>
              {puppy ? (
                <PuppyFormFix
                  puppy={puppy}
                  closeModal={handleClosePuppyModal}
                  updatePuppyData={updatePuppyData}
                />
              ) : (
                <PuppyForm closeModal={handleClosePuppyModal} />
              )}
            </div>
          )}

          {/* 개인 정보 모달 */}
          <div>
            {isPersonModalVisible && (
              <div>
                <PersonForm closeModal={handleClosePersonModal} />
              </div>
            )}
          </div>
        </MyPageBottom>
      </MyPageStyled>
    </MyPagePadding>
  );
};

export default MyPage;
