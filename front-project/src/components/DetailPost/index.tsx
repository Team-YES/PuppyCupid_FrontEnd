import { useRouter } from "next/router";
import {
  DetailPostStyled,
  DetailPostBox,
  Detail_LeftContainer,
  Detail_RightContainer,
  DetailLikeIcon,
  DetailPostIcon,
} from "./styled";
import { DateDiv, LikeCont } from "@/components/Post/styled";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchComments } from "@/reducers/getCommentSlice";
import { AxiosGetLike } from "@/reducers/getLikeSlice";
import { format, differenceInDays, parseISO } from "date-fns";
import { Navigation, Pagination } from "swiper/modules";
import type { Post } from "@/features/Board";
import type { CommentType } from "@/components/Post";
import { fetchMyDog } from "@/reducers/dogSlice";
import EditPostModal from "../EditPostModal";
import Comment from "../Comments";
import { useClickOutside } from "@/hooks/useClickOutside";
import { formatPostDate } from "@/utils/formatDate";

type Props = {
  post: Post;
  commentType?: CommentType;
  loginUser?: number;
  isDetailPage?: boolean;
  onClose: () => void;
};

const DetailPost = ({
  post,
  commentType,
  loginUser,
  isDetailPage,
  onClose,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  console.log("상세 컴포", post);

  // 좋아요 상태값
  const [like, setLike] = useState(post.like_count);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [animate, setAnimate] = useState(false);

  // 수정, 삭제 모달
  const [showEdit, setShowEdit] = useState(false);

  // 게시한 댓글 표시
  const [getComment, setGetComment] = useState<CommentType[]>([]);

  console.log("getComment :", getComment);

  const handleAddComment = (newComment: CommentType) => {
    setGetComment((v) => [newComment, ...v]);
  };

  // 1. 저장된 댓글 가져오기
  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, [dispatch, post.id]);

  const { comments, postId } = useSelector((state: RootState) => state.comment);

  const allComment = [...comments];

  console.log("모든 댓글: ", allComment);

  // 2. allComment -> getComment 반영
  useEffect(() => {
    if (postId === String(post.id) && comments.length > 0) {
      setGetComment(comments);
    }
  }, [comments, postId, post.id]);

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

  const router = useRouter();

  // 외부영역 클릭 시 창닫기
  const pickerRef = useRef<HTMLDivElement>(null);
  useClickOutside(pickerRef, onClose);

  return (
    <DetailPostStyled>
      <DetailPostBox ref={pickerRef}>
        {/* 왼쪽 : 이미지 슬라이더 영역 */}
        <Detail_LeftContainer>
          <div>
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
        </Detail_LeftContainer>

        {/* 오른쪽: 유저 정보, 게시글 내용, 좋아요, 댓글 */}
        <Detail_RightContainer>
          <div className="Post_RightBox">
            {/* 작성자 정보 */}
            <div className="Post_RightBox_userInfo">
              <div className="Detail_imgBox">
                <img
                  className="Detail_img"
                  src={
                    dogImg
                      ? `http://localhost:5000${dogImg}`
                      : "/puppy_profile.png"
                  }
                />
              </div>

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
            <div
              className="Post_menu"
              onClick={(e) => {
                e.stopPropagation();
                setShowEdit(!showEdit);
              }}
            >
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
          <div className="Detail_content">
            <div className="Detail_contBox">
              <div className="Detail_contImg">
                <div className="Detail_imgBox">
                  <img
                    className="Detail_img"
                    src={
                      dogImg
                        ? `http://localhost:5000${dogImg}`
                        : "/puppy_profile.png"
                    }
                  />
                </div>
              </div>
              <div className="Detail_Info">
                <div className="Detail_Info_box">
                  <div className="Post_nickName">{post.user.nickName}</div>
                  <div className="Detail_pc">{post.content}</div>
                  <DateDiv>{formatPostDate(post.created_at)}</DateDiv>
                </div>
              </div>
            </div>

            {/* 댓글 내용 */}
            <div className="Detail_contBox">
              <div className="Detail_Info">
                {getComment.map((c, i) => (
                  <div key={i} className="Detail_commenter">
                    <div className="Detail_contImg">
                      <div className="Detail_imgBox">
                        <img
                          className="Detail_img"
                          src={
                            dogImg
                              ? `http://localhost:5000${dogImg}`
                              : "/puppy_profile.png"
                          }
                        />
                      </div>
                    </div>
                    <div style={{ paddingTop: 5 }}>
                      <div className="Post_nickName">{c.user.nickName}</div>
                      <span className="Detail_pc">{c.content}</span>
                      <div className="Detail_day">
                        <DateDiv>{formatPostDate(c.created_at)}</DateDiv>
                        <span className="Detail_span">답글 달기</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            {/* 좋아요 + 아이콘 */}
            <div className="Post_iconContainer">
              <div
                className="Post_icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleLikeClick();
                }}
              >
                <DetailLikeIcon
                  className={
                    isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"
                  }
                  style={{ color: isLiked ? "red" : "#333" }}
                  animate={animate}
                />
              </div>
              {MypageTitles.map((item, i) => (
                <div key={i} className="Post_icon">
                  <DetailPostIcon className={item.icon}></DetailPostIcon>
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
          </div>
        </Detail_RightContainer>
      </DetailPostBox>
    </DetailPostStyled>
  );
};

export default DetailPost;
