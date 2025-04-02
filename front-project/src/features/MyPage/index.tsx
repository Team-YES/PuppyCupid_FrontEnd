import React, { useState } from "react";
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

interface Puppy {
  name: string;
  breed: string;
  personality: string;
  mbti: string;
}

const MyPage = () => {
  const [isPuppyModalVisible, setIsPuppyModalVisible] = useState(false);
  const [isPersonModalVisible, setIsPersonModalVisible] = useState(false);

  const titles = ["게시물", "팔로워", "팔로우"];
  const count = [10, 5, 20]; //(임시 : 서버에 요청해서 가져올 것)
  const puppies: Puppy[] = [
    {
      name: "바둑이",
      breed: "골든 리트리버",
      personality: "활발함",
      mbti: "ENTP",
    },
  ]; //(임시 : 서버에 요청해서 가져올 것)

  const MypageTitles = [
    { title: "작성한 게시물", icon: "fa-solid fa-border-all" },
    { title: "좋아요 한 게시물", icon: "fa-regular fa-heart" },
    { title: "알림 정보", icon: "fa-regular fa-bell" },
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

  return (
    <MyPagePadding>
      <MyPageStyled>
        <div className="MyPage_top_wrap">
          <MyPageLeft>
            <div className="MyPage_left_profileImg">
              <img src="/puppy_profile.png" alt="profile img"></img>
            </div>
          </MyPageLeft>
          <MyPageRight>
            <div className="MyPage_right_profile">
              {/* 이메일 프로필 편집 버튼 */}
              <div className="MyPage_right_namebtns">
                <div className="MyPage_profile_nickname">
                  이메일 or nickname
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
              <PuppyProfile puppyprofile={puppies} />
            </div>
          </MyPageRight>
        </div>
        {/* 하단 게시글 모음 */}
        <MyPageBottom>
          <div className="MyPage_board_titles">
            {MypageTitles.map((item, index) => (
              <div key={index} className="MyPage_board_item">
                <i className={item.icon}></i>
                {item.title}
              </div>
            ))}
          </div>
          {/* 강아지 정보 모달 */}
          <div>
            {isPuppyModalVisible && (
              <div>
                <PuppyForm closeModal={handleClosePuppyModal} />
              </div>
            )}
          </div>
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
