import styled from "styled-components";

// 전체 감싼 부분
export const MyPageStyled = styled.div`
  background-color: beige;
  width: 100%;
  min-height: 100vh;
  /* 프로필 상단 부분 */
  .MyPage_top_wrap {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    padding: 30px 30px;
  }
`;

// 마이페이지 왼쪽 위
export const MyPageLeft = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  .MyPage_left_profileImg {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .MyPage_left_profileImg img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// 마이페이지 오른쪽 위
export const MyPageRight = styled.div`
  width: 70%;
  .MyPage_right_namebtns {
    display: flex;
    align-items: center;
    .MyPage_profile_btns {
      all: unset;
      padding: 5px 15px;
      border-radius: 12px;
      font-size: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      font-weight: bold;
      margin-right: 15px;
      background-color: rgb(224, 224, 224);
      height: 25px;
    }
    .MyPage_profile_nickname {
      margin-right: 15px;
      padding: 8px 10px;
      font-size: 23px;
      text-align: center;
    }
  }
`;

// 마이페이지 전체 패딩
export const MyPagePadding = styled.div`
  padding: 0px 120px;
`;
