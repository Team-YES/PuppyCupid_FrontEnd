import React from "react";
import { PuppyProfileWrapper } from "./styled";

interface Puppy {
  name: string;
  breed: string;
  personality: string;
  mbti: string;
  age: number;
  gender: string;
}

interface PuppyProfileProps {
  puppyprofile: Puppy[];
}

const PuppyProfile = ({ puppyprofile }: PuppyProfileProps) => {
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
              <span>성별:</span> {puppy.gender}
            </div>
            <div className="PuppyProfile_puppypersonality PuppyProfile_text">
              <span>성격:</span> {puppy.personality}
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
