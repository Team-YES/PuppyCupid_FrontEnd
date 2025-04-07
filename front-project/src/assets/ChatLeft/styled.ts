import styled from "styled-components";

export const ChatLeftWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .ChatLeft_AllWrap {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
  }
  .ChatLeft_mydog_imgwrap {
    width: 95%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 2px solid ${({ theme }) => theme.colors.pointPurple}80;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    cursor: pointer;
    @media (max-width: 767px) {
      width: 70%;
    }
  }
  .ChatLeft_puppyprofile {
    border: 1px #ddd solid;
    width: 92%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .ChatLeft_puppyprofile img {
    width: 100%;
    object-fit: contain;
    height: 100%;
  }
  /* 홈으로 가기 버튼 */
  .ChatLeft_Home_icons {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 25px;
    font-size: 25px;
    /* color: ${({ theme }) => theme.colors.pointPurple}; */
    color: black;
    i {
      cursor: pointer;
    }
    @media (max-width: 767px) {
      font-size: 30px;
    }
  }
  .ChatLeft_otherdog_imgwrap {
    display: none;

    @media (max-width: 767px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      min-height: 0;
      flex: 1;
      overflow-y: auto;
      img {
        margin-top: 25px;
      }
    }
  }
  .ChatLeft_otherdog_imgwrap {
    padding-top: 25px;
  }
  .ChatLeft_ohtersprofile {
    border: 1px #ddd solid;
    width: 65%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
  }
  .ChatLeft_ohtersprofile img {
    width: 100%;
    object-fit: cover;
    height: 100%;
  }
`;
