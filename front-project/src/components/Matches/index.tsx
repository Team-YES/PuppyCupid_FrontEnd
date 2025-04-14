import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { MatchesStyle } from "./styled";
import { useRouter } from "next/navigation";
import { useClickOutside } from "@/hooks/useClickOutside";
import axiosInstance from "@/lib/axios";

type MatchesProps = {
  setMatches: React.Dispatch<React.SetStateAction<boolean>>;
};

const Matches = ({ setMatches }: MatchesProps) => {
  // 매칭 강아지
  const [matchDog, setMatchDog] = useState<any>(null);

  useEffect(() => {
    const fetchMatchDog = async () => {
      try {
        const res = await axiosInstance.get("/match");
        if (res.data.ok) {
          setMatchDog(res.data.match);
          console.log(res.data, "res.data?");
        } else {
          console.error("매칭 실패:", res.data.error);
        }
      } catch (err) {
        console.error("매칭 요청 중 오류 발생:", err);
      }
    };

    fetchMatchDog();
  }, []);

  // 채팅하기로 이동
  const router = useRouter();

  // 모달 열고 닫기
  const modalRef = useRef(null);
  const handleClose = () => {
    setMatches(false);
  };

  useClickOutside(modalRef, () => {
    setMatches(false);
  });

  return (
    <MatchesStyle>
      <div className="Matches_wrap" ref={modalRef}>
        <div className="Matches_modalTypebtn_wrap">
          <div></div>
          <div className="MatchesStyle_modalTypeTitle">MBTI로 매칭하기</div>
          <div className="MatchesStyle_closeBtn" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i>
          </div>
        </div>
        <div className="Matches_usersItem_Allwrap">
          {matchDog ? (
            <div>
              <div>
                <img
                  src={`http://localhost.5000${matchDog.dogImage}`}
                  alt="matchdogImage"
                />
              </div>
              <p>이름: {matchDog.name}</p>
              <p>MBTI: {matchDog.mbti}</p>
              <p>성격: {matchDog.personality}</p>
            </div>
          ) : (
            <p>추천 강아지를 찾는 중입니다...</p>
          )}
        </div>
      </div>
    </MatchesStyle>
  );
};

export default Matches;
