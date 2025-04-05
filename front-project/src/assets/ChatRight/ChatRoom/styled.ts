import styled from "styled-components";

export const ChatRoomWrapper = styled.div`
  width: 100%;
  height: 100%;
  .ChatRoom_otheruser_nametitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 25px;
    font-size: 18px;
    width: 100%;
    height: 45px;
    border-bottom: 1px #ddd solid;
  }
  .ChatRoom_contents_wrap {
    height: 20vh;
  }
  .ChatRoom_AllWrap {
    background-color: red;
    width: 100%;
    height: 100%;
  }
`;
