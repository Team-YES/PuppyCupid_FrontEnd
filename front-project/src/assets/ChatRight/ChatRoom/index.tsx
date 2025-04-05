import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

interface Message {
  id: number;
  content: string;
  senderId: number;
  createdAt: string;
}

const ChatRoom = () => {
  const router = useRouter();
  const { userId } = router.query;

  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverNickName, setReceiverNickName] = useState("");

  useEffect(() => {
    console.log("router.query:", router.query);
    console.log("router.isReady:", router.isReady);
    if (!router.isReady || !userId) return;

    const id = Array.isArray(userId) ? userId[0] : userId;
    const parsedId = Number(id);

    if (isNaN(parsedId)) {
      console.error("유효하지 않은 userId:", id);
      return;
    }

    const fetchMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/messages/${userId}`,
          { withCredentials: true }
        );
        setMessages(res.data.messages);
        console.log(res.data);
      } catch (error) {
        console.error("메시지 불러오기 실패:", error);
      }
    };

    fetchMessages();
  }, [router.isReady, userId]);

  return (
    <div className="ChatRoom_AllWrap">
      <div className="ChatRoom_otheruser_nametitle">
        <div className="ChatRoom_otheruser_nickname">{receiverNickName}</div>
        <div className="ChatRoom_otheruser_nickname">i</div>
      </div>

      <div className="ChatRoom_contents_wrap">
        {messages.map((msg, idx) => (
          <div key={idx}>{msg.content}</div>
        ))}
      </div>

      <div className="ChatRoom_Chat_input">
        {/* 여기에 입력창 + 전송 버튼 추가 예정 */}
      </div>
    </div>
  );
};

export default ChatRoom;
