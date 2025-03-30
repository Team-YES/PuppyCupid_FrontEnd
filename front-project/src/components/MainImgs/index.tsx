import React from "react";
import { MainImgsPadding, MainImgsWrapper } from "./styled";

interface MainImgsProps {
  titles: string[];
  images: string[];
}

const MainImgs = ({ titles, images }: MainImgsProps) => {
  return (
    <MainImgsPadding>
      <MainImgsWrapper>
        <div className="MainImgs_AllWrap">
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
