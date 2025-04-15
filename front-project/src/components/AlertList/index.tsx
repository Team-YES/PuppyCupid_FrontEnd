import React, { useState } from "react";
import { PersonFormStyle } from "./styled";
import DetailPost from "@/components/DetailPost";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

interface PostData {
  id: number;
  title: string;
  content: string | null;
  like_count: number;
  commentCount: number;
  main_image_url: string;
}

// AlertListProps 타입 수정
interface AlertListProps {
  data: any[] | null; // data의 타입을 any로 변경 (detailpage와 변수명이 달라서 any로 설정)
}

const AlertList: React.FC<AlertListProps> = ({ data }) => {
  console.log(data, "AlertList data?"); // 콘솔

  const posts = useSelector((state: RootState) => state.infinitePosts.posts);
  const loginUser = useSelector(
    (state: RootState) => state.infinitePosts.currentUser
  );

  return (
    <PersonFormStyle>
      <div className="AlertList_board_content">
        <div className="AlertList_grid">
          {(data ?? []).map((post) => (
            <div key={post.id} className="AlertList_post">
              <div className="AlertList_post_info">{post.message}</div>
            </div>
          ))}
        </div>
      </div>
    </PersonFormStyle>
  );
};

export default AlertList;
