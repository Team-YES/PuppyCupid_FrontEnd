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
import { format } from "date-fns";
import ReportModal from "../../../components/ReportModal";

interface Message {
  id: number;
  content: string;
  created_at: string;
  sender: {
    id: number;
    nickName: string;
  };
  receiver: {
    id: number;
    nickName: string;
  };
  system?: boolean;
}
type ChatRoomProps = {
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
};

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

const ChatRoom = ({ setOpenChat }: ChatRoomProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { receiverId } = router.query;
  const myId = useSelector((state: RootState) => state.user.user?.id);
  const [receiverNickName, setReceiverNickName] = useState("");
  const [input, setInput] = useState("");
  // 신고하기
  const [showReportModal, setShowReportModal] = useState(false);

  // 유저 가져오기(reducers)
  const parsedId = Number(
    Array.isArray(receiverId) ? receiverId[0] : receiverId
  );
  const chatUsers = useSelector((state: RootState) => state.chatUsers.users);
  const receiverUser = chatUsers.find((user) => user.id === parsedId);
  const receiverImage = receiverUser?.dogImage
    ? `http://localhost:5000${receiverUser.dogImage}`
    : "/puppy_profile.png";

  // 이모티콘
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 오른쪽 ... 메뉴
  const [showOptions, setShowOptions] = useState(false);
  const optionsWrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(optionsWrapperRef, () => setShowOptions(false));

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

  // 메시지 삭제 axios
  const deleteMessage = async (otherUserId: number) => {
    const res = await axios.delete(
      `http://localhost:5000/messages/${otherUserId}`,
      {
        withCredentials: true,
      }
    );

    return res.data;
  };

  // 채팅 삭제
  const deleteMessageMutation = useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", parsedId] });
    },
  });

  const handleDeleteMessage = () => {
    deleteMessageMutation.mutate(parsedId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["messages", parsedId] });
        setOpenChat(false);
        router.push("/chat");
      },
    });
  };

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

  // const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" && !e.shiftKey) {
  //     e.preventDefault();
  //     if (input.trim()) {
  //       mutation.mutate({ receiverId: parsedId, content: input });
  //       setInput("");
  //     }
  //   }
  // };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!input.trim()) return;

      const latestMessage = messages[messages.length - 1];

      console.log("latestMessage", latestMessage);
      if (
        latestMessage?.system === true &&
        /채팅.*나갔습니다/.test(latestMessage.content)
      ) {
        alert("상대방이 채팅방을 나갔습니다. 메시지를 보낼 수 없습니다.");
        return;
      }
      mutation.mutate({ receiverId: parsedId, content: input });
      setInput("");
    }
  };

  // 이모지 열기 함수
  const handleEmoji = (emoji: any) => {
    setInput((prevInput) => prevInput + emoji.native);
  };

  // 외부 클릭 시 이모지 창 닫기
  useClickOutside(pickerRef, () => setShowPicker(false));

  // 하트 보내기
  // const handleHeartClick = () => {
  //   if (parsedId) {
  //     const heartMessage = "💜";
  //     mutation.mutate({ receiverId: parsedId, content: heartMessage });
  //   }
  // };
  const handleHeartClick = () => {
    if (!parsedId) return;

    const latestMessage = messages[messages.length - 1];
    console.log("latestMessage", latestMessage);
    if (
      latestMessage?.system &&
      latestMessage.content.includes("채팅방을 나갔습니다")
    ) {
      alert("상대방이 채팅방을 나갔습니다. 메시지를 보낼 수 없습니다.");
      return;
    }

    const heartMessage = "💜";
    mutation.mutate({ receiverId: parsedId, content: heartMessage });
  };

  // 시간 들어 있는지
  const isValidDate = (date: any) => {
    return !isNaN(new Date(date).getTime());
  };

  // 오른쪽 상단 ... 토글 버튼
  const toggleOptions = () => {
    setShowOptions((prev) => !prev);
  };

  return (
    <ChatRoomWrapper>
      <div className="ChatRoom_AllWrap">
        <div className="ChatRoom_otheruser_nametitle">
          <div className="ChatRoom_otheruser_nickname">
            {receiverImage && (
              <img
                src={receiverImage}
                alt="receiverImage"
                onClick={() => {
                  if (receiverUser) {
                    router.push(`/otherpage/${receiverUser.id}`);
                  }
                }}
              />
            )}
            <span>{receiverNickName}</span>
          </div>
          <div
            className="ChatRoom_otheruser_info"
            onClick={toggleOptions}
            ref={optionsWrapperRef}
          >
            <i className="fa-solid fa-ellipsis"></i>
            {/* ... 버튼 */}
            {showOptions && (
              <div className="ChatRoom_options_menu">
                <div
                  className="ChatRoom_option_item"
                  onClick={() => {
                    setShowReportModal(true);
                  }}
                >
                  신고하기
                </div>
                <div
                  className="ChatRoom_option_item"
                  onClick={() => handleDeleteMessage()}
                >
                  채팅삭제
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="ChatRoom_contents_wrap">
          {messages.map((msg, index) => {
            const isMyMessage = msg.sender.id === myId;
            const isSingleEmoji = /^[\p{Emoji}]{1}$/u.test(msg.content.trim());

            let currentDate = "";
            if (isValidDate(msg.created_at)) {
              currentDate = format(new Date(msg.created_at), "yyyy.MM.dd");
            }

            const prevMessage = messages[index - 1];
            let prevDate = null;
            if (prevMessage && isValidDate(prevMessage.created_at)) {
              prevDate = format(new Date(prevMessage.created_at), "yyyy.MM.dd");
            }

            const showDateSeparator = currentDate && currentDate !== prevDate;

            return (
              <div key={msg.id}>
                {showDateSeparator && (
                  <div className="ChatRoom_date_separator">{currentDate}</div>
                )}
                {typeof msg.system === "boolean" && msg.system ? (
                  <div className="ChatRoom_system_message">{msg.content}</div>
                ) : (
                  <div
                    className={`ChatRoom_message_wrap ${
                      isMyMessage ? "my" : "other"
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
                    <div className="ChatRoom_message_time">
                      {isValidDate(msg.created_at) &&
                        format(new Date(msg.created_at), "a h:mm")}
                    </div>
                  </div>
                )}
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
      {/* 신고하기 */}
      {showReportModal && receiverUser && (
        <ReportModal
          type="user"
          targetId={receiverUser.id}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </ChatRoomWrapper>
  );
};

export default ChatRoom;
