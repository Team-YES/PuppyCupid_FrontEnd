import { theme } from "antd";
import styled from "styled-components";

export const UsersModalStyle = styled.div`
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
  .UsersModalStyle_closeBtn {
    display: flex;
    justify-content: flex-end;
    cursor: pointer;
    i {
      font-size: 22px;
      color: black;
    }
  }
  .UsersModal_usersItem {
    display: flex;
  }
  .UsersModal_usersWrap {
    width: 15%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    border: 2px solid #9855f380;
    overflow: hidden;
    display: flex;
    cursor: pointer;
    justify-content: center;
    align-items: center;
  }
  .UsersModal_usersWrap img {
    width: 92%;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px #ddd solid;
  }

  /* 폼 전체 스타일 */
  .UsersModal_wrap {
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
  // 팔로우, 팔로워 타이틀, 닫기 버튼
  .UsersModal_modalTypebtn_wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
    padding: 28px 20px 28px 20px;
    border-bottom: 1px solid #ddd;
  }

  // title
  .UsersModalStyle_modalTypeTitle {
    font-size: 18px;
    font-weight: bold;
  }
  .UsersModal_usersItem_Allwrap {
    height: 90%;
    padding: 20px;
  }
  .UsersModal_usersItem {
    display: flex;
    align-items: center;
    padding-bottom: 18px;
  }

  .UsersModal_userNickname {
    display: flex;
    height: 100%;
    align-items: center;
    padding-left: 15px;
    font-size: 18px;
  }

  // 오른쪽 스크롤바
  .UsersModal_wrap::-webkit-scrollbar {
    width: 13px;
  }

  .UsersModal_wrap::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.mainPurple};
    border-radius: 50px;
  }
  .UsersModal_emptyText {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #999;
    height: 80%;
  }

  /* 반응형 - 태블릿 (max-width: 767px) */
  @media (max-width: 767px) {
    .UsersModal_wrap {
      width: 45%;
      height: 60vh;
    }

    .UsersModal_modalTypebtn_wrap {
      padding: 20px;
    }

    .UsersModal_userNickname {
      font-size: 16px;
    }

    .UsersModal_usersWrap {
      width: 20%;
    }

    .UsersModal_usersItem {
      padding-bottom: 14px;
    }

    .UsersModal_emptyText {
      font-size: 15px;
    }
  }

  /* 반응형 - 모바일 (max-width: 480px) */
  @media (max-width: 480px) {
    .UsersModal_wrap {
      width: 80%;
      height: 55vh;
    }

    .UsersModal_modalTypebtn_wrap {
      padding: 16px;
    }

    .UsersModalStyle_modalTypeTitle {
      font-size: 16px;
    }

    .UsersModal_userNickname {
      font-size: 15px;
      padding-left: 10px;
    }

    .UsersModal_usersWrap {
      width: 25%;
    }

    .UsersModal_usersItem {
      padding-bottom: 12px;
    }

    .UsersModal_emptyText {
      font-size: 14px;
    }
  }
`;
