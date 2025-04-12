import styled from "styled-components";

export const ReportModalStyle = styled.form`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;

  .ReportModal_formWrap {
    background: white;
    border-radius: 8px;
    width: 35%;
    height: 35%;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    h2 {
      margin-bottom: 0px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px 0px;
      font-weight: bold;
      border-bottom: 1px solid #ddd;
      height: 25%;
      font-size: 16px;
    }
  }
  .error {
    color: red;
    margin-top: 5px;
    font-size: 14px;
  }
  textarea {
    height: 58%;
    border: none;
    outline: none;
    resize: none;

    padding: 12px;
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
  }
  button {
    border: none;
    width: 100%;
    cursor: pointer;
    height: 25%;
    font-size: 15px;
    border-top: 1px #ddd solid;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
`;
