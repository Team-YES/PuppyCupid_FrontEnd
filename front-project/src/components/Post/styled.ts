import styled, { keyframes } from "styled-components";

type Props = {
  src: string;
  alt?: string;
  width?: string;
  height?: string;
};

export const PostStyled = styled.div`
  padding: 12px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  width: 100%;
  display: flex;
  margin-bottom: 30px;

  .Post_iconContainer {
    display: flex;
    margin-bottom: 15px;
  }
`;

export const Title = styled.div`
  font-size: 23px;
  font-weight: 700;
`;

export const Img = styled.div`
  border-radius: 50%;
`;

export const PostIcon = styled.i`
  font-size: 20px;
  color: #333;
  margin-right: 15px;
`;

export const MarginBtmDiv = styled.div`
  margin-bottom: 10px;
`;

export const LeftContainer = styled.div`
  width: 50%;
`;
export const RightContainer = styled.div`
  width: 50%;
  padding: 15px;
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

export const LikeIcon = styled.i<{ animate: boolean }>`
  color: ${(props) => (props.className?.includes("fa-heart") ? "red" : "#333")};
  animation: ${(props) => (props.animate ? pop : "none")} 0.3s ease;
  transition: color 0.2s ease;
  font-size: 20px;
  cursor: pointer;
  margin-right: 15px;
`;
