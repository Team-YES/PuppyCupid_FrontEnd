import styled from "styled-components";

export const ChatStyled = styled.div`
  .Chat_allWrap {
    display: flex;
    height: 100vh;
    padding-top: 0px;
  }
  /* 왼쪽 */
  .Chat_ChatLeft_Wrap {
    width: 7%;
    background-color: red;
  }
  /* 가운데 채팅 상대창 */
  .Chat_ChatUser_Wrap {
    width: 30%;
    background-color: blue;
  }

  /* 오른쪽 채팅창 */
  .Chat_ChatSend_Wrap {
    width: 63%;
    background-color: purple;
  }
`;
