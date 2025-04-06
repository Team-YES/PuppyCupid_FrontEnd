import { useEffect, useState } from "react";
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
} from "./styled";
import type { Post } from "@/features/Board";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { AxiosGetLike, getLikeStatus } from "@/reducers/getLikeSlice";
import { fetchMyDog } from "@/reducers/dogSlice";
import { RootState, AppDispatch } from "@/store/store";
import EditPostModal from "../EditPostModal";
import Comment from "../Comments";
import { format, differenceInDays, parseISO } from "date-fns";
import { fetchComments } from "@/reducers/getCommentSlice";

type Props = {
  post: Post;
  loginUser?: number;
};

export type CommentType = {
  id: number;
  content: string;
  created_at: string;
  user: {
    id: number;
    nickName: string;
  };
};

const PostList = ({ post, loginUser }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  // console.log("하위 컴포", post);

  // 좋아요 상태값
  const [like, setLike] = useState(post.like_count);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [animate, setAnimate] = useState(false);

  // 수정, 삭제 모달
  const [showEdit, setShowEdit] = useState(false);

  // 게시한 댓글 표시
  const [getComment, setGetComment] = useState<CommentType[]>([]);

  const handleAddComment = (newComment: CommentType) => {
    setGetComment((v) => [newComment, ...v]);
  };

  // 저장된 댓글 가져오기
  useEffect(() => {
    if (post.id) {
      dispatch(fetchComments(post.id));
    }
  }, [dispatch, post.id]);

  const allComment = useSelector((state: RootState) => state.comment.comments);

  console.log("모든 댓글: ", allComment);

  // 좋아요 요청
  const handleLikeClick = async () => {
    const url = `http://localhost:5000/interactions/like/${post.id}`;
    const result = await dispatch(AxiosGetLike(url));

    console.log("좋아요 응답 : ", result.payload);

    if (AxiosGetLike.fulfilled.match(result)) {
      const { liked, likeCount } = result.payload;
      setIsLiked(liked);
      setLike(likeCount);
      setAnimate(liked);
    }
  };

  // 게시글 작성일 표시 함수(3일 이내면 n일 전, 그 이상은 M월 d일)
  const formatPostDate = (dateString: string) => {
    const now = new Date();
    const date = parseISO(dateString);
    const diffDays = differenceInDays(now, date);

    if (diffDays <= 3) {
      return `${diffDays === 0 ? "오늘" : `${diffDays}일 전`}`;
    } else {
      return format(date, "M월 d일");
    }
  };

  // 강아지 이미지 가져오기
  useEffect(() => {
    dispatch(fetchMyDog());
  }, [dispatch]);

  const dogImg = useSelector((state: RootState) => state.dog.dog?.image);

  // fontawesome 아이콘 리스트
  const MypageTitles = [
    { icon: "fa-regular fa-comment" },
    { icon: "fa-solid fa-share-nodes" },
  ];

  return (
    <PostStyled>
      {/* 왼쪽 : 이미지 슬라이더 영역 */}
      <LeftContainer>
        <div style={{ borderTopLeftRadius: 4, borderBottomLeftRadius: 4 }}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            style={{
              width: "100%",
              height: "auto",
            }}
          >
            {post.images.map((img, i) => (
              <SwiperSlide key={i}>
                <div className="Post_SwiperBox">
                  <img
                    className="Post_swiperImg"
                    src={`http://localhost:5000${img.image_url}`}
                    alt={`post_image${img.id}`}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </LeftContainer>

      {/* 오른쪽: 유저 정보, 게시글 내용, 좋아요, 댓글 */}
      <RightContainer>
        <div className="Post_RightBox">
          {/* 작성자 정보 */}
          <div className="Post_RightBox_userInfo">
            <Img
              src={
                dogImg ? `http://localhost:5000${dogImg}` : "/puppy_profile.png"
              }
            />
            <div className="Post_user">
              <div className="Post_nickName">{post.user.nickName}</div>
              <div className="Post_category">
                {post.category === "walk"
                  ? "산책메이트"
                  : post.category === "free"
                  ? "자유게시판"
                  : "유기견 임시보호 / 입양"}
              </div>
            </div>
          </div>

          {/* ... 아이콘 */}
          <div className="Post_menu" onClick={() => setShowEdit(!showEdit)}>
            <i className="fa-solid fa-ellipsis-h"></i>
          </div>

          {/* 수정, 삭제 모달 */}
          {showEdit && (
            <EditPostModal
              postId={post.id}
              writerId={post.user.id}
              loginUserId={loginUser}
              onClose={() => setShowEdit(false)}
            />
          )}
        </div>

        {/* 게시글 내용 */}
        <PostContent>{post.content}</PostContent>

        {/* 댓글 내용 */}
        <ul>
          {getComment.map((c, i) => (
            <li key={i}>{c.content}</li>
          ))}
        </ul>

        <FixedBox>
          {/* 좋아요 + 아이콘 */}
          <div className="Post_iconContainer">
            <div className="Post_icon" onClick={handleLikeClick}>
              <LikeIcon
                className={
                  isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"
                }
                style={{ color: isLiked ? "red" : "#333" }}
                animate={animate}
              />
            </div>
            {MypageTitles.map((item, i) => (
              <div key={i} className="Post_icon">
                <PostIcon className={item.icon}></PostIcon>
              </div>
            ))}
          </div>

          {/* 좋아요 수 + 날짜 */}
          <div className="Post_content">
            <LikeCont>좋아요 {like}개</LikeCont>
            <DateDiv>{formatPostDate(post.created_at)}</DateDiv>
          </div>

          {/* 댓글 입력창 */}
          <Comment postId={post.id} onAddComment={handleAddComment} />
        </FixedBox>
      </RightContainer>
    </PostStyled>
  );
};

export default PostList;
