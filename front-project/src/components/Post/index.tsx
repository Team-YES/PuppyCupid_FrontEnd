import { useState } from "react";
import { PostStyled, Title, Img, PostIcon, MarginBtmDiv } from "./styled";

const PostList = () => {
  // 좋아요 개수
  const [like, setLike] = useState(0);

  // fontawesome 아이콘
  const MypageTitles = [
    { icon: "fa-regular fa-heart" },
    { icon: "fa-regular fa-comment" },
    { icon: "fa-solid fa-share-nodes" },
  ];

  return (
    <PostStyled>
      <div>
        <div
          style={{ display: "flex", alignItems: "center", marginBottom: 10 }}
        >
          <img style={{ width: 50, borderRadius: "50%" }} src="/cute_cat.jpg" />
          <div style={{ marginLeft: 10 }}>
            <div style={{ marginBottom: 3 }}>닉네임</div>
            <div style={{ fontSize: 13 }}>카테고리</div>
          </div>
        </div>
        <div>
          <img
            style={{
              width: "100%",
              height: 300,
              marginBottom: 10,
            }}
            src="/cute_cat.jpg"
          />
        </div>
      </div>
      <div>
        <div className="Post_iconContainer">
          {MypageTitles.map((item, i) => (
            <div key={i} className="Post_icon">
              <PostIcon className={item.icon}></PostIcon>
            </div>
          ))}
        </div>
        <div>
          <MarginBtmDiv>좋아요 {like}개</MarginBtmDiv>
          <MarginBtmDiv>
            오늘 하루는 정말 정신없이 흘러갔다. 아침에 눈을 뜨자마자 알람 소리에
            깜짝 놀라 시계를 보니 이미 늦어버렸다. 서둘러 준비하고 집을
            나섰지만, 버스는 이미 떠나버린 뒤였다. 결국 택시를 타고 회사에
            도착했지만, 지각은 피할 수 없었다.
          </MarginBtmDiv>
          <MarginBtmDiv>댓글 작성</MarginBtmDiv>
          <MarginBtmDiv>댓글 더보기</MarginBtmDiv>
        </div>
      </div>
    </PostStyled>
  );
};

export default PostList;
