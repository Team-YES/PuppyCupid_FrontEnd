import styled from "styled-components";
import type { ButtonProps } from "./index";

export const LoginPageStyled = styled.div`
  max-width: 430px;
  margin: 0 auto;

  .Loginpage_login_logo {
    display: flex;
    justify-content: center;
    padding-bottom: 34px;
  }

  .Loginpage_main_container {
    padding: 24px;
    border: 1px solid #ddd;
    border-radius: 12px;
  }

  .Loginpage_content {
    h2 {
      margin-bottom: 22px;
      font-size: 22px;
    }
  }

  .Loginpage_title {
    /**  #b18df1 */
    color: #979797;
    font-size: 14px;
    font-weight: 700;
  }

  .Loginpage_main_title {
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    margin-bottom: 22px;
    color: #333;
  }

  .Loginpage_logo_container {
    width: 79px;
    margin-top: 78px;
  }

  .Loginpage_logo_container img {
    width: 100%;
  }

  .Loginpage_google_login {
    box-shadow: 1px 1px 1px grey;
  }
`;

export const SocialLoginBtn = styled.button<ButtonProps>`
  position: relative;
  width: 100%;
  padding: 13px 20px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 12px;
  margin-top: 10px;
  text-align: center;
  cursor: pointer;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ color }) => color};
  border: ${({ $border }) => $border};

  &::before {
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    margin-left: 10px;
    background: ${({ $iconURL }) => `url(${$iconURL}) no-repeat center`};
    background-size: ${({ size }) => `${size}`};
    top: 8px;
    left: 2px;
  }
`;

export const DividerText = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  color: #888;
  font-size: 14px;
  margin: 17px 0;
`;

export const Line = styled.span`
  flex: 1;
  height: 1.5px;
  background-color: #ccc;
`;

export const Text = styled.span`
  padding: 0 12px;
  white-space: nowrap;
`;
