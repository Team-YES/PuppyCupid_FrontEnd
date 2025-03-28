import styled from "styled-components";

export const MainStyled = styled.div`
  &.main-wrap {
    background-color: ${({ theme }) => theme.colors.mainPurple};
    .main-title {
      font-size: 20px;
    }
    @media (max-width: 1024px) {
      background-color: black;

      .main-title {
        font-size: 12px;
      }
    }
  }
`;
