import React, { useState } from "react";
import { ChatOtherRoomWrapper } from "./styled";
import { useRouter } from "next/router";
import { markMessagesAsRead } from "@/utils/api";

type ChatUser = {
  id: number;
  nickName: string;
  dogImage: string | null;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number; // 읽지 않은 메시지 개수 추가
};

type ChatOtherRoomProps = {
  user: ChatUser;
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatOtherRoom = ({ user, openChat, setOpenChat }: ChatOtherRoomProps) => {
  const router = useRouter();
  const [localUser, setLocalUser] = useState(user);

  const handleToggleClick = async () => {
    try {
      // 메시지 읽음 처리
      const result = await markMessagesAsRead(user.id);
      if (result.ok) {
        setLocalUser((prev) => ({
          ...prev,
          unreadCount: 0,
        }));
      }
      // 채팅방 열기
      setOpenChat(true);
      router.push(`/chat?receiverId=${user.id}`);
    } catch (error) {
      console.error("메시지 읽음 처리 실패:", error);
    }
  };

  return (
    <ChatOtherRoomWrapper onClick={handleToggleClick}>
      <div className="ChatOtherRoom_chat-room-item">
        <div className="ChatOtherRoom_chat_imguser">
          <img
            src={
              user.dogImage
                ? `${process.env.NEXT_PUBLIC_API_URL}${user.dogImage}`
                : "/puppy_profile.png"
            }
            alt="dog"
            className="ChatOtherRoom_dog-image"
          />
          <div className="ChatOtherRoom_chat-info">
            <div className="top-row">
              <span className="ChatOtherRoom_nickname">{user.nickName}</span>
              <span className="ChatOtherRoom_time">
                {new Date(user.lastMessageTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <div className="ChatOtherRoom_last-message">
              <span>{user.lastMessage}</span>
            </div>
          </div>
        </div>
        {localUser.unreadCount > 0 && (
          <span className="ChatOtherRoom_redDot"></span>
        )}
      </div>
    </ChatOtherRoomWrapper>
  );
};

export default ChatOtherRoom;
