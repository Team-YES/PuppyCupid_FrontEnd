import React, { useState } from "react";
import { MainImgsPadding, MainImgsWrapper } from "./styled";
import { useRouter } from "next/router";
interface MainImgsProps {
  titles: string[];
  images: string[];
  paths: string[];
}

const MainImgs = ({ titles, images, paths }: MainImgsProps) => {
  const [isClicked, setIsClicked] = useState(false);
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
        <div className="MainImgs_puppy">
          <img src="/hello_puppy.gif"></img>
        </div>
      </MainImgsWrapper>
    </MainImgsPadding>
  );
};

export default MainImgs;
