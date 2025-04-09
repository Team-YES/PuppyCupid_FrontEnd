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
  // page: number;
  // hasMore: boolean;
}

const initialState: PostsState = {
  posts: [],
  currentUser: null,
  loading: false,
  error: null,
  // page:1,
  // hasMore: true,
};

// 무한스크롤 추가 후 코드
// export const fetchPostsByPage = createAsyncThunk(
//   "posts/fetchPostsByPage",
//   async ({ page, limit }: { page: number; limit: number }) => {
//     const res = await axios.get("http://localhost:5000/posts", {
//       params: { page, limit },
//       withCredentials: true,
//     });
//     return res.data;
//   }
// );

// const AxiosgetPosts = createSlice({
//   name: "posts",
//   initialState,
//   reducers: {
//     updatePostLike(
//       state,
//       action: PayloadAction<{
//         postId: number;
//         liked: boolean;
//         likeCount: number;
//       }>
//     ) {
//       const post = state.posts.find((p) => p.id === action.payload.postId);
//       if (post) {
//         post.liked = action.payload.liked;
//         post.like_count = action.payload.likeCount;
//       }
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPostsByPage.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchPostsByPage.fulfilled, (state, action) => {
//         state.loading = false;
//         // 기존 post에 누적
//         state.posts = [...state.posts, ...action.payload.posts];
//         state.currentUser = action.payload.currentUser;
//         // 게시물이 더 없으면 hasmore false
//         if (action.payload.posts.length === 0) {
//           state.hasMore = false;
//         }
//       })

//       .addCase(fetchPostsByPage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message ?? "게시글 요청 실패";
//       });
//   },
// });

// 무한스크롤 전 코드
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    const res = await axios.get("http://localhost:5000/posts", {
      withCredentials: true,
    });
    console.log("getAllPostSlice", res.data);
    return res.data;
  }
);

const AxiosgetPosts = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePostLike(
      state,
      action: PayloadAction<{
        postId: number;
        liked: boolean;
        likeCount: number;
      }>
    ) {
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
export const { updatePostLike } = AxiosgetPosts.actions;
