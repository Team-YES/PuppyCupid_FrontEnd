import styled from "styled-components";

// 패딩 + 중앙 정렬
export const PhonePadding = styled.div`
  background-color: rgb(242, 242, 242);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
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
    width: 75%;
    padding: 50px 35px;
    border-radius: 12px;
  }
  .Phone_info_Title {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 25px;
    font-weight: bold;
    line-height: 30px;
    padding-bottom: 25px;
  }

  .Phone_label_allbox {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    padding-bottom: 15px;
    p {
      margin: 0px;
    }
  }

  .Phone_input_box {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .Phone_form {
    width: 100%;
    display: flex;
    justify-content: center;
    label {
      width: 18%;
    }
  }
  .Phone_form_wrap {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .Phone_btnWrap {
    display: flex;
    justify-content: flex-end;
  }
`;
