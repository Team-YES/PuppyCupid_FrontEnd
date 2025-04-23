import React from "react";
import { ChatLeftWrapper } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchMyDog } from "@/reducers/dogSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useRouter } from "next/router";

type ChatProps = {
  openChat: boolean;
  setOpenChat: React.Dispatch<React.SetStateAction<boolean>>;
};

const ChatLeft = ({ openChat, setOpenChat }: ChatProps) => {
  const router = useRouter();
  const dog = useSelector((state: RootState) => state.dog.dog);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  const dogImage = dog?.image ? `${baseURL}${dog.image}` : "/puppy_profile.png";
  const dispatch = useAppDispatch();
  const chatUsers = useSelector((state: RootState) => state.chatUsers.users);

  useEffect(() => {
    dispatch(fetchMyDog());
  }, []);

  const goToProfile = () => {
    router.push("/mypage");
  };

  const handleHouse = () => {
    router.push("/");
  };

  return (
    <ChatLeftWrapper>
      <div className="ChatLeft_AllWrap">
        <div className="ChatLeft_mydog_imgwrap" onClick={goToProfile}>
          <img
            src={dogImage}
            alt="puppy profile"
            className="ChatLeft_puppyprofile"
          />
        </div>
        <div className="ChatLeft_Home_icons">
          <i className="fa-solid fa-house" onClick={handleHouse}></i>
        </div>
        {/* 상대 강아지 */}
        <div className="ChatLeft_otherdog_imgwrap">
          {chatUsers.map((user) => {
            const receiverImage = user.dogImage
              ? `${baseURL}${user.dogImage}`
              : "/puppy_profile.png";

            return (
              <img
                key={user.id}
                src={receiverImage}
                alt={`${user.nickName} profile`}
                className="ChatLeft_ohtersprofile"
                onClick={() => {
                  setOpenChat(true);
                  router.push(`/chat?receiverId=${user.id}`);
                }}
              />
            );
          })}
        </div>
      </div>
    </ChatLeftWrapper>
  );
};

export default ChatLeft;
