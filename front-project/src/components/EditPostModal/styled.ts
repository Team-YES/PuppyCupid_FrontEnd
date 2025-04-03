import styled from "styled-components";

export const EditPostModalStyled = styled.div`
  position: absolute;
  z-index: 100;
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ddd;
  padding: 15px 13px;
  right: 0px;
  top: 38px;

  .EditPostModal_m {
    margin-top: 8px;
  }
`;

export const ModalBtn = styled.button`
  padding: 4px 12px;
  border-radius: 7px;
  border: 1px solid #ddd;
  background-color: #ebe2ff99;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  color: #515151;

  &:hover {
    background-color: #ebe2ff;
  }
`;
