import styled from "styled-components";

export const ChatRoomWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  box-sizing: border-box;
  .ChatRoom_otheruser_nametitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 25px;
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
    overflow-x: hidden;
    height: 80vh;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .ChatRoom_AllWrap {
    width: 100%;
    height: 100%;
  }

  /* 인풋 디자인 */
  .ChatRoom_Chat_input {
    box-sizing: border-box;
    overflow: hidden;
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
      cursor: text;
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

  // 이모티콘 사이즈
  .ChatRoom_emoji_emessage {
    font-size: 45px;
    margin: 10px 0;
  }

  /* 채팅방 메시지 폰트 크기 */
  .ChatRoom_text_emessage {
    font-size: 15px;
  }

  /*  */
  .ChatRoom_message_wrap {
    display: flex;
    align-items: flex-end;
    margin: 10px 20px;
    box-sizing: border-box;
  }
  .ChatRoom_message_wrap.other {
    justify-content: flex-start;
  }

  .ChatRoom_message_wrap.my {
    div {
      display: flex;
      justify-content: flex-end;
      max-width: 100%;
    }
    display: flex;
    justify-content: flex-end;
  }

  .ChatRoom_profile_area {
    margin-right: 5px;
  }

  /* .ChatRoom_profile_img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  } */

  .ChatRoom_sender_nickname {
    font-size: 12px;
    color: #888;
    margin-bottom: 4px;
  }

  .ChatRoom_message_wrap .ChatRoom_text_emessage {
    background-color: ${({ theme }) => theme.colors.mainPurple};
    padding: 10px 14px;
    border-radius: 16px;
    width: 100%;
    max-width: 30ch;
    word-break: break-word;
    white-space: pre-wrap;
    color: white;
    display: inline-block;
    box-sizing: border-box;
  }

  .ChatRoom_message_wrap.my .ChatRoom_text_emessage {
    background-color: ${({ theme }) => theme.colors.backgroundGray};
    display: inline-block;
    color: black;
    max-width: 30ch;
  }

  .ChatRoom_message_wrap .ChatRoom_emoji_emessage {
    font-size: 2.5rem;
    margin: 5px;
  }
`;
