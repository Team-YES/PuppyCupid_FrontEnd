import styled from "styled-components";

export const PersonFormStyle = styled.div`
  .AlertList_board_content {
    width: 100%;
  }
  .AlertList_grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
  .AlertList_post {
    /* background-color: #eee; */
    /* border: 1px solid ${({ theme }) => theme.colors.pointPurple}; */
    background-color: ${({ theme }) => theme.colors.softPurple};
    padding: 25px 25px;
    border-radius: 12px;
  }
`;
