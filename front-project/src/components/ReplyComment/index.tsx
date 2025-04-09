import { ReplyCommentStyled } from "./styled";

const ReplyComment = () => {
  return (
    <ReplyCommentStyled>
      <button className="Reply_titleBtn">
        <div className="Reply_horizon"></div>
        <div className="Reply_comment">답글 보기(1개)</div>
      </button>
    </ReplyCommentStyled>
  );
};

export default ReplyComment;
