import styled from "styled-components";

export const AdminLoginStyled = styled.div`
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
  padding: 0 20px;

  .AdminLogin_X {
    position: fixed;
    right: 20px;
    top: 20px;
    font-size: 26px;
    color: rgb(255, 255, 255);
    cursor: pointer;
  }

  .AdminLogin_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    line-height: 48px;
    background-color: rgb(249, 249, 249);
    border-radius: 12px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 8px;
    max-height: 90vh;
    overflow-y: auto;
    padding: 20px;
  }

  .AdminLogin_title {
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
    color: #333;
  }

  .AdminLogin_input {
    height: 45px;
    border: 1px solid #ddd;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 5px;
    font-size: 15px;

    &:focus {
      outline: 2px solid #9855f3;
    }
  }

  .AdminLogin_submit {
    width: 100%;

    button {
      cursor: pointer;
      width: 100%;
      font-weight: 700;
      background-color: #ccb6fd;
      border: none;
      border-radius: 10px;
      color: #fff;

      &:hover {
        background-color: #9855f3;
      }
    }
  }

  .AdminLogin_error {
    color: red;
    margin-bottom: 10px;
    font-weight: 700;
    font-size: 13px;
    display: flex;
    align-items: center;
    height: 27px;
  }
`;
