import React from "react";
import { PuppyProfileWrapper } from "./styled";

interface Puppy {
  name: string;
  breed: string;
  personality: string;
  age: string;
  mbti: string;
  gender: string;
  image: string;
}

interface PuppyProfileProps {
  puppyprofile: Puppy[];
}

// 중성화 여부
const formatGender = (gender: string) => {
  if (gender === "male_neutered") return " 수컷 (중성화 여부: O)";
  if (gender === "male") return " 수컷 (중성화 여부: X)";
  if (gender === "female_neutered") return " 암컷 (중성화 여부: O)";
  if (gender === "female") return " 암컷 (중성화 여부: X)";
  return " 알 수 없음";
};

const PuppyProfile = ({ puppyprofile = [] }: PuppyProfileProps) => {
  return (
    <PuppyProfileWrapper>
      <div className="PuppyProfile_AllWrap">
        {puppyprofile.map((puppy, index) => (
          <div key={index} className="PuppyProfile_card">
            <div className="PuppyProfile_puppyname PuppyProfile_text">
              <span>강아지 이름:</span> {puppy.name}
            </div>
            <div className="PuppyProfile_puppybreed PuppyProfile_text">
              <span>견종:</span> {puppy.breed}
            </div>
            <div className="PuppyProfile_puppyage PuppyProfile_text">
              <span>나이:</span> {puppy.age}살
            </div>
            <div className="PuppyProfile_puppyage PuppyProfile_text">
              <span>성별:</span>
              {puppy?.gender ? formatGender(puppy.gender) : "정보 없음"}
            </div>
            <div className="PuppyProfile_puppypersonality PuppyProfile_text">
              <span>성격: </span>
              {typeof puppy.personality === "string"
                ? JSON.parse(puppy.personality).join(", ")
                : "정보 없음"}
            </div>
            <div className="PuppyProfile_puppymbti PuppyProfile_text">
              <span>멍BTI:</span> {puppy.mbti}
            </div>
          </div>
        ))}
      </div>
    </PuppyProfileWrapper>
  );
};

export default PuppyProfile;
