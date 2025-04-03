import { useState } from "react";
import {
  PostStyled,
  Title,
  Img,
  PostIcon,
  MarginBtmDiv,
  LeftContainer,
  RightContainer,
  LikeIcon,
} from "./styled";
import type { Post } from "@/features/Board";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import {
  AxiosGetLike,
  AxiosDeleteLike,
  getLikeStatus,
} from "@/reducers/getLikeSlice";
import { AppDispatch } from "@/store/store";

type Props = {
  post: Post;
};

const PostList = ({ post }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const likeStatus = useSelector(getLikeStatus);

  // 좋아요 개수
  const [like, setLike] = useState(post.like_count);
  // 좋아요 여부
  const [isLiked, setIsLiked] = useState(false);
  // 좋아요 애니메이션
  const [animate, setAnimate] = useState(false);
  // 좋아요 클릭
  const handleLikeClick = () => {
    // 정확한 주소 필요
    const url = `http://localhost:5000/`;
    isLiked ? dispatch(AxiosDeleteLike(url)) : dispatch(AxiosGetLike(url));

    setIsLiked(!isLiked);
    setLike((value) => (isLiked ? value - 1 : value + 1));
    setAnimate(!animate);

    // UI 테스트용
    // setIsLiked((value) => !value);
    // setLike((value) => (isLiked ? value - 1 : value + 1));
    // setAnimate((value) => !value);
  };

  console.log("하위 컴포", post.images);

  // fontawesome 아이콘
  const MypageTitles = [
    { icon: "fa-regular fa-comment" },
    { icon: "fa-solid fa-share-nodes" },
  ];

  return (
    <PostStyled>
      <LeftContainer>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 10,
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              style={{ width: 50, borderRadius: "50%" }}
              src="puppy_profile.png"
            />
            <div style={{ marginLeft: 10 }}>
              <div style={{ marginBottom: 3 }}>{post.user.nickName}</div>
              <div style={{ fontSize: 13 }}>
                {/* {post.category} */}
                {post.category === "walk"
                  ? "산책메이트"
                  : post.category === "free"
                  ? "자유게시판"
                  : "유기견 임시보호 / 입양"}
              </div>
            </div>
          </div>

          <div style={{ marginRight: 10, cursor: "pointer", color: "#333" }}>
            <i className="fa-solid fa-ellipsis-h"></i>
          </div>
        </div>
        <div>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            style={{ width: "100%", height: 350 }}
          >
            {post.images.map((img, i) => (
              <SwiperSlide key={i}>
                <img
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                  src={`http://localhost:5000${img.image_url}`}
                  alt={`post_image${img.id}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </LeftContainer>

      <RightContainer>
        <div className="Post_iconContainer">
          <div className="Post_icon" onClick={handleLikeClick}>
            <LikeIcon
              className={isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart"}
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
        <div>
          <MarginBtmDiv>좋아요 {like}개</MarginBtmDiv>
          <MarginBtmDiv>{post.content}</MarginBtmDiv>
        </div>
      </RightContainer>
    </PostStyled>
  );
};

export default PostList;
