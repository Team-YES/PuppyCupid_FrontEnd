import React from "react";
import { MypostCountWrapper } from "./styled";

interface MypostcountProps {
  titles: string[];
  count: number[];
}

const MypostCount = ({ titles, count }: MypostcountProps) => {
  return (
    <MypostCountWrapper>
      <div className="MypostCount_AllWrap">
        {titles.map((title, index) => (
          <div key={index} className="MypostCount_card">
            <div className="MypostCount_title">{title}</div>
            <div className="MypostCount_count">{count[index]}</div>
          </div>
        ))}
      </div>
    </MypostCountWrapper>
  );
};

export default MypostCount;
