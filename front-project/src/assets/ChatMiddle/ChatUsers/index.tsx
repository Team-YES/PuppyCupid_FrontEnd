import React from "react";
import { ChatUsersWrapper } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ChatOtherRoom from "../ChatOtherRoom";

type ChatProps = {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatUsers = ({ openChat, setOpenChat }: ChatProps) => {
  const nickName = useSelector((state: RootState) => state.user.user?.nickName);
  return (
    // 채팅 가운데 컴포넌트
    <ChatUsersWrapper>
      <div className="ChatUsers_userName">
        <div>{nickName ?? " "}</div>
      </div>
      <div>
        <div className="ChatUsers_otherusers_room">
          <ChatOtherRoom openChat={openChat} setOpenChat={setOpenChat} />
        </div>
      </div>
    </ChatUsersWrapper>
  );
};

export default ChatUsers;
