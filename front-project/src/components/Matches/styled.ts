import { theme } from "antd";
import styled from "styled-components";

export const MatchesStyle = styled.div`
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
  .MatchesStyle_closeBtn {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    i {
      font-size: 22px;
      color: black;
    }
  }
  .Matches_usersItem {
    display: flex;
  }

  /* 폼 전체 스타일 */
  .Matches_wrap {
    display: flex;
    flex-direction: column;
    /* width: 100%; */
    width: 420px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 65vh;
    overflow-y: auto;
  }
  // 타이틀, 닫기 버튼
  .Matches_modalTypebtn_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    padding: 28px 20px 28px 20px;
    border-bottom: 1px solid #ddd;
  }

  // title
  .MatchesStyle_modalTypeTitle {
    font-size: 18px;
    font-weight: bold;
  }
  .Matches_usersItem_Allwrap {
    height: 90%;
    padding: 20px;
  }

  // 오른쪽 스크롤바
  .Matches_wrap::-webkit-scrollbar {
    width: 13px;
  }

  .Matches_wrap::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.mainPurple};
    border-radius: 50px;
  }

  /* 반응형 - 태블릿 (max-width: 767px) */
  @media (max-width: 767px) {
    .Matches_wrap {
      width: 45%;
      height: 60vh;
    }

    .Matches_modalTypebtn_wrap {
      padding: 20px;
    }
  }

  /* 반응형 - 모바일 (max-width: 480px) */
  @media (max-width: 480px) {
    .Matches_wrap {
      width: 80%;
      height: 55vh;
    }

    .Matches_modalTypebtn_wrap {
      padding: 16px;
    }

    .MatchesStyle_modalTypeTitle {
      font-size: 16px;
    }
  }
`;
