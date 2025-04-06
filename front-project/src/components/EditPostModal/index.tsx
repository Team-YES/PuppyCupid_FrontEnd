import axios from "axios";
import { EditPostModalStyled, ModalBtn } from "./styled";
import { useRouter } from "next/router";
import { useRef } from "react";
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
  const handleChatRequest = async (receiverId: number) => {
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

      console.log("채팅 생성 성공!", res.data);

      window.location.href = `/chat?userId=${receiverId}`;
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error("채팅 요청 실패:", error.response?.data || error.message);
      } else {
        console.error("예상치 못한 에러:", error);
      }
      alert("채팅 요청에 실패했습니다.");
    }
  };

  return (
    <EditPostModalStyled ref={pickerRef}>
      {isMine ? (
        <>
          <div>
            <ModalBtn
              onClick={() => {
                router.push(`/post_edit/${postId}`);
              }}
            >
              수정
            </ModalBtn>
          </div>
          <div className="EditPostModal_m">
            <ModalBtn onClick={handleDeletePost}>삭제</ModalBtn>
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
            <ModalBtn className="EditPostModal_m" $danger>
              신고하기
            </ModalBtn>
          </div>
        </>
      )}
    </EditPostModalStyled>
  );
};

export default EditPostModal;
