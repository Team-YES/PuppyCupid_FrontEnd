import axios from "axios";
import { EditPostModalStyled, ModalBtn } from "./styled";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";

type Props = {
  postId: number;
  writerId: number;
  loginUserId?: number;
  onClose: () => void;
};

const EditPostModal = ({ postId, writerId, loginUserId, onClose }: Props) => {
  const router = useRouter();

  console.log("EditPostModal : ", postId, writerId, loginUserId);

  const pickerRef = useRef<HTMLDivElement>(null);
  useClickOutside(pickerRef, onClose);

  // 내 게시물 판단
  const isMine = writerId === loginUserId;

  // 삭제 요청
  const handleDeletePost = async () => {
    const confirmDelete = confirm("게시물을 삭제하시겠습니까?");

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(`http://localhost:5000/posts/${postId}`, {
        withCredentials: true,
      });
      console.log("게시물 삭제 성공 응답: ", res.data);
      // res.data : true

      alert("게시물을 삭제하였습니다.");

      router.reload();
    } catch (error) {
      console.error("게시물 삭제 에러: ", error);
    }
  };

  // 채팅하기 페이지 이동
  const [isSending, setIsSending] = useState(false);

  const handleChatRequest = async (receiverId: number) => {
    if (isSending) return;
    setIsSending(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/messages",
        {
          receiverId,
          content: "채팅 신청합니다!",
        },
        {
          withCredentials: true,
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

  useEffect(() => {
    // 모달이 열리면 스크롤 막기
    document.body.style.overflow = "hidden";

    // 모달이 닫히면 원래대로 복구
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <EditPostModalStyled>
      {isMine ? (
        <div className="EditModal_btnContainer" ref={pickerRef}>
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
        </div>
      ) : (
        <div className="EditModal_btnContainer">
          <div ref={pickerRef}>
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
            <ModalBtn className="EditPostModal_m" $danger>
              신고하기
            </ModalBtn>
          </div>
        </div>
      )}
    </EditPostModalStyled>
  );
};

export default EditPostModal;
