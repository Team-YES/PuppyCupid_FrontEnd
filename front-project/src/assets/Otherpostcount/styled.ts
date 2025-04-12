import styled from "styled-components";

export const OtherPostCountWrapper = styled.div`
  .OtherPostCount_AllWrap {
    display: flex;
  }
  .OtherPostCount_card {
    display: flex;
    padding-top: 20px;
    padding-right: 20px;
  }
  .OtherPostCount_title {
    color: gray;
    font-size: 18px;
  }
  @media (max-width: 767px) {
    .OtherPostCount_title {
      font-size: 15px;
    }
    .OtherPostCount_card {
      padding-right: 15px;
      display: block;
    }
  }
  .OtherPostCount_count {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 5px;
  }
  .OtherPostCount_count.cursor {
    cursor: pointer;
  }
  @media (max-width: 486px) {
    .OtherPostCount_AllWrap {
      justify-content: center;
      align-items: center;
    }
  }
  // 팔로우, 팔로워 목록 모달 토글
  .UserModel_toggle_wrap {
    display: block;
  }
  .UserModel_toggle_wrap.UserModel_toggle_show {
    display: none;
  }
`;
