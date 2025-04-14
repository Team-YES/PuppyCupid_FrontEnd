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
  const [matchDog, setMatchDog] = useState<any>(null); // 매칭 강아지
  const [noMatch, setNoMatch] = useState(false); // 매칭 실패 상태
  const [error, setError] = useState(""); // 에러 메시지

  useEffect(() => {
    const fetchMatchDog = async () => {
      try {
        const res = await axiosInstance.get("/match");
        if (res.data.ok) {
          if (res.data.match) {
            setMatchDog(res.data.match);
          } else {
            setNoMatch(true); // match가 null일 경우 처리
          }
        } else {
          setError(res.data.error || "매칭에 실패했습니다.");
        }
      } catch (err) {
        setError("서버 오류가 발생했습니다.");
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
          {error ? (
            <p className="error-text">{error}</p>
          ) : matchDog ? (
            <div>
              <div>
                <img
                  src={`http://localhost:5000${matchDog.dogImage}`}
                  alt="matchdogImage"
                />
              </div>
              <p>이름: {matchDog.name}</p>
              <p>MBTI: {matchDog.mbti}</p>
              <p>성격: {matchDog.personality}</p>
            </div>
          ) : noMatch ? (
            <p>아쉽게도 현재 조건에 맞는 매칭이 없습니다.</p>
          ) : (
            <p>매칭 중입니다...</p>
          )}
        </div>
      </div>
    </MatchesStyle>
  );
};

export default Matches;
