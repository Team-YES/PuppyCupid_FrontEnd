import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { WalkingMateStyled } from "./styled";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { fetchMyDog } from "@/reducers/dogSlice";

interface Dog {
  id: number;
  name: string;
  age: number;
  breed: string;
  gender: string;
  mbti: string;
  personality: string[];
  dog_image: string;
}

const WalkingMate = () => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const myDog = useSelector((state: RootState) => state.dog.dog);
  const dogId = myDog?.id;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMyDog());
  }, [dispatch]);

  useEffect(() => {
    if (navigator.geolocation && dogId) {
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await axios.post(
            `http://localhost:5000/dogs/${dogId}/location`,
            { latitude, longitude },
            {
              withCredentials: true,
            }
          );

          if (res.data.ok) {
            setDogs(res.data.dogs);
            console.log("서버 응답 dogs:", res.data.dogs);
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
        {/* 접속 중인 유저 목록 */}
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>
              <img
                src={`http://localhost:5000${dog.dog_image}`}
                alt={`${dog.name}의 이미지`}
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <p>이름: {dog.name}</p>
              <p>견종: {dog.breed}</p>
              <p>나이: {dog.age}</p>
              <p>성별: {dog.gender}</p>
              <p>MBTI: {dog.mbti}</p>
              <p>
                성격:{" "}
                {Array.isArray(dog.personality)
                  ? dog.personality.join(", ")
                  : JSON.parse(dog.personality).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </WalkingMateStyled>
  );
};

export default WalkingMate;
