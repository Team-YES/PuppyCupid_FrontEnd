import React from "react";
import { RightMenubarWrapper } from "./styled";
import { useRouter } from "next/router";

interface RightMenubarProps {
  titles: string[];
  paths: string[];
  onClick: () => void;
}

const RightMenubar = ({ titles, paths, onClick }: RightMenubarProps) => {
  const router = useRouter();

  const handleMenuAction = (path: string) => {
    router.push(path);
    onClick();
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
