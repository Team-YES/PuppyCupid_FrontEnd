import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { MatchesStyle } from "./styled";
import { useRouter } from "next/navigation";
import { useClickOutside } from "@/hooks/useClickOutside";
import axiosInstance from "@/lib/axios";
import Cookies from "js-cookie";

type MatchesProps = {
  setMatches: React.Dispatch<React.SetStateAction<boolean>>;
};

const Matches = ({ setMatches }: MatchesProps) => {
  const [matchDog, setMatchDog] = useState<any>(null); // 매칭 강아지
  const [noMatch, setNoMatch] = useState(false); // 매칭 실패 상태
  const [error, setError] = useState(""); // 에러 메시지

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await axiosInstance.get("/match", {
              params: {
                lat: latitude,
                lng: longitude,
              },
            });

            if (res.data.ok && res.data.match) {
              setMatchDog(res.data.match);
            } else {
              setNoMatch(true); // 매칭 실패
              setError("매칭 실패: " + (res.data.error || "알 수 없는 오류"));
            }
          } catch (err) {
            setNoMatch(true); // 네트워크 에러 등도 실패 처리
            setError("매칭 요청 중 오류 발생");
          }
        },
        (error) => {
          setNoMatch(true); // 위치 권한 거부 시 실패 처리
          console.error("위치 정보를 가져오는 데 실패했습니다:", error);
          setError("위치 정보를 허용해주세요.");
        }
      );
    } else {
      setNoMatch(true); // ✅ 위치 기능 지원 안될 때도 실패 처리
      setError("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  // 채팅하기로 이동
  // const router = useRouter();
  const handleChatRequest = async (receiverId: number | undefined) => {
    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      const token = Cookies.get("access_token");

      const res = await axiosInstance.post(
        `${baseURL}/messages`,
        {
          receiverId,
          content: "산책 메이트 신청합니다!",
        },
        {
          withCredentials: true,
        }
      );
      window.location.href = `/chat?receiverId=${receiverId}`;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("채팅 요청 실패:", error.response?.data || error.message);
      } else {
        console.error("예상치 못한 에러:", error);
      }
      alert("채팅 요청에 실패했습니다.");
    }
  };
  // 모달 열고 닫기
  const modalRef = useRef(null);
  const handleClose = () => {
    setMatches(false);
  };

  useClickOutside(modalRef, () => {
    setMatches(false);
  });
  // 중성화 여부 표시
  const formatGender = (gender: string) => {
    if (gender === "female_neutered") return "암컷 (중성화 O)";
    if (gender === "female") return "암컷 (중성화 X)";
    if (gender === "male_neutered") return "수컷 (중성화 O)";
    if (gender === "male") return "수컷 (중성화 X)";
    return "알 수 없음";
  };
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
            <div className="Matches_userInfoWrap">
              <div className="Matches_imgWrap">
                <img
                  src={`${process.env.NEXT_PUBLIC_API_URL}${matchDog.dog_image}`}
                  alt="matchdogImage"
                />
              </div>
              <p>
                이름: <span>{matchDog.name}</span>
              </p>
              <p>
                MBTI: <span>{matchDog.mbti}</span>
              </p>
              <p>
                성격: <span>{JSON.parse(matchDog.personality).join(", ")}</span>
              </p>
              <p>
                나이: <span>{matchDog.age}</span>
              </p>
              <p>
                성별: <span>{formatGender(matchDog.gender)}</span>
              </p>
              <p>
                견종: <span>{matchDog.breed}</span>
              </p>
              <button
                className="Matches_Chat_btn"
                onClick={() => {
                  handleChatRequest(matchDog.user.id);
                }}
              >
                채팅하기
              </button>
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
