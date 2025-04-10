import styled from "styled-components";

// 마이페이지 전체 패딩
export const OtherPagePadding = styled.div`
  padding: 0px 120px;
  @media (max-width: 1024px) {
    padding: 0px 20px;
  }
`;

// 전체 감싼 부분
export const OtherPageStyled = styled.div`
  border: solid 1px rgb(220, 220, 220);
  border-radius: 12px;
  width: 100%;
  min-height: 100vh;
  margin-bottom: 50px;
  margin-top: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);

  /* 프로필 상단 부분 */
  .OtherPage_top_wrap {
    display: flex;
    justify-content: space-between;
    padding: 75px 30px;
  }
  @media (max-width: 767px) {
    .OtherPage_top_wrap {
      padding: 25px 10px 25px 10px;
    }
  }
  @media (max-width: 480px) {
    .OtherPage_top_wrap {
      display: block;
    }
  }
`;

// 마이페이지 왼쪽 위
export const OtherPageLeft = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  .OtherPage_left_profileImg {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px #ddd solid;
  }

  .OtherPage_left_profileImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 767px) {
    width: 50%;
    .OtherPage_left_profileImg {
      width: 160px;
      height: 160px;
    }
  }
  @media (max-width: 486px) {
    width: 100%;
    .OtherPage_left_profileImg {
      width: 100px;
      height: 100px;
    }
  }
`;

// 마이페이지 오른쪽 위
export const OtherPageRight = styled.div`
  width: 60%;
  .OtherPage_right_namebtns {
    display: flex;
    align-items: center;
    .OtherPage_profile_btns {
      all: unset;
      padding: 8px 20px;
      border-radius: 12px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-weight: bold;
      margin-right: 15px;
      background-color: rgb(224, 224, 224);
      height: 18px;
    }
    .OtherPage_profile_nickname {
      font-weight: bold;
      margin-right: 15px;
      font-size: 23px;
      position: relative;
      display: flex;
      i {
        text-align: center;
        margin-left: 5px;
        font-size: 20px;
        color: ${(props) => props.theme.colors.pointPurple};
      }
      .OtherPage_crown_wrap {
        position: relative;
        display: flex;
        .crown-gold {
          color: gold;
        }

        .crown-purple {
          color: #9855f3;
        }

        .crown-red {
          color: crimson;
        }
      }
      .OtherPage_crownText {
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
      .OtherPage_crownText .OtherPage_text-plan {
        color: gray;
        font-weight: bold;
      }

      .OtherPage_crownText .OtherPage_text-expired {
        color: ${({ theme }) => theme.colors.pointPurple};
      }
    }

    .OtherPage_profile_nickname:hover .OtherPage_crownText {
      visibility: visible;
      opacity: 1;
    }
  }
  .OtherPage_profile_editbtns {
    display: flex;
  }
  @media (max-width: 1024px) {
    .OtherPage_right_namebtns .OtherPage_profile_btns {
      font-size: 12px;
    }
  }
  @media (max-width: 767px) {
    width: 55%;
    .OtherPage_right_namebtns {
      align-items: start;
      flex-direction: column;
    }

    .OtherPage_right_namebtns .OtherPage_profile_btns {
      font-size: 10px;
      height: 20px;
      margin-top: 15px;
    }
    .OtherPage_right_namebtns .OtherPage_profile_nickname {
      margin-right: 20px;
      font-size: 18px;
    }
    .OtherPage_profile_editbtns {
      display: flex;
    }
  }
  @media (max-width: 480px) {
    width: 100%;
    .OtherPage_right_namebtns {
      display: block;
      text-align: center;
    }
    .OtherPage_right_namebtns .OtherPage_profile_btns {
      font-size: 15px;
      margin-bottom: 10px;
      margin-top: 0px;
    }
    .OtherPage_right_namebtns .OtherPage_profile_nickname {
      font-size: 15px;
      width: 100%;
      padding: 20px 0px;
      justify-content: center;
    }
    .OtherPage_profile_editbtns {
      display: block;
    }
  }
`;
// 마이페이지 하단 게시물 모음
export const OtherPageBottom = styled.div`
  padding: 0px 55px 15px 55px;
  /* 게시물 상단 메뉴 이름 */
  .OtherPage_board_titles {
    display: flex;
    justify-content: center;
    padding: 0px;
    align-items: stretch;
    border-top: 1px rgb(220, 220, 220) solid;
    gap: 25px;
    color: gray;
  }
  .OtherPage_board_titles div i {
    margin-right: 8px;
  }
  /* 클릭 시 css 효과 */
  .OtherPage_board_item {
    cursor: pointer;
    transition: font-weight 0.1s ease;
    padding: 20px 10px;
    flex: 0.3;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .OtherPage_board_item.selected {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.pointPurple};
    height: 100%;
    border-top: 1px solid ${({ theme }) => theme.colors.pointPurple};
  }
  .OtherPage_board_item i {
    text-align: center;
  }
  @media (max-width: 767px) {
    padding: 0px 15px 15px 15px;
    .OtherPage_board_item {
      padding: 18px 5px;
      text-align: center;
      margin: 0px auto;
    }
    .OtherPage_board_titles {
      gap: 10px;
      font-size: 15px;
    }
  }
  @media (max-width: 480px) {
    padding: 0px 10px 15px 10px;
    .OtherPage_board_titles {
      gap: 10px;
      font-size: 12px;
    }

    .OtherPage_board_item {
      padding: 13px 5px;
      text-align: center;
      margin: 0px auto;
    }
  }
`;
