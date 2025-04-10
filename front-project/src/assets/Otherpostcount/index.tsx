import React from "react";
import { OtherPostCountWrapper } from "./styled";

interface OtherPostcountProps {
  titles: string[];
  count: number[];
}

const OtherPostCount = ({ titles, count }: OtherPostcountProps) => {
  return (
    <OtherPostCountWrapper>
      <div className="OtherPostCount_AllWrap">
        {titles.map((title, index) => (
          <div key={index} className="OtherPostCount_card">
            <div className="OtherPostCount_title">{title}</div>
            <div className="OtherPostCount_count">{count[index]}</div>
          </div>
        ))}
      </div>
    </OtherPostCountWrapper>
  );
};

export default OtherPostCount;
