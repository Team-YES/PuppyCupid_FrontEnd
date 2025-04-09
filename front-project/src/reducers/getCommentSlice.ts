import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Comment {
  id: number;
  content: string;
  created_at: string;
  user: any;
  parentCommentId: number | null;
}

interface CommentState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  latestComment: Comment | null;
  comments: Comment[];
  postId: string | null;
}

const initialState: CommentState = {
  status: "idle",
  error: null,
  latestComment: null,
  comments: [],
  postId: null,
};

// 답글 등록
export const postReply = createAsyncThunk(
  "comment/postReply",
  async (
    {
      postId,
      content,
      parentCommentId,
    }: {
      postId: number;
      content: string;
      parentCommentId: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/interactions/comment/${postId}`,
        {
          content,
          parentCommentId,
        },
        { withCredentials: true }
      );
      console.log("답글등록slice: ", res.data);
      return res.data.content;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "답글 등록 실패");
    }
  }
);

// 댓글 게시
export const postComment = createAsyncThunk(
  "comment/postComment",
  async (
    { postId, content }: { postId: number; content: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/interactions/comment/${postId}`,
        { content },
        { withCredentials: true }
      );

      // 성공여부 확인
      if (res.data.ok) {
        return res.data.content;
      } else {
        return rejectWithValue("댓글 등록 실패: 서버 응답 실패");
      }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "댓글 등록 중 예외 발생"
      );
    }
  }
);
//   async ({ postId, content }: { postId: number; content: string }) => {
//     const res = await axios.post(
//       `http://localhost:5000/interactions/comment/${postId}`,
//       { content },
//       { withCredentials: true }
//     );
//     console.log("댓글 slice: ", res.data);
//     return res.data;
//   }
// );

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

// 슬라이스 정의
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
      })
      .addCase(postReply.pending, (state) => {
        state.status = "loading";
      })
      .addCase(postReply.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.latestComment = action.payload;
        // state.comments = [action.payload, ...state.comments];
      })
      .addCase(postReply.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "답글 등록 실패";
      });
  },
});

export default commentSlice.reducer;
