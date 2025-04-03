import React from "react";

interface PostData {
  id: number;
  title: string;
  likes: number;
  comments: number;
  imageUrl: string;
}

interface PostListProps {
  data: PostData[] | null;
  loading: boolean;
}

const PostList: React.FC<PostListProps> = ({ data, loading }) => {
  return (
    <div className="MyPage_board_content">
      {loading ? (
        <p>데이터 불러오는 중...</p>
      ) : data && data.length > 0 ? (
        <div className="MyPage_grid">
          {data.map((post) => (
            <div key={post.id} className="MyPage_post">
              <img
                src={post.imageUrl || "/default-image.jpg"}
                alt={post.title}
              />
              <div className="MyPage_post_info">
                <h4>{post.title}</h4>
                <p>
                  ❤️ {post.likes} | 💬 {post.comments}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>표시할 데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default PostList;
