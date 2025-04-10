import { useRouter } from "next/router";
import {
  DetailPostStyled,
  DetailPostBox,
  Detail_LeftContainer,
  Detail_RightContainer,
  DetailLikeIcon,
  ReplyCommentDiv,
} from "./styled";
import { DateDiv, LikeCont } from "@/components/Post/styled";
import ReplyComment from "@/components/ReplyComment";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchComments } from "@/reducers/getCommentSlice";
import { AxiosGetLike } from "@/reducers/getLikeSlice";
import { updatePostLike } from "@/reducers/getAllPostsSlice";
import { Navigation, Pagination } from "swiper/modules";
import type { Post } from "@/features/Board";
import type { CommentType } from "@/components/Post";
import EditPostModal from "../EditPostModal";
import Comment from "../Comments";
import { useClickOutside } from "@/hooks/useClickOutside";
import { formatPostDate } from "@/utils/formatDate";
import { deleteComment } from "@/reducers/getCommentSlice";
import KakaoShare from "@/components/KakaoShare";

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
  // console.log("로그인아이디:", loginUser);

  // 좋아요 상태값
  const [like, setLike] = useState(post.like_count);
  const [isLiked, setIsLiked] = useState(post.liked);
  const [animate, setAnimate] = useState(false);

  // 수정, 삭제 모달
  const [showEdit, setShowEdit] = useState(false);

  // 댓글 모달
  const [selectedCommentId, setSelectedCommentId] = useState<number | null>(
    null
  );

  // 답글 보기
  const [openReplies, setOpenReplies] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleReplyVisibility = (commentId: number) => {
    setOpenReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  // 게시한 댓글 표시
  const [getComment, setGetComment] = useState<CommentType[]>([]);

  const handleAddComment = (newComment: CommentType) => {
    setGetComment((v) => [newComment, ...v]);
  };

  console.log("상세컴포 댓글 :", getComment);

  // 게시한 답글 표시
  const handleAddReply = (newComment: CommentType) => {
    setGetComment((v) => [...v, newComment]);
  };

  // 1. 저장된 댓글 가져오기
  useEffect(() => {
    dispatch(fetchComments(post.id));
  }, [dispatch, post.id]);

  const { comments, postId } = useSelector((state: RootState) => state.comment);
  // 유저 정보 가져오기
  const user = useSelector((state: RootState) => state.user);

  // const allComment = [...comments];

  // console.log("모든 댓글: ", allComment);

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

      dispatch(updatePostLike({ postId: post.id, liked, likeCount }));
    }
  };

  // '답글 달기' 클릭
  const [replyTarget, setReplyTarget] = useState<{
    parentCommentId: number;
    nickName: string;
  } | null>(null);

  // fontawesome 아이콘 리스트
  const MypageTitles = [
    { icon: "fa-regular fa-comment" },
    { icon: "fa-solid fa-share-nodes" },
  ];

  const router = useRouter();

  // 외부영역 클릭 시 창닫기
  const pickerRef = useRef<HTMLDivElement>(null);
  useClickOutside(pickerRef, onClose);

  // 댓글 삭제 요청
  const onDeleteComment = async (commentId: number) => {
    const confirmed = confirm("댓글을 삭제하시겠습니까?");
    if (confirmed && commentId) {
      await dispatch(deleteComment(commentId));
      alert("댓글 삭제를 완료하였습니다.");
    }
  };

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
              <div
                className="Detail_imgBox"
                onClick={() =>
                  router.push(
                    post.user.id === user.user?.id
                      ? "/mypage"
                      : `/otherpage/${post.user.id}`
                  )
                }
              >
                <img
                  className="Detail_img"
                  src={
                    post.user.dogImage
                      ? `http://localhost:5000${post.user.dogImage}`
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
                mode="post"
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
                <div
                  className="Detail_imgBox"
                  onClick={() =>
                    router.push(
                      post.user.id === user.user?.id
                        ? "/mypage"
                        : `/otherpage/${post.user.id}`
                    )
                  }
                >
                  <img
                    className="Detail_img"
                    // src={imageSrc}
                    src={
                      post.user.dogImage
                        ? `http://localhost:5000${post.user.dogImage}`
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
                {getComment
                  .filter((c) => c.parentCommentId === null) // 댓글만
                  .map((comment) => {
                    // console.log("comment", comment);
                    const replies = getComment.filter(
                      (reply) => reply.parentCommentId === comment.id
                    );

                    return (
                      <div key={comment.id}>
                        {/* 댓글 본문 */}
                        <div className="Detail_commenter">
                          <div className="Detail_contImg">
                            <div
                              className="Detail_imgBox"
                              onClick={() =>
                                router.push(
                                  post.user.id === user.user?.id
                                    ? "/mypage"
                                    : `/otherpage/${post.user.id}`
                                )
                              }
                            >
                              <img
                                className="Detail_img"
                                src={
                                  comment.user.dogImage
                                    ? `http://localhost:5000${comment.user.dogImage}`
                                    : "/puppy_profile.png"
                                }
                              />
                            </div>
                          </div>
                          <div style={{ paddingTop: 5 }}>
                            <div className="Post_nickName">
                              {comment.user.nickName}
                            </div>
                            <span className="Detail_pc">{comment.content}</span>
                            <div className="Detail_day">
                              <DateDiv>
                                {formatPostDate(comment.created_at)}
                              </DateDiv>
                              <span
                                className="Detail_span"
                                onClick={() =>
                                  setReplyTarget({
                                    parentCommentId: comment.id,
                                    nickName: comment.user.nickName,
                                  })
                                }
                              >
                                답글 달기
                              </span>
                              <div
                                className="Detail_dayDiv"
                                onClick={() => setSelectedCommentId(comment.id)}
                              >
                                <i className="fa-solid fa-ellipsis-h"></i>
                              </div>
                              {selectedCommentId !== null && (
                                <EditPostModal
                                  mode="comment"
                                  postId={post.id}
                                  commentId={selectedCommentId}
                                  writerId={
                                    getComment.find(
                                      (c) => c.id === selectedCommentId
                                    )?.user.id || 0
                                  } // 댓글 작성자의 ID
                                  loginUserId={loginUser}
                                  onClose={() => setSelectedCommentId(null)}
                                  onDeleteComment={onDeleteComment}
                                />
                              )}
                            </div>
                          </div>
                        </div>

                        {/* 답글 토글 & 표시 */}
                        {replies.length > 0 && (
                          <ReplyComment
                            replyCount={replies.length}
                            isOpen={openReplies[comment.id]}
                            onClick={() => toggleReplyVisibility(comment.id)}
                          >
                            {replies.map((reply) => (
                              <div
                                key={reply.id}
                                className="Detail_commenter"
                                style={{ marginLeft: "60px" }}
                              >
                                <div className="Detail_contImg">
                                  <div
                                    className="Detail_imgBox"
                                    onClick={() =>
                                      router.push(
                                        post.user.id === user.user?.id
                                          ? "/mypage"
                                          : `/otherpage/${post.user.id}`
                                      )
                                    }
                                  >
                                    <img
                                      className="Detail_img"
                                      src={
                                        reply.user.dogImage
                                          ? `http://localhost:5000${reply.user.dogImage}`
                                          : "/puppy_profile.png"
                                      }
                                    />
                                  </div>
                                </div>
                                <div>
                                  <div className="Post_nickName">
                                    {reply.user.nickName}
                                  </div>
                                  <span
                                    style={{
                                      fontWeight: 400,
                                      color: "rgb(0,55,107)",
                                    }}
                                  >
                                    @{comment.user.nickName}
                                  </span>
                                  <span className="Detail_pc">
                                    {reply.content}
                                  </span>
                                  <div className="Detail_day">
                                    <DateDiv>
                                      {formatPostDate(reply.created_at)}
                                    </DateDiv>
                                    <span
                                      className="Detail_span"
                                      onClick={() =>
                                        setReplyTarget({
                                          parentCommentId: comment.id,
                                          nickName: comment.user.nickName,
                                        })
                                      }
                                    >
                                      답글 달기
                                    </span>
                                    <div
                                      className="Detail_dayDiv"
                                      onClick={() =>
                                        setSelectedCommentId(reply.id)
                                      }
                                    >
                                      <i className="fa-solid fa-ellipsis-h"></i>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </ReplyComment>
                        )}
                      </div>
                    );
                  })}
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
              <div className="Post_icon">
                <i className="fa-regular fa-comment"></i>
              </div>
              <KakaoShare
                title={post.user.nickName}
                description={post.content}
                imageUrl={`http://localhost:5000${post.main_image_url}`}
                url={typeof window !== "undefined" ? window.location.href : ""}
              />
              {/* <div className="Post_icon">
                <i className="fa-solid fa-share-nodes"></i>
              </div> */}
            </div>

            {/* 좋아요 수 + 날짜 */}
            <div className="Post_content">
              <LikeCont>좋아요 {like}개</LikeCont>
              <DateDiv>{formatPostDate(post.created_at)}</DateDiv>
            </div>

            {/* 댓글 입력창 */}
            <Comment
              postId={post.id}
              onAddComment={handleAddComment}
              onAddReply={handleAddReply}
              replyTarget={replyTarget}
            />
          </div>
        </Detail_RightContainer>
      </DetailPostBox>
    </DetailPostStyled>
  );
};

export default DetailPost;
