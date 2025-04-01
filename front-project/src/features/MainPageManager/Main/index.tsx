import { MainStyled } from "./styled";
import { clsx } from "clsx";
import { useState } from "react";
import { useRouter } from "next/router";

import MainImgs from "../../../components/MainImgs";

const titles = [
  "산책메이트",
  "전체 게시물 보기",
  "게시물 작성하기",
  "결제 안내 ",
  "채팅하기",
  "내 정보 보기",
];
const images = [
  "mainImg1.gif",
  "mainImg2.webp",
  "mainImg3.webp",
  "mainImg4.webp",
  "mainImg5.jpg",
  "mainImg6.jpg",
];

const paths = [
  "/walkingmate",
  "/board",
  "/login",
  "/payment",
  "/chat",
  "/mypage",
];
const Main = () => {
  return (
    <MainStyled className={clsx("main_wrap")}>
      {/* <div className="main_weather">오늘은 날씨가 쌀쌀해요!(예시)</div> */}
      <MainImgs titles={titles} images={images} paths={paths} />
    </MainStyled>
  );
};
export default Main;
