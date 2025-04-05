import React from "react";
import { ChatLeftWrapper } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchMyDog } from "@/reducers/dogSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useRouter } from "next/router";

const ChatLeft = () => {
  const router = useRouter();

  const dog = useSelector((state: RootState) => state.dog.dog);
  const baseURL = "http://localhost:5000";
  const dogImage = dog?.image ? `${baseURL}${dog.image}` : "/puppy_profile.png";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyDog());
  }, []);

  const goToProfile = () => {
    router.push("/mypage");
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
        {/* 이미지 컴포넌트 만들기 */}
        <div className="ChatLeft_otherdog_imgwrap"></div>
      </div>
    </ChatLeftWrapper>
  );
};

export default ChatLeft;
