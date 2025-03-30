import styled from "styled-components";

export const LoginPageStyled = styled.div`
  max-width: 430px;
  margin: 0 auto;

  .Loginpage_main_container {
    padding: 24px;
    border: 1px solid #ddd;
    border-radius: 12px;
  }

  .Loginpage_main_title {
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    margin-bottom: 20px;
    color: #333;
  }

  .Loginpage_logo_container {
    width: 79px;
  }

  .Loginpage_logo_container img {
    width: 100%;
  }

  .Loginpage_naver_login button {
    position: relative;
    width: 100%;
    padding: 13px 20px;
    background-color: rgb(3, 199, 90);
    color: white;
    font-size: 16px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 10px;
    text-align: center;

    &::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      margin-left: 10px;
      background: url("/btnG_naver_login_icon.png") no-repeat center;
      background-size: 30px;
      top: 9px;
      left: 2px;
    }
  }

  .Loginpage_kakao_login button {
    width: 100%;
    position: relative;
    /* width: 410.222px; */
    height: 48.222px;
    padding: 13px 20px;
    background-color: #fee500;
    color: #000000;
    font-size: 16px;
    font-weight: 700;
    border: none;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 10px;
    text-align: center;

    &::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      margin-left: 10px;
      background-image: url("/icon-kakao.svg");
      background-size: 19px;
      background-repeat: no-repeat;
      top: 15px;
      left: 7px;
    }
  }

  .Loginpage_google_login button {
    position: relative;
    width: 100%;
    padding: 13px 20px;
    color: #1f1f1f;
    font-size: 16px;
    font-weight: 700;
    border: thin solid #888;
    box-shadow: 1px 1px 1px grey;
    background-color: #ffffff;
    border-radius: 12px;
    cursor: pointer;
    margin-top: 10px;
    text-align: center;

    &::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      margin-left: 10px;
      background-image: url("/google-logo.png");
      background-size: 19px;
      background-repeat: no-repeat;
      top: 14px;
      left: 7px;
    }
  }

  .Loginpage_find_id {
    font-size: 14px;
    line-height: 17px;
    text-decoration: none;
    color: #888;
    text-align: center;

    &:hover {
      text-decoration: underline;
    }
  }
`;
