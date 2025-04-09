import styled from "styled-components";

export const ReplyCommentStyled = styled.div`
  .Reply_titleBtn {
    border: none;
    background-color: transparent;
    display: flex;
    align-items: center;
    margin: 16px 0 18px 60px;
    cursor: pointer;
  }

  .Reply_horizon {
    align-items: stretch;
    border: 0;
    border-bottom: 1px solid rgb(115, 115, 115);
    box-sizing: border-box;
    display: inline-block;
    flex-direction: column;
    flex-shrink: 0;
    font: inherit;
    font-size: 100%;
    height: 0;
    margin: 0;
    margin-bottom: 2px;
    margin-right: 10px;
    padding: 0;
    position: relative;
    vertical-align: middle;
    width: 24px;
  }

  .Reply_comment {
    color: rgb(115, 115, 115);
    font-size: 12px;
    margin: 0 0 2px 10px;
  }

  .Reply_content {
    margin-top: 20px;
  }
`;
