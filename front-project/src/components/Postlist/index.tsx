import React, { useState } from "react";
import { PersonFormStyle } from "./styled";
import DetailPost from "@/components/DetailPost";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface PostData {
  id: number;
  title: string;
  content: string;
  like_count: number;
  commentCount: number;
  main_image_url: string;
}

// PostListProps 타입 수정
interface PostListProps {
  data: any[] | null; // data의 타입을 any로 변경 (detailpage와 변수명이 달라서 any로 설정)
}

const PostList: React.FC<PostListProps> = ({ data }) => {
  console.log(data, "data?"); // 콘솔

  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const posts = useSelector((state: RootState) => state.infinitePosts.posts);
  const loginUser = useSelector(
    (state: RootState) => state.infinitePosts.currentUser
  );

  // const selectedPost = selectedPostId
  //   ? posts.find((post) => post.id === selectedPostId)
  //   : null;
  const selectedPost = selectedPostId
    ? (data ?? []).find((post) => post.id === selectedPostId)
    : null;

  const handleCloseModal = () => {
    setSelectedPostId(null);
  };

  return (
    <PersonFormStyle>
      <div className="PostList_board_content">
        <div className="PostList_grid">
          {(data ?? []).map((post) => (
            <div
              key={post.id}
              className="PostList_post"
              onClick={() => setSelectedPostId(post.id)}
            >
              <img
                src={
                  post.main_image_url
                    ? `http://localhost:5000${post.main_image_url}`
                    : "/puppy_profile.png"
                }
                alt={
                  post.content.length > 10
                    ? post.content.slice(0, 10) + "..."
                    : post.content
                }
              />
              <div className="PostList_post_info">
                <p>
                  <span>
                    <i className="fa-solid fa-heart"></i> {post.like_count}
                  </span>
                  <span>
                    <i className="fa-solid fa-comment"></i>
                    {post.comment_count}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 상세 게시글 모달 */}
      {selectedPost && (
        <DetailPost
          post={selectedPost}
          loginUser={loginUser?.id}
          onClose={handleCloseModal}
        />
      )}
    </PersonFormStyle>
  );
};

export default PostList;
