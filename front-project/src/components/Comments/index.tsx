import { CommentStyled, CommentText, IconDiv, CommentPost } from "./styled";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { postComment } from "@/reducers/getCommentSlice";
import { AppDispatch, RootState } from "@/store/store";

type Props = {
  postId: number;
};

const Comment = ({ postId }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  // 댓글
  const [comment, setComment] = useState("");

  // 댓글 게시
  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const result = await dispatch(
        postComment({ postId, content: comment })
      ).unwrap();

      console.log("댓글 등록 성공:", result);
      setComment("");
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    }
  };

  // 이모지 열기
  const [showPicker, setShowPicker] = useState(false);

  const pickerRef = useRef<HTMLDivElement>(null);

  // 이모지 열기 함수
  const handleEmoji = (emoji: any) => {
    setComment((v) => v + emoji.native);
  };

  // 외부 클릭 시 이모지 창 닫기
  useClickOutside(pickerRef, () => setShowPicker(false));

  return (
    <CommentStyled>
      {/* 이모지 버튼 */}
      <IconDiv
        onClick={() => {
          setShowPicker(!showPicker);
        }}
      >
        <i className="fa-regular fa-face-smile"></i>
      </IconDiv>

      {/* 이모지 피커 */}
      {showPicker && (
        <div className="Comments_PickerBox" ref={pickerRef}>
          <Picker data={data} onEmojiSelect={handleEmoji} />
        </div>
      )}

      {/* 댓글 입력창 */}
      <CommentText
        placeholder="댓글 달기..."
        value={comment}
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />

      {/* 게시 버튼 */}
      <CommentPost disabled={!comment.trim()} onClick={handleSubmit}>
        게시
      </CommentPost>
    </CommentStyled>
  );
};

export default Comment;
