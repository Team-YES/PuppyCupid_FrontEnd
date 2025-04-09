import styled from "styled-components";

export const HelpStyled = styled.div`
  .Help_formWrap {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0px 120px;
    flex-direction: column;
    button {
      width: 100px;
      margin: 0 auto;
      border: 1px solid black;
      background-color: white;
      color: black;
      padding: 8px 12px;
      margin-top: 50px;
      margin-bottom: 50px;
      font-size: 14px;
      cursor: pointer;
      box-shadow: none;
      outline: none;
      &:hover {
        background-color: ${({ theme }) => theme.colors.pointPurple};
        color: white;
        border-color: ${({ theme }) => theme.colors.pointPurple};
      }
    }
    button.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
  /* 유효성 검사 메시지 */
  .Help_error {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
  .Help_success {
    color: green;
    font-size: 12px;
    margin-top: 4px;
  }

  .Help_Wrap {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .Help_labelinput_wrap {
    padding-top: 15px;
  }
  .Help_formWrap form {
    background: white;
    width: 100%;
    display: flex;
    flex-direction: column;
    label {
      font-size: 13px;
    }
  }
  .Help_required-dot span {
    color: red;
    margin-left: 4px;
    font-weight: bold;
    font-size: 5px;
    vertical-align: middle;
  }

  input,
  select,
  textarea {
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 15px 4px;
    outline: none;
    background: transparent;
    width: 100%;
    color: #232323;
    font-size: 12px;
  }
  .Help_inputWrap textarea {
    padding: 12px;
    line-height: 1.5;
    resize: none;
    width: 100%;
    min-height: 120px;
    box-sizing: border-box;
  }

  .Help_inputWrap input[name="phone1"],
  .Help_inputWrap input[name="phone2"],
  .Help_inputWrap input[name="phone3"] {
    width: 100px;
    display: inline-block;
    margin: 0 4px;
    text-align: center;
  }
  // 환불 문구
  .Help_notice_box {
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 15px 16px;
    margin-bottom: 20px;
  }

  .Help_notice_list {
    list-style: none;
    padding-bottom: 0;
    margin: 0;

    li {
      font-size: 13px;
      color: #232323;
      margin-bottom: 6px;
      line-height: 1.5;
    }
  }
  /* 반응형 */
  @media screen and (max-width: 768px) {
    .Help_formWrap {
      padding: 0px 40px;
    }

    .Help_inputWrap input[name="phone1"],
    .Help_inputWrap input[name="phone2"],
    .Help_inputWrap input[name="phone3"] {
      width: 28%;
    }
  }

  @media screen and (max-width: 480px) {
    .Help_formWrap {
      padding: 0px 20px;
    }

    .Help_notice_box {
      padding: 12px;
    }

    .Help_notice_list li {
      font-size: 12px;
    }

    input,
    select,
    textarea {
      font-size: 11px;
    }

    label {
      font-size: 12px;
    }
  }
`;
