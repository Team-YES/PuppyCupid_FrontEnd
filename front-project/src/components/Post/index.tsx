import { PostStyled, Title, Img, Writer } from "./styled";

const PostList = () => {
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
          <div>
            <Writer>닉네임</Writer>
            <div>카테고리</div>
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
              <i className={item.icon}></i>
            </div>
          ))}
        </div>
        <div>
          <div>좋아요 55개</div>
          <div>내용</div>
          <div>댓글 작성</div>
          <div>댓글 더보기</div>
        </div>
      </div>
    </PostStyled>
  );
};

export default PostList;
