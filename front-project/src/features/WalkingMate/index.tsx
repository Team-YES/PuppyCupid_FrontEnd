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
        <h1>📍 주변 강아지</h1>
        <ul>
          {dogs.map((dog) => (
            <li key={dog.id}>
              <img
                src={dog.dog_image}
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
