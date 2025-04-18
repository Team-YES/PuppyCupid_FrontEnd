import React, { useEffect } from "react";
import { ChatSendWrapper, ChatSendNone, ChatSendTrue } from "./styled";
import ChatRoom from "../ChatRoom";
import { useRouter } from "next/router";

type ChatProps = {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatSend = ({ openChat, setOpenChat }: ChatProps) => {
  const router = useRouter();
  const { receiverId } = router.query;

  useEffect(() => {
    if (!router.isReady) return;
    if (receiverId) {
      setOpenChat(true);
    }
  }, [router.isReady, receiverId]);

  return (
    <ChatSendWrapper>
      <div className="ChatSend_AllWrap">
        {/* openChat이 false일 때: 비어있을 때 */}
        {!openChat && (
          <ChatSendNone>
            <div className="ChatSend_None_Text">
              <i className="fa-solid fa-comments"></i>
              <p>새로운 채팅을 시작해보세요!</p>
            </div>
          </ChatSendNone>
        )}

        {/* openChat이 true일 때: 채팅방 */}
        {openChat && (
          <div className="ChatSend_True">
            <ChatSendTrue>
              <div className="ChatSend_True_Wrap">
                {receiverId && <ChatRoom setOpenChat={setOpenChat} />}
              </div>
            </ChatSendTrue>
          </div>
        )}
      </div>
    </ChatSendWrapper>
  );
};

export default ChatSend;
