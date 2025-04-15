import React, { useState } from "react";
import { MainImgsPadding, MainImgsWrapper } from "./styled";
import { useRouter } from "next/router";
import Matches from "../../components/Matches";
// 파워 유저만 이용 가능
import PowerUserRoute from "@/components/PowerUserRoute";

interface MainImgsProps {
  titles: string[];
  images: string[];
  paths: string[];
}

const MainImgs = ({ titles, images, paths }: MainImgsProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [matches, setMatches] = useState(false);
  const router = useRouter();

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const handleCardClick = (path: string) => {
    router.push(path);
  };

  const handleMatchesModal = () => {
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
            handleMatchesModal();
          }}
        >
          {/* 파워 유저만 클릭 가능 */}
          <PowerUserRoute>
            <div className="MainImgs_puppy_walk">
              <div className="MainImgs_AI_Wrap">MBTI 매칭 이용해보기</div>
              <img src="/hello_puppy.gif"></img>
            </div>
          </PowerUserRoute>
        </div>
        {matches && <Matches setMatches={setMatches} />}
      </MainImgsWrapper>
    </MainImgsPadding>
  );
};

export default MainImgs;
