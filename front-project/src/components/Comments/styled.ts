import styled from "styled-components";

export const CommentStyled = styled.div`
  position: relative;
  border-top: 1px solid rgb(219, 219, 219);
  /* padding: 6px 16px; */
  display: flex;
  align-items: center;

  .Comments_PickerBox {
    position: absolute;
    left: 9px;
    bottom: 49px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    z-index: 100;
  }
`;

export const IconDiv = styled.div`
  border: none;
  padding: 12px;

  i {
    font-size: 22px;
    cursor: pointer;
    color: #333;
  }
`;

export const CommentText = styled.textarea`
  border: none;
  width: 371px;
  height: 40px;
  padding: 10px;
  resize: none;

  &:focus {
    outline-style: none;
  }
`;

export const CommentPost = styled.button`
  /* cursor: pointer; */
  font-weight: 700;
  background-color: #fff;
  border: none;
  color: ${(props) => props.theme.colors.pointPurple};
  cursor: pointer;

  &:disabled {
    color: #e3d5ff;
    cursor: default;
  }

  &:hover {
    color: #9755f3cb;
  }
`;
