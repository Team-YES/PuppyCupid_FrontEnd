import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type Post = {
  id: number;
  title: string;
  category: string;
  like_count: number;
  liked: boolean;
  content: string;
  currentUser: number;
  created_at: string;
  main_image_url: string;
  user: {
    id: number;
    nickName: string;
    dogImage: string;
  };
  images: { image_url: string; id: number }[];
};

interface PostsState {
  posts: Post[];
  currentUser: { id: number } | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  currentUser: null,
  loading: false,
  error: null,
};

// 전체 데이터 받아오기
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      withCredentials: true,
    });
    return res.data;
  }
);

const AxiosgetPosts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    // updatePostLike(
    //   state,
    //   action: PayloadAction<{
    //     postId: number;
    //     liked: boolean;
    //     likeCount: number;
    //   }>
    // ) {
    //   const { postId, liked, likeCount } = action.payload;
    //   const post = state.posts.find((p) => p.id === postId);
    //   if (post) {
    //     post.liked = liked;
    //     post.like_count = likeCount;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.currentUser = action.payload.currentUser;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "게시물 불러오기 실패";
      });
  },
});

export default AxiosgetPosts.reducer;
// export const { updatePostLike } = AxiosgetPosts.actions;
