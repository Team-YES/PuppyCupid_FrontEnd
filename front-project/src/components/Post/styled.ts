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
`;

export const Title = styled.div`
  font-size: 23px;
  font-weight: 700;
`;

export const Img = styled.img`
  border-radius: 50%;
  width: 50px;
`;

export const PostIcon = styled.i`
  font-size: 20px;
  color: #333;
  margin-right: 15px;
  cursor: pointer;
`;

export const MarginBtmDiv = styled.div`
  margin-bottom: 10px;
`;

export const LeftContainer = styled.div`
  width: 50%;

  .Post_swiperImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;
export const RightContainer = styled.div`
  width: 50%;
  /* padding: 15px; */

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
  }

  .Post_content {
    padding: 0 15px;
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
