import React from "react";
import { ChatOtherRoomWrapper } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type ChatProps = {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatOtherRoom = ({ openChat, setOpenChat }: ChatProps) => {
  // 채팅방마다로 수정 필요(임시)
  const handleToggleClick = () => {
    setOpenChat((prev) => !prev);
  };

  return (
    // 채팅 가운데 컴포넌트
    <ChatOtherRoomWrapper>
      <div className="ChatOtherRoom_userName" onClick={handleToggleClick}>
        아직 데이터 안넣음(임시 버튼)
      </div>
    </ChatOtherRoomWrapper>
  );
};

export default ChatOtherRoom;
