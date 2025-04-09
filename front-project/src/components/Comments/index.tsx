import { CommentStyled, CommentText, IconDiv, CommentPost } from "./styled";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useDispatch, useSelector } from "react-redux";
import { postComment, postReply } from "@/reducers/getCommentSlice";
import { AppDispatch, RootState } from "@/store/store";
import { CommentType } from "../Post";

type Props = {
  postId: number;
  onAddComment: (comment: CommentType) => void;
  onAddReply: (comment: CommentType) => void;
  replyTarget: { parentCommentId: number; nickName: string } | null;
};

const Comment = ({ postId, onAddComment, onAddReply, replyTarget }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  console.log("댓글컴포 replyTarget", replyTarget);

  // 답글 유저 닉네임 가져오기
  useEffect(() => {
    if (replyTarget) {
      setComment(`@${replyTarget.nickName} `);
    }
  }, [replyTarget]);

  // 답글 등록
  console.log("댓글 postId : ", postId);

  // 댓글 등록
  const [comment, setComment] = useState("");

  // 댓글 / 답글 게시
  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      let resultAction;
      // 답글이면
      if (replyTarget) {
        resultAction = await dispatch(
          postReply({
            postId,
            content: comment,
            parentCommentId: replyTarget.parentCommentId,
          })
        );
      } else {
        // 일반 댓글이면
        resultAction = await dispatch(
          postComment({ postId, content: comment })
        );
      }

      if (
        postComment.fulfilled.match(resultAction) ||
        postReply.fulfilled.match(resultAction)
      ) {
        console.log("등록 성공: ", resultAction.payload);

        const newComment = resultAction.payload;

        onAddComment(newComment); // 부모 컴포넌트로 새 댓글/답글 전달
        setComment("");
      } else {
        console.error("등록 실패: ", resultAction);
      }
    } catch (error) {
      console.error("요청 실패:", error);
    }
  };

  // const handleSubmit = async () => {
  //   if (!comment.trim()) return;

  //   try {
  //     const resultAction = await dispatch(
  //       postComment({ postId, content: comment })
  //     );

  //     if (postComment.fulfilled.match(resultAction)) {
  //       console.log("댓글 등록 성공: ", resultAction.payload);

  //       const newComment = resultAction.payload.content;

  //       onAddComment(newComment);
  //       setComment("");
  //     } else {
  //       console.error("댓글 등록 실패: ", resultAction);
  //     }
  //   } catch (error) {
  //     console.error("댓글 등록 실패:", error);
  //   }
  // };

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
