import React from "react";
import { ChatUsersWrapper } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ChatOtherRoom from "../ChatOtherRoom";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";
import { setChatUsers } from "@/reducers/getChatUsersSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
// import axios from "axios";

type ChatUser = {
  id: number;
  nickName: string;
  dogImage: string | null;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
};
type ChatProps = {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatUsers = ({ openChat, setOpenChat }: ChatProps) => {
  const dispatch = useAppDispatch();
  const nickName = useSelector((state: RootState) => state.user.user?.nickName);
  const chatUsers = useSelector((state: RootState) => state.chatUsers.users);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const res = await axiosInstance.get("/messages/chatUsers");
        dispatch(setChatUsers(res.data.users));
      } catch (error) {
        console.error("채팅 유저 불러오기 실패:", error);
      }
    };

    fetchChatUsers();

    const interval = setInterval(fetchChatUsers, 3000);

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
  }, [dispatch]);

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
              key={user.id}
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
