import styled, { keyframes } from "styled-components";

export const DetailPostStyled = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 9999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  .Detail_XMark {
    position: fixed;
    right: 20px;
    top: 20px;
    font-size: 26px;
    color: #fff;
    cursor: pointer;
  }

  @media (max-width: 632px) {
    font-size: 14px;
  }

  @media (max-width: 400px) {
    font-size: 13px;
  }
`;

export const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 1350px;
  width: 100%;
  height: 100%;
  max-height: 90vh;
  align-items: center;
`;

export const DetailPostBox = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  max-width: calc(100% - 64px - 64px);
  background-color: #f9f9f9;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
  /* aspect-ratio: 1 / 1; */

  @media (max-width: 632px) {
    /* width: 100%; */
    /* height: 89%; */
    max-width: 77%;
    display: block;
    border-radius: 10px;
    /* overflow: hidden; */
    max-height: 80vh;
  }
`;

export const Detail_LeftContainer = styled.div`
  width: 53%;
  display: flex;
  align-items: center;

  .Detail_LeftContainer_div {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    background-color: black;
  }
  @media (max-width: 632px) {
    width: 100%;
    /* height: 100%; */
  }

  .swiper-slide {
    display: flex;
    /* flex-direction: column; */
    /* justify-content: center; */
    align-items: center;
    background-color: black;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    /* min-height: 820px; */
    overflow: hidden;
    flex-grow: 1;
    height: 100%;

    @media (max-width: 632px) {
      border-top-right-radius: 4px;
      border-bottom-left-radius: 0px;
      min-height: 307px;
      justify-content: center;
    }

    @media (max-width: 400px) {
      min-height: 249px;
    }
  }

  .Post_SwiperBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
    /* max-height: 463px;
    max-width: 463px;
    aspect-ratio: 1 / 1;
    flex-basis: 463px;
    overflow: hidden; */

    @media (max-width: 632px) {
      flex-basis: auto;
      max-height: 0;
      width: 100%;
    }
  }

  .Post_swiperImg {
    width: 100%;
    /* height: 100%; */
    height: auto;
    max-height: 90vh;
    object-fit: cover;
  }
  @media (max-width: 632px) {
    .Post_swiperImg {
      min-height: 307px;
      object-fit: contain;
    }
  }
`;

export const Detail_RightContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  height: 90vh;
  overflow: hidden;

  /* 반응형 별 상세 게시물 높이 수정 */
  @media (max-width: 1024px) {
    height: 73vh;
  }
  @media (max-width: 767px) {
    height: 65vh;
  }
  @media (max-width: 632px) {
    width: 100%;
    height: auto;
  }
  .Post_RightBox {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding: 9px 16px;
    border-bottom: 1px solid rgb(239, 239, 239);

    @media (max-width: 400px) {
      padding: 9px 9px;
    }
  }

  .Post_RightBox_userInfo {
    display: flex;
    align-items: center;
  }

  .Detail_commenter {
    width: 100%;
    display: flex;
    position: relative;
    margin-bottom: 17px;
  }

  .Detail_commenter .Detail_dayDiv {
    display: none;
  }

  .Detail_commenter:hover .Detail_dayDiv {
    display: block;
    margin-left: 20px;
    color: #7a7a7a;
    cursor: pointer;
  }

  .Detail_imgBox {
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

    @media (max-width: 632px) {
      width: 45px;
    }

    @media (max-width: 400px) {
      width: 40px;
    }
  }

  .Detail_img {
    border: 1px #ddd solid;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    width: 45px;

    @media (max-width: 632px) {
      width: 39px;
    }

    @media (max-width: 400px) {
      width: 34px;
    }
  }

  .Post_user {
    margin-left: 12px;
  }

  .Post_nickName {
    margin-bottom: 3px;
    font-weight: 700;
    display: inline-flex;
    margin-right: 7px;
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
    gap: 5px;

    @media (max-width: 400px) {
      padding: 9px 12px;
    }
  }

  .Post_icon {
    cursor: pointer;
    color: #333;
    font-size: 24px;
    margin-right: 15px;
    cursor: pointer;

    @media (max-width: 632px) {
      font-size: 20px;
      margin-right: 12px;
    }
  }

  .Post_content {
    padding: 0 15px;

    @media (max-width: 400px) {
      padding: 0 12px;
    }
  }

  .Detail_content {
    padding: 16px;
    flex: 1;
    overflow-y: auto;

    @media (max-width: 632px) {
      max-height: 101px;
    }

    @media (max-width: 400px) {
      /* max-height: 101px; */
      padding: 11px 9px;
    }
  }

  .Detail_contBox {
    display: flex;
  }

  .Detail_contImg {
    margin-right: 12px;
  }

  .Detail_Info {
    padding-top: 5px;

    @media (max-width: 632px) {
      padding-top: 0;
    }
  }

  .Detail_Info_box {
    padding: 0 16px 16px 0;
  }

  .Detail_pcWrap {
    display: flex;
    align-items: center;
  }

  .Detail_pc {
    line-height: 23px;
    white-space: pre-line;
    /* display: inline-block; */
  }

  @media (max-width: 632px) {
    .Detail_pc.truncate {
      max-width: 10ch;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .Detail_day {
    display: flex;
    align-items: center;
  }

  .Detail_span {
    color: rgb(115, 115, 115);
    font-size: 12px;
    margin: 0 0 2px 10px;
    cursor: pointer;
  }
`;

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

export const DetailLikeIcon = styled.i.withConfig({
  shouldForwardProp: (prop) => prop !== "animate",
})<{ animate: boolean }>`
  color: ${(props) => (props.className?.includes("fa-heart") ? "red" : "#333")};
  animation: ${(props) => (props.animate ? pop : "none")} 0.3s ease;
  transition: color 0.2s ease;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 632px) {
    font-size: 20px;
  }
`;

export const ReplyCommentDiv = styled.div`
  margin-left: 62px;
  margin-top: -5px;
`;
