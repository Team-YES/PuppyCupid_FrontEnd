import styled from "styled-components";

export const MypostCountWrapper = styled.div`
  .MypostCount_AllWrap {
    display: flex;
  }
  .MypostCount_card {
    display: flex;
    padding-top: 20px;
    padding-right: 20px;
  }
  .MypostCount_title {
    color: gray;
    font-size: 18px;
  }
  @media (max-width: 768px) {
    .MypostCount_title {
      font-size: 15px;
    }
    .MypostCount_card {
      padding-right: 15px;
      display: block;
    }
  }
  .MypostCount_count {
    font-weight: bold;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 10px;
    padding-right: 5px;
  }
  @media (max-width: 486px) {
    .MypostCount_AllWrap {
      justify-content: center;
      align-items: center;
    }
  }
`;
