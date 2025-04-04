import React, { useState, useEffect } from "react";
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
import Mypostcount from "../../assets/Mypostcount";
import PuppyProfile from "../../assets/PuppyProfile";
import PuppyForm from "../../components/PuppyForm";
import PersonForm from "../../components/PersonForm";
import PostList from "../../components/PostList";
import PuppyFormFix from "../../components/PuppyFormFix";

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
  comments: number;
  main_image_url: string;
}

interface UserData {
  email: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  puppy: Puppy;
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

  useEffect(() => {
    handleFetchData("posts");
  }, []);

  // 강아지 프로필 데이터 불러오기
  useEffect(() => {
    const fetchPuppyProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/dogs/profile", {
          withCredentials: true,
        });
        if (response.data.ok) {
          console.log(response.data.dog, "dog");
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
  const count = [10, 5, 20]; //(임시 : 서버에 요청해서 가져올 것)

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
    try {
      const response = await axios.get("http://localhost:5000/users/mypage", {
        withCredentials: true,
      });

      if (response.data.ok) {
        const { posts, liked, notifications } = response.data;

        if (type === "posts") setData(posts);
        else if (type === "liked") setData(liked);
        else if (type === "notifications") setData(notifications);
      }
    } catch (error) {
      console.error(`${type} 데이터를 가져오는 중 오류 발생:`, error);
    }
    setLoading(false);
  };

  return (
    <MyPagePadding>
      <MyPageStyled>
        <div className="MyPage_top_wrap">
          <MyPageLeft>
            <div className="MyPage_left_profileImg">
              <img
                src={
                  puppy?.image
                    ? `http://localhost:5000${puppy.image}`
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
              <Mypostcount titles={titles} count={count}></Mypostcount>
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
                onClick={() => handleFetchData(item.type)}
              >
                <i className={item.icon}></i>
                {item.title}
              </div>
            ))}
          </div>
          {/* 하단 게시글, 좋아요, 알림 정보 */}
          <div>
            <PostList data={data} />
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
