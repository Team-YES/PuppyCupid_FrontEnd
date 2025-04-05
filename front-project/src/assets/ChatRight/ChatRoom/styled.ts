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
    height: 10vh;
    border-bottom: 1px #ddd solid;
  }
  .ChatRoom_otheruser_info {
    cursor: pointer;
    color: black;
  }
  .ChatRoom_contents_wrap {
    height: 80vh;
    overflow-y: auto;
  }
  .ChatRoom_AllWrap {
    width: 100%;
    height: 100%;
  }
  .ChatRoom_Chat_input {
    height: 10vh;
  }
  /* 인풋 디자인 */
  .ChatRoom_Chat_input {
    height: 10vh;
    padding: 10px 20px;
    border-top: 1px solid #ddd;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    position: relative;

    input {
      all: unset;
      width: 98%;
      height: 55%;
      font-size: 16px;
      padding: 10px 55px;
      border-radius: 20px;
      border: #ddd 1px solid;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.03);
      transition: all 0.2s;
    }
  }
  .ChatRoom_Chat_input .left-icon,
  .ChatRoom_Chat_input .right-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: gray;
    cursor: pointer;
  }

  .ChatRoom_Chat_input .left-icon {
    left: 40px;
  }

  .ChatRoom_Chat_input .right-icon {
    right: 40px;
  }
`;
