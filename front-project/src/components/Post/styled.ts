import styled, { keyframes } from "styled-components";

type Props = {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
};

export const PostStyled = styled.div`
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  width: 100%;
  display: flex;
  margin-bottom: 48px;
  border-radius: 4px;

  @media (max-width: 632px) {
    display: block;
    border-radius: 10px;
  }
`;

export const PostIcon = styled.i`
  font-size: 20px;
  color: #333;
  margin-right: 15px;
  cursor: pointer;
`;

export const LikeCont = styled.div`
  font-weight: 700;
`;

export const PostContent = styled.div`
  padding: 15px;
  flex: 1;
  position: relative;

  @media (max-width: 632px) {
    padding: 15px 15px 30px 15px;
  }

  .Post_ClampText {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 23px;
    max-height: 46px;
  }

  .Post_more {
    position: absolute;
    color: #aaa;
    font-size: 12px;
    margin-top: 5px;

    right: 17px;

    @media (max-width: 632px) {
      bottom: 10px;
    }
  }
`;

export const DateDiv = styled.div`
  color: rgb(115, 115, 115);
  letter-spacing: 0.2px;
  line-height: 26px;
  font-size: 12px;
  margin-bottom: 4px;
`;

export const LeftContainer = styled.div`
  width: 50%;

  .swiper-slide {
    display: flex;
    /* flex-direction: column; */
    /* justify-content: center; */
    align-items: center;
    background-color: black;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    min-height: 463px;
    overflow: hidden;
    flex-grow: 1;

    @media (max-width: 632px) {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      border-bottom-left-radius: 0px;
      min-height: auto;
      justify-content: center;
    }
  }

  .Post_SwiperBox {
    /* width: 100%;
    height: 100%; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 463px;
    max-width: 463px;
    aspect-ratio: 1 / 1;
    flex-basis: 463px;
    /* min-height: 283px; */
    overflow: hidden;

    @media (max-width: 632px) {
      flex-basis: auto;
      /* aspect-ratio: auto; */
      max-height: 400px;
      width: 100%;
    }
  }

  .Post_swiperImg {
    width: 100%;
    /* height: 100%; */
    object-fit: cover;
  }

  @media (max-width: 632px) {
    width: 100%;
    height: 100%;
    /* max-height: 400px; */
  }
`;

export const RightContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;

  .Post_RightBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 8px 15px;
    border-bottom: 1px solid rgb(239, 239, 239);
  }

  .Post_RightBox_userInfo {
    display: flex;
    align-items: center;
  }

  .Post_ImgBox {
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    border: 2px solid #9855f380;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    cursor: pointer;
    width: 53px;
  }

  .Post_Img {
    border: 1px #ddd solid;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 45px;
  }

  .Post_user {
    margin-left: 12px;
  }

  .Post_nickName {
    margin-bottom: 3px;
    font-weight: 700;
  }

  .Post_category {
    font-size: 12px;
  }

  .Post_menu {
    margin-right: 10px;
    cursor: pointer;
    color: #333;
  }

  .Post_iconContainer {
    display: flex;
    padding: 13px 15px;
    border-top: 1px solid rgb(239, 239, 239);
  }

  .Post_content {
    padding: 0 15px;
  }

  @media (max-width: 632px) {
    width: 100%;
  }
`;

// 좋아요 애니메이션
const pop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1);
  }
`;

export const LikeIcon = styled.i.withConfig({
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>`
  color: ${(props) => (props.className?.includes("fa-heart") ? "red" : "#333")};
  animation: ${(props) => (props.animate ? pop : "none")} 0.3s ease;
  transition: color 0.2s ease;
  font-size: 20px;
  cursor: pointer;
  margin-right: 15px;
`;
