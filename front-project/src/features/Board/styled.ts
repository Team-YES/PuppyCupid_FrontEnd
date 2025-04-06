import styled from "styled-components";

// 인터페이스 정의
interface WeatherAlimProps {
  alert?: boolean;
}

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
