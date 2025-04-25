import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { WalkingMateStyled, WalkingMateCard } from "./styled";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchMyDog } from "@/reducers/dogSlice";
import Cookies from "js-cookie";
import axiosInstance from "@/lib/axios";

interface Dog {
  id: number;
  name: string;
  age: number;
  breed: string;
  gender: string;
  mbti: string;
  personality: string[];
  image: string;
  userId: number;
}

const WalkingMate = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);

  // 카드 뒤집기
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const myDog = useSelector((state: RootState) => state.dog.dog);
  const dogId = myDog?.id;
  const dispatch = useAppDispatch();

  // 카드 토글
  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 채팅하기 이동
  const handleChat = async (receiverId: number | undefined) => {
    try {
      const token = Cookies.get("access_token");

      const res = await axiosInstance.post("/messages", {
        receiverId,
        content: "산책 메이트 신청합니다!",
      });

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

  // 중성화 여부 함수
  const formatGender = (rawGender: string) => {
    const map: Record<string, string> = {
      male_neutered: "수컷 (중성화 O)",
      male_not_neutered: "수컷 (중성화 X)",
      female_neutered: "암컷 (중성화 O)",
      female_not_neutered: "암컷 (중성화 X)",
    };
    return map[rawGender] || "정보 없음";
  };

  useEffect(() => {
    dispatch(fetchMyDog());
  }, [dispatch]);

  useEffect(() => {
    if (navigator.geolocation && dogId) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const token = Cookies.get("access_token");

          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/dogs/${dogId}/location`,
            { latitude, longitude },
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.data.ok) {
            setDogs(res.data.dogs);
          }
        } catch (err) {
          console.error("위치 전송 실패:", err);
        }
      });
    }
  }, [dogId]);

  return (
    <WalkingMateStyled>
      <div>
        {/* 윗부분 안내 문구 */}
        <div>
          <div className="WalkingMate_Info_wrap">
            <img src="/puppy.gif" alt="walkingmate puppyimg"></img>
            <div className="WalkingMate_Info_Textwrap">
              <h5>혹시 우리 댕댕이... 외롭진 않을까요?</h5>
              <h1>
                <span>산책메이트로</span>
                <span>친구를 찾아주세요!</span>
              </h1>
              <h3>
                <span>주변에 접속 중인 친구들에게 대화 신청이 가능합니다.</span>
                <span>새로운 산책 친구와 특별한 인연을 만들어보세요 🐶</span>
              </h3>
            </div>
          </div>
        </div>
        <div className="WalkingMate_List_Title">
          📍 지금 근처에서 접속 중인 댕댕이 친구들이에요!
        </div>
        {/* 접속 중인 유저 목록 */}
        <WalkingMateCard>
          {dogs.length > 0 ? (
            <ul>
              {dogs.map((dog) => (
                <li key={dog.id} onClick={() => toggleFlip(dog.id)}>
                  <div
                    className={`WalkingMate_card ${
                      flippedCards[dog.id] ? "WalkingMate_flip" : ""
                    }`}
                  >
                    {/* 앞면 */}
                    <div className="WalkingMate_card-face WalkingMate_card-front">
                      <div className="WalkingMate_card-img-wrap">
                        <img
                          src={`${process.env.NEXT_PUBLIC_API_URL}${dog.image}`}
                          alt={`${dog.name}의 이미지`}
                        />
                      </div>
                      <div className="WalkingMate_card-name-overlay">
                        이름: {dog.name}
                      </div>
                    </div>

                    {/* 뒷면 */}
                    <div className="WalkingMate_card-face WalkingMate_card-back">
                      <p>견종: {dog.breed}</p>
                      <p>나이: {dog.age}</p>
                      <p>성별: {formatGender(dog.gender)}</p>
                      <p>MBTI: {dog.mbti}</p>
                      <p>
                        성격:{" "}
                        {Array.isArray(dog.personality)
                          ? dog.personality.join(", ")
                          : JSON.parse(dog.personality).join(", ")}
                      </p>
                      <div
                        className="WalkingMate_chat-button"
                        onClick={() => handleChat(dog.userId)}
                      >
                        채팅하기
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="WalkingMate-nodogs-message">
              <img src="/puppy2.gif" alt="nodogs-message"></img>
              <span>주변에 접속 중인 산책 친구가 없어요 😢</span>{" "}
              <span>나중에 다시 확인해보세요!</span>
            </div>
          )}
        </WalkingMateCard>
      </div>
    </WalkingMateStyled>
  );
};

export default WalkingMate;
