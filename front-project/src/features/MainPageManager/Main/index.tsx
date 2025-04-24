import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import { MainStyled } from "./styled";
import { clsx } from "clsx";

import MainImgs from "../../../components/MainImgs";
// 이벤트 팝업
import EventPopup from "@/components/EventPopup";

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
  "/post_registration",
  "/payment",
  "/chat",
  "/mypage",
];

const Main = () => {
  const router = useRouter();
  const [isTokenProcessed, setIsTokenProcessed] = useState(false);

  useEffect(() => {
    if (router.isReady && !isTokenProcessed) {
      const { access_token, refresh_token } = router.query;

      if (
        typeof access_token === "string" &&
        typeof refresh_token === "string"
      ) {
        Cookies.set("access_token", access_token);
        Cookies.set("refresh_token", refresh_token);
        setIsTokenProcessed(true);
        router.replace("/", undefined, { shallow: true });
      }
    }
  }, [router.isReady, router.query, isTokenProcessed]);

  return (
    <MainStyled className={clsx("main_wrap")}>
      <EventPopup />
      <MainImgs titles={titles} images={images} paths={paths} />
    </MainStyled>
  );
};
export default Main;
