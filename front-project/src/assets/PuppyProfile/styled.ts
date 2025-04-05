import styled from "styled-components";

export const PuppyProfileWrapper = styled.div`
  .PuppyProfile_AllWrap {
  }
  .PuppyProfile_card {
    padding-top: 20px;
    padding-right: 20px;
    .PuppyProfile_text {
      padding-bottom: 10px;
    }
    .PuppyProfile_text span {
      color: black;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .PuppyProfile_title {
    color: gray;
    font-size: 18px;
  }
  .PuppyProfile_count {
    font-weight: bold;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 5px;
    padding-right: 5px;
  }
  @media (max-width: 486px) {
    .PuppyProfile_card {
      text-align: left;
      margin-left: 30px;
      margin-top: 30px;
      .PuppyProfile_text span {
        padding-right: 10px;
      }
    }
  }
`;
