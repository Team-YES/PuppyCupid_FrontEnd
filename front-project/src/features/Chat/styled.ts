import styled from "styled-components";

export const ChatStyled = styled.div`
  .Chat_allWrap {
    display: flex;
    /* height: calc(100vh - 130px); */
    height: 100vh;
    padding-top: 0px;
    border-top: 1.5px #ddd solid;
    box-sizing: border-box;
  }
  /* 왼쪽 */
  .Chat_ChatLeft_Wrap {
    width: 7%;
    border-right: 1px #ddd solid;
    padding: 20px 10px;
  }
  /* 가운데 채팅 상대창 */
  .Chat_ChatUser_Wrap {
    width: 30%;
    border-right: 1px #ddd solid;
  }

  /* 오른쪽 채팅창 */
  .Chat_ChatSend_Wrap {
    width: 63%;
  }
`;
