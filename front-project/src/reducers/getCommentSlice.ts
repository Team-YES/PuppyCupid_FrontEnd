import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const postComment = createAsyncThunk(
  "comment/postComment",
  async ({ postId, content }: { postId: number; content: string }) => {
    const res = await axios.post(
      `http://localhost:5000/interactions/comment/${postId}`,
      { content },
      { withCredentials: true }
    );
    console.log("댓글 slice: ", res.data);
    return res.data;
  }
);

interface CommentState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  latestComment: any | null; // 혹은 타입 명확히 지정
}

const initialState: CommentState = {
  status: "idle",
  error: null,
  latestComment: null,
};

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
      });
  },
});

export default commentSlice.reducer;
