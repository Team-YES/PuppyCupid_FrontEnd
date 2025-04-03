import { EditPostModalStyled, ModalBtn } from "./styled";
import { useRouter } from "next/router";

type Props = {
  postId: number;
};

const EditPostModal = ({ postId }: Props) => {
  // 페이지 라우터
  const router = useRouter();

  console.log("EditPostModal : ", postId);

  // 수정버튼 누르면 서버에 요청

  return (
    <EditPostModalStyled>
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
    </EditPostModalStyled>
  );
};

export default EditPostModal;
