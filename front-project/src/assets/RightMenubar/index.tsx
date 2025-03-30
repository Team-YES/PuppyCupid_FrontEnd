import React from "react";
import { RightMenubarWrapper } from "./styled";
import { useRouter } from "next/router";

interface RightMenubarProps {
  titles: string[];
  paths: string[];
}

const RightMenubar = ({ titles, paths }: RightMenubarProps) => {
  const router = useRouter();

  const handleMenuAction = (path: string) => {
    router.push(path);
  };
  return (
    <RightMenubarWrapper>
      <div className="RightMenubar_AllWrap">
        {titles.map((title, index) => (
          <div
            key={index}
            className="RightMenubar_card"
            onClick={() => handleMenuAction(paths[index])} // 클릭 시 경로로 이동
          >
            <div className="RightMenubar_title">{title}</div>
          </div>
        ))}
      </div>
    </RightMenubarWrapper>
  );
};

export default RightMenubar;
