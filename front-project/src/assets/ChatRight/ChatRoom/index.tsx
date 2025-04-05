import React from "react";
import { ChatRoomWrapper } from "./styled";

const ChatRoom = () => {
  return (
    <ChatRoomWrapper>
      <div className="ChatRoom_AllWrap">
        <div className="ChatRoom_otheruser_nametitle">
          <div className="ChatRoom_otheruser_nickname">채팅 상대 닉네임</div>
          <div className="ChatRoom_otheruser_nickname">i</div>
        </div>
        <div className="ChatRoom_contents_wrap">채팅내용</div>
        <div className="ChatRoom_Chat_input">{/* <input /> */}</div>
      </div>
    </ChatRoomWrapper>
  );
};

export default ChatRoom;
