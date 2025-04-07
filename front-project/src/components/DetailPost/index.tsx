import { useRouter } from "next/router";
import { DetailPostStyled } from "./styled";
import {
  PostStyled,
  Title,
  Img,
  PostIcon,
  PostContent,
  LeftContainer,
  RightContainer,
  LikeIcon,
  DateDiv,
  LikeCont,
  FixedBox,
} from "@/components/Post/styled";

type Props = {
  postId: number;
  onClose: () => void;
};

const DetailPost = ({ postId, onClose }: Props) => {
  const router = useRouter();

  console.log("상세페이지 아이디", router.query.id);

  return (
    <DetailPostStyled>
      <div>게시물 상세임{router.query.id}</div>
    </DetailPostStyled>
  );
};

export default DetailPost;
