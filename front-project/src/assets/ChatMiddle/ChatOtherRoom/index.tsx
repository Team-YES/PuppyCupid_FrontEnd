import React from "react";
import { ChatOtherRoomWrapper } from "./styled";
import { useRouter } from "next/router";

type ChatUser = {
  id: number;
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
  const router = useRouter();

  const handleToggleClick = () => {
    setOpenChat(true);
    router.push(`/chat?receiverId=${user.id}`);
  };

  return (
    <ChatOtherRoomWrapper onClick={handleToggleClick}>
      <div className="ChatOtherRoom_chat-room-item">
        <img
          src={
            user.dogImage
              ? `http://localhost:5000${user.dogImage}`
              : "/puppy_profile.png"
          }
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
