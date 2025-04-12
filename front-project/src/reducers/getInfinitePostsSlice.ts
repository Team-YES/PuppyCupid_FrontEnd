import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
  category: string;
  like_count: number;
  liked: boolean;
  comment_count: number;
  main_image_url: string;
  created_at: string;
  user: {
    id: number;
    nickName: string;
    dogImage: string;
  };
  images: { image_url: string; id: number }[];
}

interface CurrentUser {
  id: number;
}

interface InfinitePostsState {
  posts: Post[];
  page: number;
  hasMore: boolean;
  totalCount: number;
  loading: boolean;
  error: string | null;
  currentUser: CurrentUser | null;
}

const initialState: InfinitePostsState = {
  posts: [],
  page: 1,
  hasMore: true,
  totalCount: 0,
  loading: false,
  error: null,
  currentUser: null,
};

// 무한스크롤
export const fetchPostsByPage = createAsyncThunk(
  "posts/fetchPostsByPage",
  async ({ page, limit }: { page: number; limit: number }) => {
    console.log("📦 API 요청 실행 - page:", page);
    const res = await axios.get("http://localhost:5000/posts", {
      params: { page, limit },
      withCredentials: true,
    });
    console.log("무한스크롤slice:", res.data);
    return res.data;
  }
);

const getAllPostsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    resetPosts: (state) => {
      state.posts = [];
      state.page = 1;
      state.hasMore = true;
      state.totalCount = 0;
      state.loading = false;
      state.error = null;
      state.currentUser = null;
    },
    updatePostLike: (
      state,
      action: PayloadAction<{
        postId: number;
        liked: boolean;
        likeCount: number;
      }>
    ) => {
      const { postId, liked, likeCount } = action.payload;
      const post = state.posts.find((p) => p.id === postId);
      if (post) {
        post.liked = liked;
        post.like_count = likeCount;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsByPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsByPage.fulfilled, (state, action) => {
        const { posts, currentUser, totalCount, hasMore } = action.payload;

        // 중복 필터링
        const uniquePosts = posts.filter(
          (post: Post) =>
            !state.posts.some((existing) => existing.id === post.id)
        );

        state.posts.push(...uniquePosts);
        state.currentUser = currentUser;
        state.totalCount = totalCount;
        state.hasMore = hasMore;
        // state.page += 1;
        if (hasMore && uniquePosts.length > 0) {
          console.log("state.page", state.page);
          state.page += 1;
          console.log("state.page2", state.page);
        }
        state.loading = false;
      })
      .addCase(fetchPostsByPage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "데이터 로딩 실패";
      });
  },
});

export const { resetPosts } = getAllPostsSlice.actions;
export default getAllPostsSlice.reducer;
export const { updatePostLike } = getAllPostsSlice.actions;
