import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

export const PopupWrapper = styled.div`
  overflow: hidden;
  border-radius: 12px;
  .EventPopup_wrap {
    border-radius: 12px;
  }
  background-color: #fff;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  text-align: center;
  z-index: 1000;
  .EventPopup_btngroup {
    display: flex;
    justify-content: center;
  }
`;

export const PopupButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 15px 10px;
  color: white;
  font-weight: bold;
  width: 100%;
  font-size: 15px;
  &:first-child {
    background-color: ${({ theme }) => theme.colors.pointPurple};
  }
  &:last-child {
    background-color: ${({ theme }) => theme.colors.mainPurple};
  }
`;
