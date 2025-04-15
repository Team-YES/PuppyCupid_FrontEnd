import React, { useState } from "react";
import { MainImgsPadding, MainImgsWrapper } from "./styled";
import { useRouter } from "next/router";
import Matches from "../../components/Matches";
// 파워 유저만 이용 가능
// import PowerUserRoute from "@/components/PowerUserRoute";
// import BlacklistRoute from "../BlacklistRoute";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { UserInfo } from "@/reducers/userSlice";

interface MainImgsProps {
  titles: string[];
  images: string[];
  paths: string[];
}

const MainImgs = ({ titles, images, paths }: MainImgsProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [matches, setMatches] = useState(false);
  const router = useRouter();
  // 로그인 한 유저 정보
  const user = useSelector(
    (state: RootState) => state.user.user
  ) as UserInfo | null;

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  const handleMatchesModal = (user: UserInfo | null) => {
    if (!user) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    const isPowerUser = user.role === "power_year" || "power_month";

    // 파워 유저만 이용 가능
    if (!isPowerUser) {
      alert("파워 유저만 이용 가능합니다.");
      return;
    }

    // 블랙리스트 여부 확인 (role이 'blacklisted'면 접근 불가)
    if (user.role === "blacklist") {
      alert("접근이 제한되어 이용하실 수 없습니다.");
      return;
    }
    setMatches((prev) => !prev);
  };

  return (
    <MainImgsPadding>
      <MainImgsWrapper>
        <div
          className={`MainImgs_AllWrap ${isClicked ? "clicked" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {titles.map((title, index) => (
            <div
              key={index}
              className="MainImgs_card"
              onClick={() => handleCardClick(paths[index])}
            >
              <div className="MainImgs_title">{title}</div>
              <div className="MainImgs_card_imgbox">
                <img src={images[index]} alt={title} />
              </div>
            </div>
          ))}
        </div>
        <div
          className="MainImgs_puppy"
          onClick={() => {
            handleMatchesModal(user);
          }}
        >
          {/* 파워 유저만 클릭 가능 */}
          <div className="MainImgs_puppy_walk">
            <div className="MainImgs_AI_Wrap">MBTI 매칭 이용해보기</div>
            <img src="/hello_puppy.gif"></img>
          </div>
        </div>
        {matches && <Matches setMatches={setMatches} />}
      </MainImgsWrapper>
    </MainImgsPadding>
  );
};

export default MainImgs;
