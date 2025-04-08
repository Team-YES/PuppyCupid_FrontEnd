import styled from "styled-components";

export const HelpStyled = styled.div`
  .Help_formWrap {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .Help_formWrap {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* 화면 중앙에 오도록 */
    background-color: #f9f9f9; /* 배경 색상 (선택사항) */
  }

  .Help_formWrap form {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`;
