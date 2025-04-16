import styled from "styled-components";

export const PersonFormStyle = styled.div`
  .AlertList_board_content {
    width: 100%;
  }
  .AlertList_grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    /* gap: 10px; */
  }
  .AlertList_post {
    /* background-color: #eee; */
    /* border: 1px solid ${({ theme }) => theme.colors.pointPurple}; */
    /* background-color: ${({ theme }) => theme.colors.softPurple}; */
    padding: 10px 25px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
      color: gray;
      font-size: 13px;
      white-space: nowrap;
    }
  }
  .AlertList_post_info {
    margin-left: 15px;
  }
  .AlertList_post_dogImage {
    width: 65px;
    height: auto;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 2px solid ${({ theme }) => theme.colors.mainPurple};
    img {
      width: 95%;
      height: 95%;
      border-radius: 50%;
    }
  }
`;
