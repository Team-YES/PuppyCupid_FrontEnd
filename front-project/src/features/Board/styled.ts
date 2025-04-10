import styled from "styled-components";

// 인터페이스 정의
interface WeatherAlimProps {
  alert?: boolean;
}

export const BoardContainer = styled.div``;

export const AllPostsWrap = styled.div`
  padding: 25px;
  max-width: 975px;
  margin: 0 auto;

  @media (max-width: 632px) {
    width: 375px;
  }
`;

export const WeatherWrapper = styled.div`
  padding: 6px 25px 6px 25px;
  background-color: ${(props) => props.theme.colors.backgroundGray};

  @media (max-width: 697px) {
    padding: 6px 20px 6px 15px;
  }
`;

export const WeatherAlim = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "alert",
})<WeatherAlimProps>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  color: ${({ alert }) => (alert ? "#dd0000" : "#1e1e1e")};

  img {
    width: 38px;
  }

  @media (max-width: 697px) {
    font-size: 16px;

    span:first-child {
      display: none;
    }
  }
`;

export const WritePost = styled.div`
  position: fixed;
  z-index: 100;
  right: 1.3rem;
  bottom: 1.1rem;
  width: 47px;
  height: 47px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.mainPurple};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &::before {
    content: "게시글 작성";
    position: absolute;
    bottom: 123%; /* 버튼 위에 위치 */
    right: 50%;
    transform: translateX(50%);
    background-color: #333;
    color: #fff;
    padding: 6px 10px;
    border-radius: 6px;
    font-size: 0.75rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    right: 50%;
    transform: translateX(50%);
    border-width: 6px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
    opacity: 0;
  }

  i {
    font-size: 24px;
    color: #fff;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.pointPurple};
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
`;
