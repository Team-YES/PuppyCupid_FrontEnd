import styled from "styled-components";

// 패딩
export const PhonePadding = styled.div`
  padding: 0px 120px;
  @media (max-width: 768px) {
    padding: 0px 35px;
  }

  .form-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .form-group {
    margin-bottom: 16px;
  }

  .label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .input,
  .select {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .input:focus,
  .select:focus {
    border-color: #9855f3; /* 포인트 컬러 */
    outline: none;
    box-shadow: 0 0 5px rgba(152, 85, 243, 0.5);
  }

  .error-text {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }

  .submit-btn {
    width: 100%;
    background-color: #9855f3;
    color: white;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .submit-btn:hover {
    background-color: #7c44c2;
  }
`;
