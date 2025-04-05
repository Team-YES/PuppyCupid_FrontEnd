import React from "react";
import { ChatLeftWrapper } from "./styled";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import { fetchMyDog } from "@/reducers/dogSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";

const ChatLeft = () => {
  const dog = useSelector((state: RootState) => state.dog.dog);
  const baseURL = "http://localhost:5000";
  const dogImage = dog?.image ? `${baseURL}${dog.image}` : "/puppy_profile.png";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyDog());
  }, []);

  return (
    <ChatLeftWrapper>
      <div className="ChatLeft_AllWrap">
        왼쪽
        {/* 이미지 컴포넌트 만들기 */}
        <div className="ChatLeft_mydog_imgwrap"></div>
        <div className="ChatLeft_otherdog_imgwrap"></div>
        <img
          src={dogImage}
          alt="강아지 이미지"
          style={{ width: "80px", height: "80px", borderRadius: "50%" }}
        />
      </div>
    </ChatLeftWrapper>
  );
};

export default ChatLeft;
