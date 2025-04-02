import { theme } from "antd";
import styled from "styled-components";

export const PuppyFormStyle = styled.div`
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
  .PuppyForm_closeBtn {
    display: flex;
    justify-content: flex-end;
    i {
      font-size: 23px;
      color: black;
    }
  }

  .PuppyForm_preview_div {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 50px;
  }
  .PuppyForm_form_imgs {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .PuppyForm_preview_div img {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 50%;
  }
  /* 폼 전체 스타일 */
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-height: 90vh;
    overflow-y: auto;
    padding-right: 12px;
  }

  form::-webkit-scrollbar {
    width: 10px;
  }

  form::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.mainPurple};
    border-radius: 50px;
  }

  /* 각 입력 필드 스타일 */
  div {
    margin-bottom: 20px;
  }

  /* 레이블 스타일 */
  label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
    display: inline-block;
    color: #333;
  }

  /* 텍스트 입력 필드 스타일 */
  input[type="text"],
  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* 체크박스 그룹 스타일 */
  div > div {
    margin-bottom: 10px;
  }

  input[type="checkbox"] {
    margin-right: 10px;
  }

  label[for] {
    font-size: 14px;
    color: #666;
  }

  /* 선택 상자 (select) 스타일 */
  select {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }

  /* 제출 버튼 스타일 */
  button[type="submit"] {
    background-color: ${({ theme }) => theme.colors.pointPurple};
    color: white;
    font-size: 15px;
    font-weight: bold;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button[type="submit"]:hover {
    background-color: ${({ theme }) => theme.colors.mainPurple};
  }

  button[type="submit"]:focus {
    outline: none;
  }
  button[type="submit"]:disabled {
    background-color: #d3d3d3;
    color: #a9a9a9;
    cursor: not-allowed;
  }
`;
export const ModalWrapper = styled.div``;
