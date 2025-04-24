import axios from "axios";
import { EditPostModalStyled, ModalBtn } from "./styled";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import ReportModal from "@/components/ReportModal";
// import { deleteComment } from "@/reducers/getCommentSlice";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "@/store/store";
import Cookies from "js-cookie";

type Mode = "post" | "comment" | "other";

type Props = {
  mode?: Mode;
  commentId?: number;
  postId: number;
  writerId: number;
  loginUserId?: number;
  onClose: () => void;
  onDeleteComment?: (commentId: number) => void;
};

const EditPostModal = ({
  mode,
  commentId,
  postId,
  writerId,
  loginUserId,
  onClose,
  onDeleteComment,
}: Props) => {
  const router = useRouter();

  // console.log("EditPostModal : ", postId, writerId, loginUserId);

  const pickerRef = useRef<HTMLDivElement>(null);
  useClickOutside(pickerRef, onClose);

  // 채팅하기 페이지 이동
  const [isSending, setIsSending] = useState(false);

  // 신고하기
  const [showReportModal, setShowReportModal] = useState(false);

  // console.log("writerId :", writerId);
  // console.log("commentId :", commentId);

  useEffect(() => {
    // 모달이 열리면 스크롤 막기
    document.body.style.overflow = "hidden";

    // 모달이 닫히면 원래대로 복구
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // 내 게시물/ 댓글 판단
  const isMine = writerId === loginUserId;

  // 내 댓글 판단
  // const isMineComment = writerId === loginUserId;

  // console.log("댓글아이디", commentId);

  // 댓글 삭제 모드
  if (mode === "comment" && commentId) {
    return (
      <EditPostModalStyled>
        {isMine ? (
          // 내 댓글일 경우: '삭제/취소'
          <div className="EditModal_btnContainer">
            <div>
              <ModalBtn
                $danger
                onClick={() => {
                  onDeleteComment?.(commentId);
                  onClose();
                }}
              >
                삭제하기
              </ModalBtn>
            </div>
            <div className="EditPostModal_m">
              <ModalBtn onClick={onClose}>취소</ModalBtn>
            </div>
          </div>
        ) : (
          // 남의 댓글일 경우: '신고/취소'
          <div className="EditModal_btnContainer">
            <div>
              <ModalBtn
                $danger
                onClick={() => {
                  setShowReportModal(true);
                }}
              >
                신고하기
              </ModalBtn>
            </div>
            <div className="EditPostModal_m">
              <ModalBtn onClick={onClose}>취소</ModalBtn>
            </div>
          </div>
        )}
        {/* 신고하기 */}
        {showReportModal && commentId && (
          <ReportModal
            type="comment"
            targetId={commentId}
            onClose={() => setShowReportModal(false)}
          />
        )}
      </EditPostModalStyled>
    );
  }

  // 게시물 삭제 요청
  const handleDeletePost = async () => {
    const confirmDelete = confirm("게시물을 삭제하시겠습니까?");

    if (!confirmDelete) return;

    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      const token = Cookies.get("access_token");

      const res = await axios.delete(`${baseURL}/posts/${postId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log("게시물 삭제 성공 응답: ", res.data);
      // res.data : true

      alert("게시물을 삭제하였습니다.");

      router.reload();
    } catch (error) {
      console.error("게시물 삭제 에러: ", error);
    }
  };

  // 채팅 신청
  const handleChatRequest = async (receiverId: number) => {
    if (isSending) return;
    setIsSending(true);

    try {
      const baseURL = process.env.NEXT_PUBLIC_API_URL;
      const token = Cookies.get("access_token");

      const res = await axios.post(
        `${baseURL}/messages`,
        {
          receiverId,
          content: "채팅 신청합니다!",
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = `/chat?userId=${receiverId}`;
    } catch (error: any) {
      alert("채팅 요청에 실패했습니다.");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <EditPostModalStyled>
      <div className="EditModal_btnContainer" ref={pickerRef}>
        {isMine ? (
          <>
            <div>
              <ModalBtn
                onClick={() => {
                  router.push(`/post_edit/${postId}`);
                }}
              >
                수정하기
              </ModalBtn>
            </div>
            <div className="EditPostModal_m">
              <ModalBtn $danger onClick={handleDeletePost}>
                삭제하기
              </ModalBtn>
            </div>
          </>
        ) : (
          <>
            <div>
              <ModalBtn
                onClick={() => {
                  if (writerId) {
                    handleChatRequest(writerId);
                  }
                }}
              >
                채팅하기
              </ModalBtn>
            </div>
            <div>
              {/* 팔로우 누르면 팔로우 취소 */}
              <ModalBtn className="EditPostModal_m">팔로우</ModalBtn>
            </div>
            <div>
              <ModalBtn
                className="EditPostModal_m"
                $danger
                onClick={() => {
                  setShowReportModal(true);
                }}
              >
                신고하기
              </ModalBtn>
            </div>

            {/* 신고하기 */}
            {showReportModal && postId && (
              <ReportModal
                type="post"
                targetId={postId}
                onClose={() => setShowReportModal(false)}
              />
            )}
          </>
        )}
      </div>
    </EditPostModalStyled>
  );
};

export default EditPostModal;
