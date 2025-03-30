import React, { useState } from "react";
import { MainImgsPadding, MainImgsWrapper } from "./styled";

interface MainImgsProps {
  titles: string[];
  images: string[];
}

const MainImgs = ({ titles, images }: MainImgsProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
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
            <div key={index} className="MainImgs_card">
              <div className="MainImgs_title">{title}</div>
              <div className="MainImgs_card_imgbox">
                <img src={images[index]} alt={title} />
              </div>
            </div>
          ))}
        </div>
      </MainImgsWrapper>
    </MainImgsPadding>
  );
};

export default MainImgs;
