import { EditPostModalStyled, ModalBtn } from "./styled";
import { useRouter } from "next/router";

type Props = {
  postId: number;
  writerId: number;
  loginUserId?: number;
};

const EditPostModal = ({ postId, writerId, loginUserId }: Props) => {
  const router = useRouter();

  console.log("EditPostModal : ", postId, writerId, loginUserId);

  // 현재 사이트를 보고 있는 유저의 아이디(임시)
  // const writerId = 2;

  // 내 게시물 판단
  const isMine = writerId === loginUserId;

  // 삭제 요청
  const handleDeletePost = () => {};

  return (
    <EditPostModalStyled>
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
            <ModalBtn>삭제</ModalBtn>
          </div>
        </>
      ) : (
        <>
          <div>
            <ModalBtn
              onClick={() => {
                router.push("/chat");
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
