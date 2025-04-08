import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface CommentState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  latestComment: any | null;
  comments: any[];
  postId: string | null;
}

const initialState: CommentState = {
  status: "idle",
  error: null,
  latestComment: null,
  comments: [],
  postId: null,
};

// 댓글 게시
export const postComment = createAsyncThunk(
  "comment/postComment",
  async ({ postId, content }: { postId: number; content: string }) => {
    const res = await axios.post(
      `http://localhost:5000/interactions/comment/${postId}`,
      { content },
      { withCredentials: true }
    );
    // console.log("댓글 slice: ", res.data);
    return res.data;
  }
);

// 댓글 가져오기
export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (postId: number) => {
    const res = await axios.get(
      `http://localhost:5000/interactions/comment/${postId}`,
      { withCredentials: true }
    );
    console.log("댓글 get: ", res.data);
    return res.data;
  }
);

// 댓글 삭제
export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentId: number, { rejectWithValue }) => {
    try {
      await axios.delete(
        `http://localhost:5000/interactions/comment/${commentId}`,
        {
          withCredentials: true,
        }
      );
      console.log("삭제성공: ", commentId);
      return commentId; // 삭제 성공 시 삭제된 댓글 ID 반환
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "댓글 삭제 실패");
    }
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.latestComment = action.payload;
      })
      .addCase(postComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "댓글 작성 실패";
      })
      .addCase(fetchComments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = action.payload.comments;
        state.postId = action.payload.postId;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "댓글 불러오기 실패";
      })
      .addCase(deleteComment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "댓글 삭제 실패";
      });
  },
});

export default commentSlice.reducer;
