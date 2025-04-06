import { useRouter } from "next/router";
import { ChatRoomWrapper } from "./styled";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { RootState } from "@/store/store";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

interface Message {
  id: number;
  content: string;
  createdAt: string;
  sender: {
    id: number;
    nickName: string;
  };
  receiver: {
    id: number;
    nickName: string;
  };
}

// 메시지 불러오기 (2초마다 갱신)
const fetchMessages = async (receiverId: number) => {
  const res = await axios.get(`http://localhost:5000/messages/${receiverId}`, {
    withCredentials: true,
  });
  return res.data.messages;
};

// 메시지 보내기
const sendMessage = async ({
  receiverId,
  content,
}: {
  receiverId: number;
  content: string;
}) => {
  const res = await axios.post(
    `http://localhost:5000/messages`,
    { receiverId, content },
    { withCredentials: true }
  );
  return res.data;
};

const ChatRoom = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { receiverId } = router.query;
  const myId = useSelector((state: RootState) => state.user.user?.id);
  const [receiverNickName, setReceiverNickName] = useState("");
  const [input, setInput] = useState("");
  // 이모티콘
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const parsedId = Number(
    Array.isArray(receiverId) ? receiverId[0] : receiverId
  );

  // 메시지 불러오기 (2초마다 polling)
  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ["messages", parsedId],
    queryFn: () => fetchMessages(parsedId),
    enabled: !!parsedId,
    refetchInterval: 2000,
  });

  // 메시지 전송 mutation
  const mutation = useMutation({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", parsedId] });
    },
  });

  // 상대방 닉네임 설정
  useEffect(() => {
    if (messages.length > 0 && myId) {
      const firstMsg = messages[0];
      const otherUser =
        firstMsg.sender.id === myId ? firstMsg.receiver : firstMsg.sender;
      setReceiverNickName(otherUser.nickName || "");
    }
  }, [messages, myId]);

  // 메시지 스크롤 아래로
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        mutation.mutate({ receiverId: parsedId, content: input });
        setInput("");
      }
    }
  };

  // 이모지 열기 함수
  const handleEmoji = (emoji: any) => {
    setInput((prevInput) => prevInput + emoji.native);
  };

  // 외부 클릭 시 이모지 창 닫기
  useClickOutside(pickerRef, () => setShowPicker(false));

  // 하트 보내기
  const handleHeartClick = () => {
    if (parsedId) {
      const heartMessage = "💜";
      mutation.mutate({ receiverId: parsedId, content: heartMessage });
    }
  };
  return (
    <ChatRoomWrapper>
      <div className="ChatRoom_AllWrap">
        <div className="ChatRoom_otheruser_nametitle">
          <div className="ChatRoom_otheruser_nickname">
            사진 가져오기+{receiverNickName}
          </div>
          <div className="ChatRoom_otheruser_info">
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
        <div className="ChatRoom_contents_wrap">
          {messages.map((msg) => {
            const isMyMessage = msg.sender.id === myId;
            const isSingleEmoji = /^[\p{Emoji}]{1}$/u.test(msg.content.trim());

            return (
              <div
                key={msg.id}
                className={`ChatRoom_message_wrap ${
                  msg.sender.id === myId ? "my" : "other"
                }`}
              >
                <div>
                  {!isMyMessage && (
                    <div className="ChatRoom_sender_nickname">
                      {msg.sender.nickName}
                    </div>
                  )}
                  <div
                    className={
                      isSingleEmoji
                        ? "ChatRoom_emoji_emessage"
                        : "ChatRoom_text_emessage"
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        <div className="ChatRoom_Chat_input">
          <i
            className="fa-regular fa-face-smile-wink left-icon"
            onClick={() => setShowPicker(!showPicker)}
          ></i>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요"
          />
          <i
            className="fa-regular fa-heart right-icon"
            onClick={handleHeartClick}
          ></i>
        </div>
        {/* 이모티콘 선택기 표시 */}
        {showPicker && (
          <div
            className="Comments_PickerBox"
            ref={pickerRef}
            style={{
              position: "absolute",
              bottom: "60px", // 화면 상단으로 조정 (필요시 변경)
              zIndex: 9999,
            }}
          >
            <Picker
              data={data}
              onEmojiSelect={handleEmoji}
              onClick={handleHeartClick}
            />
          </div>
        )}
      </div>
    </ChatRoomWrapper>
  );
};

export default ChatRoom;
