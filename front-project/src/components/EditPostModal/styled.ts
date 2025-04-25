import styled from "styled-components";

export const EditPostModalStyled = styled.div`
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
  padding: 20px;

  .EditModal_btnContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 400px;
    line-height: 48px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 90vh;
    overflow-y: auto;
  }

  .EditPostModal_m {
    border-top: 1px solid #ddd;
  }
`;

export const ModalBtn = styled.button<{ $danger?: boolean }>`
  padding: 4px 12px;
  border-radius: 7px;
  border: none;
  background-color: #fff;
  cursor: pointer;
  font-size: 17px;
  /* font-weight: 700; */
  color: ${({ $danger }) => ($danger ? "red" : "#515151")};
  width: 100%;

  &:active {
    background-color: ${({ $danger }) => ($danger ? "#ffd1d1" : "#ebe2ff")};
  }
`;
