import styled from "styled-components";

export const AdminStyled = styled.div`
  position: relative;

  .Admin_left_container {
    display: flex;
    position: relative;
    padding: 40px 34px;

    .Admin_btn_wrap {
      margin: 14px 0;
      width: 130px;
    }
  }

  .Admin_right_container {
    background-color: gray;
    width: 100%;
    position: relative;
    border-radius: 14px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #333;
  color: #fff;
  font-size: 25px;
  font-weight: 700;
  padding: 10px 34px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px 25px 8px 15px;
  margin: 14px 0;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  border: none;
  font-weight: 700;
`;
