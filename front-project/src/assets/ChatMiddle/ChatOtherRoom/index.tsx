import React from "react";
import { ChatOtherRoomWrapper } from "./styled";

type ChatUser = {
  userId: number;
  nickName: string;
  lastMessage: string;
  lastMessageTime: string;
};

type ChatOtherRoomProps = {
  user: ChatUser;
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatOtherRoom = ({ user, openChat, setOpenChat }: ChatOtherRoomProps) => {
  const handleToggleClick = () => {
    setOpenChat(true);
    // 해당 유저와의 채팅방으로 이동
    window.location.href = `/chat?receiverId=${user.userId}`;
  };

  return (
    <ChatOtherRoomWrapper>
      <div className="ChatOtherRoom_userName" onClick={handleToggleClick}>
        <div className="nickname">{user.nickName}</div>
        <div className="lastMessage">{user.lastMessage}</div>
        <div className="lastTime">
          {new Date(user.lastMessageTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </ChatOtherRoomWrapper>
  );
};

export default ChatOtherRoom;
