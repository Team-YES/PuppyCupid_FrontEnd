import styled from "styled-components";

// 마이페이지 전체 패딩
export const MyPagePadding = styled.div`
  padding: 0px 120px;
  @media (max-width: 1024px) {
    padding: 0px 20px;
  }
`;

// 전체 감싼 부분
export const MyPageStyled = styled.div`
  border: solid 1px rgb(220, 220, 220);
  border-radius: 12px;
  width: 100%;
  min-height: 100vh;
  margin-bottom: 50px;
  margin-top: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  /* 프로필 상단 부분 */
  .MyPage_top_wrap {
    display: flex;
    justify-content: space-between;
    padding: 75px 30px;
  }
  @media (max-width: 767px) {
    .MyPage_top_wrap {
      padding: 25px 10px 25px 10px;
    }
  }
  @media (max-width: 486px) {
    .MyPage_top_wrap {
      display: block;
    }
  }
`;

// 마이페이지 왼쪽 위
export const MyPageLeft = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  .MyPage_left_profileImg {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px #ddd solid;
  }

  .MyPage_left_profileImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 767px) {
    width: 50%;
    .MyPage_left_profileImg {
      width: 160px;
      height: 160px;
    }
  }
  @media (max-width: 486px) {
    width: 100%;
    .MyPage_left_profileImg {
      width: 100px;
      height: 100px;
    }
  }
`;

// 마이페이지 오른쪽 위
export const MyPageRight = styled.div`
  width: 60%;
  .MyPage_right_namebtns {
    display: flex;
    align-items: center;
    .MyPage_profile_btns {
      all: unset;
      padding: 8px 20px;
      border-radius: 12px;
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-weight: bold;
      margin-right: 15px;
      background-color: rgb(224, 224, 224);
      height: 20px;
    }
    .MyPage_profile_nickname {
      font-weight: bold;
      margin-right: 15px;
      font-size: 23px;
      width: 25%;
      position: relative;
      display: flex;
      justify-content: space-around;
      i {
        text-align: center;
        margin-left: 5px;
        font-size: 20px;
        color: ${(props) => props.theme.colors.pointPurple};
      }
      .MyPage_crown_wrap {
        position: relative;
        display: flex;
      }
      .MyPage_crownText {
        background-color: white;
        visibility: hidden;
        border: 1.5px solid #ddd;
        color: gray;
        font-size: 13px;
        text-align: center;
        border-radius: 8px;
        padding: 8px 12px;
        position: absolute;
        z-index: 1;
        bottom: 130%;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;

        /* 말풍선 꼬리 */
        &::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 7px;
          border-style: solid;
          border-color: #ddd transparent transparent transparent;
          z-index: 0;
        }

        &::before {
          content: "";
          position: absolute;
          top: calc(100% - 1px);
          left: 50%;
          transform: translateX(-50%);
          border-width: 6px;
          border-style: solid;
          border-color: white transparent transparent transparent;
          z-index: 1;
        }
      }
    }

    .MyPage_profile_nickname:hover .MyPage_crownText {
      visibility: visible;
      opacity: 1;
    }
  }
  .MyPage_profile_editbtns {
    display: flex;
  }
  @media (max-width: 1024px) {
    .MyPage_right_namebtns .MyPage_profile_btns {
      font-size: 12px;
    }
  }
  @media (max-width: 767px) {
    width: 55%;
    .MyPage_right_namebtns .MyPage_profile_btns {
      font-size: 12px;
      margin-bottom: 10px;
      padding: 8px 10px;
      height: 20px;
    }
    .MyPage_right_namebtns .MyPage_profile_nickname {
      width: 28%;
      margin-right: 20px;
      font-size: 18px;
    }
    .MyPage_profile_editbtns {
      display: block;
    }
  }
  @media (max-width: 486px) {
    width: 100%;
    .MyPage_right_namebtns {
      display: block;
      text-align: center;
    }
    .MyPage_right_namebtns .MyPage_profile_nickname {
      font-size: 15px;
      width: 100%;
      padding: 20px 0px;
    }
  }
`;
// 마이페이지 하단 게시물 모음
export const MyPageBottom = styled.div`
  padding: 0px 55px 15px 55px;
  /* 게시물 상단 메뉴 이름 */
  .MyPage_board_titles {
    display: flex;
    justify-content: center;
    padding: 0px;
    align-items: stretch;
    border-top: 1px rgb(220, 220, 220) solid;
    gap: 25px;
    color: gray;
  }
  .MyPage_board_titles div i {
    margin-right: 8px;
  }
  /* 클릭 시 css 효과 */
  .MyPage_board_item {
    cursor: pointer;
    transition: font-weight 0.1s ease;
    padding: 20px 10px;
  }

  .MyPage_board_item.selected {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.pointPurple};
    height: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.pointPurple};
  }
  @media (max-width: 767px) {
    padding: 0px 15px 15px 15px;
  }
  @media (max-width: 480px) {
    padding: 0px 10px 15px 10px;
    .MyPage_board_titles {
      gap: 10px;
      font-size: 12px;
    }
  }
`;
