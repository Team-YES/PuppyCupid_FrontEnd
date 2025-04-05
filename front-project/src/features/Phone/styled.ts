import styled from "styled-components";

// 패딩 + 중앙 정렬
export const PhonePadding = styled.div`
  background-color: rgb(242, 242, 242);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0px 120px;
  /* 에러메시지 */
  .Phone_error_message {
    font-size: 13px;
    color: red;
  }
  .Phone_error_messageWrap {
    height: 10px;
    margin-top: 4px;
  }
  .Phone_plus_infoWrap {
    background-color: white;
    width: 100%;
    padding: 50px 35px;
    border-radius: 12px;
  }
  .Phone_info_Title {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: bold;
    padding-bottom: 25px;
  }
  .Phone_info_Title_Main {
    font-size: 35px;
    padding-bottom: 10px;
  }
  .Phone_info_Title_Sub {
    font-size: 25px;
  }
  .Phone_label_allbox {
    display: flex;
    justify-content: center;
    gap: 10px;
    padding: 10px 0px 15px 0px;
    p {
      margin: 0px;
    }
  }

  .Phone_input_box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    p {
      padding-top: 5px;
    }
    input,
    select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 14px;
      outline: none;
      appearance: none;
      background-color: white;
      transition: border-color 0.3s ease-in-out;
      margin-bottom: 10px;

      &:focus {
        border-color: ${({ theme }) => theme.colors.mainPurple};
        box-shadow: 0 0 5px ${({ theme }) => theme.colors.inputPurple}80;
      }
    }
    .Phone_nickName_inputSize {
      width: calc(100% - 80px);
    }
    .Phone_nickName_checkBox {
      display: flex;
    }
  }
  /* .Phone_Check_inputbox {
  } */
  .Phone_nickName_checkBtn {
    display: flex;
  }
  .Phone_form {
    width: 100%;
    display: flex;
    justify-content: center;
    label {
      width: 15%;
      padding-top: 8px;
      padding-left: 5px;
    }
  }
  .Phone_form_wrap {
    width: 55%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .Phone_btnWrap {
    display: flex;
    justify-content: flex-end;
  }
  .Phone-button {
    width: 15%;
    background: ${({ theme }) => theme.colors.pointPurple};
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
  }
  .Phone-button-check {
    background: ${({ theme }) => theme.colors.accentPurple};
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 13px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    height: 38px;
    width: 80px;
    margin-left: 10px;
  }
  .Phone-button-check:hover {
    background: ${({ theme }) => theme.colors.accentHoverPurple};
  }
  .Phone-button:hover {
    background: ${({ theme }) => theme.colors.mainPurple};
  }
  .Phone-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    color: #666;
  }
  .Phone-button-check:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    color: #666;
  }
  .Phone_textgray {
    color: gray;
  }
  /* 반응형 */
  @media (max-width: 1024px) {
    padding: 0px 60px;
    .Phone_form_wrap {
      width: 75%;
    }
  }
  @media (max-width: 768px) {
    padding: 0px 30px;
    .Phone_form_wrap {
      width: 85%;
    }
    .Phone_info_Title_Main {
      font-size: 30px;
    }
    .Phone_info_Title_Sub {
      font-size: 18px;
    }
    .Phone-button {
      width: 18%;
    }
    .Phone_form label {
      width: 20%;
    }
  }
  @media (max-width: 480px) {
    padding: 0px 10px;
    .Phone_form_wrap {
      width: 95%;
    }
    .Phone_info_Title_Main {
      font-size: 28px;
    }
    .Phone_info_Title_Sub {
      font-size: 15px;
    }
    .Phone-button {
      width: 20%;
    }
  }
`;
