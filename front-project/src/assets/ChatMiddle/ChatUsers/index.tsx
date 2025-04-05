import React from "react";
import { ChatUsersWrapper } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ChatOtherRoom from "../ChatOtherRoom";
import { useEffect, useState } from "react";
import axios from "axios";

type ChatUser = {
  userId: number;
  nickName: string;
  lastMessage: string;
  lastMessageTime: string;
};

type ChatProps = {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatUsers = ({ openChat, setOpenChat }: ChatProps) => {
  const nickName = useSelector((state: RootState) => state.user.user?.nickName);
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/messages/chatUsers",
          {
            withCredentials: true,
          }
        );
        setChatUsers(res.data.users);
      } catch (error) {
        console.error("채팅 유저 불러오기 실패:", error);
      }
    };

    fetchChatUsers();
  }, []);
  return (
    // 채팅 가운데 컴포넌트
    <ChatUsersWrapper>
      <div className="ChatUsers_userName">
        <div>{nickName ?? " "}</div>
      </div>
      <div>
        <div className="ChatUsers_otherusers_room">
          {chatUsers.map((user) => (
            <ChatOtherRoom
              key={user.userId}
              user={user}
              openChat={openChat}
              setOpenChat={setOpenChat}
            />
          ))}
        </div>
      </div>
    </ChatUsersWrapper>
  );
};

export default ChatUsers;
