import React from "react";
import { PersonFormStyle } from "./styled";

interface PostData {
  id: number;
  title: string;
  content: string;
  like_count: number;
  commentCount: number;
  main_image_url: string;
}

interface PostListProps {
  data: PostData[] | null;
}

const PostList: React.FC<PostListProps> = ({ data }) => {
  console.log(data, "data?");
  return (
    <PersonFormStyle>
      <div className="PostList_board_content">
        <div className="PostList_grid">
          {(data ?? []).map((post) => (
            <div key={post.id} className="PostList_post">
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
                    {post.commentCount}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PersonFormStyle>
  );
};

export default PostList;
