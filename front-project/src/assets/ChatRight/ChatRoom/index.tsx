import { useRouter } from "next/router";
import { ChatRoomWrapper } from "./styled";
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
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

// 메시지 불러오기
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
          {messages.map((msg) => (
            <div key={msg.id}>{msg.content}</div>
          ))}
          <div ref={bottomRef} />
        </div>

        <div className="ChatRoom_Chat_input">
          <i className="fa-regular fa-face-smile-wink left-icon"></i>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요"
          />
          <i className="fa-regular fa-heart right-icon"></i>
        </div>
      </div>
    </ChatRoomWrapper>
  );
};

export default ChatRoom;
