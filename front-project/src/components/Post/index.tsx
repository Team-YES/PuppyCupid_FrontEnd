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

type Props = {
  post: Post;
  loginUser?: number;
};

const PostList = ({ post, loginUser }: Props) => {
  console.log("하위 컴포", post);

  // 좋아요 리듀서
  const dispatch = useDispatch<AppDispatch>();
  const likeStatus = useSelector(getLikeStatus);

  // 좋아요 개수
  const [like, setLike] = useState(post.like_count);
  // 좋아요 여부
  const [isLiked, setIsLiked] = useState(post.liked);
  // 좋아요 애니메이션
  const [animate, setAnimate] = useState(false);

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

  // 수정, 삭제 모달
  const [showEdit, setShowEdit] = useState(false);

  // fontawesome 아이콘
  const MypageTitles = [
    { icon: "fa-regular fa-comment" },
    { icon: "fa-solid fa-share-nodes" },
  ];

  // 게시글 등록 날짜 표시
  const formatPostDate = (dateString: string) => {
    const now = new Date();
    const date = parseISO(dateString);
    const diffDays = differenceInDays(now, date);

    if (diffDays <= 4) {
      return `${diffDays === 0 ? "오늘" : `${diffDays}일 전`}`;
    } else {
      return format(date, "M월 d일");
    }
  };

  // 강아지 정보 - 이미지
  useEffect(() => {
    dispatch(fetchMyDog());
  }, [dispatch]);

  const dogImg = useSelector((state: RootState) => state.dog.dog?.image);

  return (
    <PostStyled>
      <LeftContainer>
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            style={{ width: "100%", height: "500px" }}
          >
            {post.images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  className="Post_swiperImg"
                  src={`http://localhost:5000${img.image_url}`}
                  alt={`post_image${img.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </LeftContainer>

      <RightContainer>
        <div className="Post_RightBox">
          <div className="Post_RightBox_userInfo">
            <Img src={`http://localhost:5000${dogImg}`} />
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

          <div className="Post_menu" onClick={() => setShowEdit(!showEdit)}>
            <i className="fa-solid fa-ellipsis-h"></i>
          </div>
          {/* 수정, 삭제 모달 */}
          {showEdit && (
            <EditPostModal
              postId={post.id}
              writerId={post.user.id}
              loginUserId={loginUser}
            />
          )}
        </div>

        <PostContent>{post.content}</PostContent>
        <FixedBox>
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
          <div className="Post_content">
            <LikeCont>좋아요 {like}개</LikeCont>
            <DateDiv>{formatPostDate(post.created_at)}</DateDiv>
          </div>
          {/* 댓글 */}
          <Comment />
        </FixedBox>
      </RightContainer>
    </PostStyled>
  );
};

export default PostList;
