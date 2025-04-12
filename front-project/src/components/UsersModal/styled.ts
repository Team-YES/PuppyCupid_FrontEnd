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
    width: 65px;
    height: 65px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    align-items: center;
  }
  .UsersModal_usersWrap img {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  /* 폼 전체 스타일 */
  .UsersModal_wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    height: 75vh;
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
    height: 18%;
    display: flex;
    align-items: center;
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
    width: 10px;
  }

  .UsersModal_wrap::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.mainPurple};
    border-radius: 50px;
  }
`;
