import { CommentStyled, CommentText, IconDiv, CommentPost } from "./styled";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

const Comment = () => {
  // 이모지 열기
  const [showPicker, setShowPicker] = useState(false);
  const [comment, setComment] = useState("");

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
      <CommentPost disabled={!comment.trim()}>게시</CommentPost>
    </CommentStyled>
  );
};

export default Comment;
