import { useEffect, useState } from "react";
import {
  PostStyled,
  PostIcon,
  PostContent,
  LeftContainer,
  RightContainer,
  LikeIcon,
  DateDiv,
  LikeCont,
} from "./styled";
import type { Post } from "@/features/Board";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyDog } from "@/reducers/dogSlice";
import { RootState, AppDispatch } from "@/store/store";
import { format, differenceInDays, parseISO } from "date-fns";
import { useRouter } from "next/router";

type Props = {
  post: Post;
  // currentUser: number;
  loginUser?: number;
  isDetailPage?: boolean;
  onClick?: () => void;
  // currentUser: number;
};

export type CommentType = {
  parentCommentId: number | null;
  id: number;
  content: string;
  created_at: string;
  user: {
    dogImage: any;
    id: number;
    nickName: string;
  };
};

const PostList = ({ post, loginUser, isDetailPage, onClick }: Props) => {
  const dispatch = useDispatch<AppDispatch>();

  console.log("하위 컴포", post);

  const [animate, setAnimate] = useState(false);

  // 좋아요 redux반영
  const postFromStore = useSelector((state: RootState) =>
    state.posts.posts.find((p) => p.id === post.id)
  );

  const likeCount = postFromStore?.like_count ?? post.like_count;
  const isLiked = postFromStore?.liked ?? post.liked;

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

  const router = useRouter();

  return (
    <PostStyled
      onClick={() => {
        if (!isDetailPage) {
          onClick?.();
        }
      }}
      style={{ cursor: isDetailPage ? "default" : "pointer" }}
    >
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
            <div className="Post_ImgBox">
              <img
                className="Post_Img"
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
          {/* <div
            className="Post_menu"
            onClick={(e) => {
              e.stopPropagation();
              setShowEdit(!showEdit);
            }}
          >
            <i className="fa-solid fa-ellipsis-h"></i>
          </div> */}

          {/* 수정, 삭제 모달 */}
          {/* {showEdit && (
            <EditPostModal
              postId={post.id}
              writerId={post.user.id}
              loginUserId={loginUser}
              onClose={() => setShowEdit(false)}
            />
          )} */}
        </div>

        {/* 게시글 내용 */}
        <PostContent>
          <div className="Post_ClampText">{post.content}</div>
          <div className="Post_more">본문 더보기</div>
          <div className="Post_comment">댓글 {post.comment_count}개</div>
        </PostContent>

        {/* 댓글 내용 */}
        {/* <div>
          <ul>
            {getComment.map((c, i) => (
              <li key={i}>{c.content}</li>
            ))}
          </ul>
        </div> */}

        <div>
          {/* 좋아요 + 아이콘 */}
          <div className="Post_iconContainer">
            <div
              className="Post_icon"
              // onClick={(e) => {
              //   e.stopPropagation();
              //   handleLikeClick();
              // }}
            >
              <LikeIcon
                className={
                  isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"
                }
                style={{ color: isLiked ? "red" : "#333" }}
                animate={animate}
              />
            </div>
            {/* {MypageTitles.map((item, i) => (
              <div key={i} className="Post_icon">
                <PostIcon className={item.icon}></PostIcon>
              </div>
            ))} */}
            <div className="Post_icon">
              <PostIcon className="fa-regular fa-comment"></PostIcon>
            </div>
            <div className="Post_icon">
              <PostIcon className="fa-solid fa-share-nodes"></PostIcon>
            </div>
          </div>

          {/* 좋아요 수 + 날짜 */}
          <div className="Post_content">
            <LikeCont>좋아요 {likeCount}개</LikeCont>
            <DateDiv>{formatPostDate(post.created_at)}</DateDiv>
          </div>

          {/* 댓글 입력창 */}
          {/* <Comment postId={post.id} onAddComment={handleAddComment} /> */}
        </div>
      </RightContainer>
    </PostStyled>
  );
};

export default PostList;
