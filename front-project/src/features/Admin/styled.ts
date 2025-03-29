import styled from "styled-components";

export const AdminStyled = styled.div`
  position: relative;

  .Admin_left_container {
    display: flex;
    position: relative;
    padding: 40px 34px;
  }

  .Admin_btn_wrap {
    margin: 14px 0;

    button {
      width: 100%;
      padding: 8px 25px 8px 15px;
      border-top-left-radius: 16px;
      border-bottom-left-radius: 16px;
      border: none;
      font-weight: 700;
    }
  }

  /* .Admin_btn_box {

  } */

  .Admin_right_container {
    background-color: gray;
    width: 100%;
    position: relative;
    border-radius: 14px;
  }
`;