import { useState } from "react";
import { ReplyCommentStyled } from "./styled";

type Props = {
  replyCount: number;
  isOpen: boolean;
  onClick: () => void;
  children: React.ReactNode;
};

const ReplyComment = ({ replyCount, isOpen, onClick, children }: Props) => {
  if (replyCount === 0) return null;

  return (
    <ReplyCommentStyled>
      <button className="Reply_titleBtn" onClick={onClick}>
        <div className="Reply_horizon"></div>
        <div className="Reply_comment">
          {isOpen ? "답글 숨기기" : `답글 보기(${replyCount}개)`}
        </div>
      </button>
      {isOpen && <div className="Reply_content">{children}</div>}
    </ReplyCommentStyled>
  );
};

export default ReplyComment;
