import React from "react";
import { ChatOtherRoomWrapper } from "./styled";

type ChatUser = {
  userId: number;
  nickName: string;
  dogImage: string | null;
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
    <ChatOtherRoomWrapper onClick={handleToggleClick}>
      <div className="ChatOtherRoom_chat-room-item">
        <img
          src={user.dogImage || "/puppy_profile.png"}
          alt="dog"
          className="ChatOtherRoom_dog-image"
        />
        <div className="chat-info">
          <div className="top-row">
            <span className="nickname">{user.nickName}</span>
            <span className="time">
              {new Date(user.lastMessageTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="last-message">{user.lastMessage}</div>
        </div>
      </div>
    </ChatOtherRoomWrapper>
  );
};

export default ChatOtherRoom;
