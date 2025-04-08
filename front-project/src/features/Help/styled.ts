import styled from "styled-components";

export const HelpStyled = styled.div`
  .Help_formWrap {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0px 60px;
    flex-direction: column;
    button {
      width: 100px;
      margin: 0 auto;
      border: 1px solid black;
      background-color: white;
      color: black;
      padding: 8px 12px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: none;
      outline: none;
    }
  }

  .Help_Wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .Help_formWrap form {
    background: white;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .Help_required-dot span {
    color: red;
    margin-left: 4px;
    font-weight: bold;
    font-size: 6px;
    vertical-align: middle;
  }
`;
