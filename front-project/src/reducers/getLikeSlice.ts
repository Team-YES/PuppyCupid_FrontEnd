import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store/store";

interface LikeState {
  like: any;
  status: "idle" | "loading" | "success" | "fail";
  error: string | null;
}

const initialState: LikeState = {
  like: null,
  status: "idle",
  error: null,
};

// 좋아요 요청
export const AxiosGetLike = createAsyncThunk(
  "like/AxiosGetLike",
  async (url: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        url,
        {},
        {
          withCredentials: true,
        }
      );
      // console.log(res.data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Like 요청 실패");
    }
  }
);

// 슬라이스 정의
const likeStatusSlice = createSlice({
  name: "getLikeInfo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(AxiosGetLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AxiosGetLike.fulfilled, (state, action) => {
        state.status = "success";
        state.like = action.payload;
      })
      .addCase(AxiosGetLike.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload as string;
      });
  },
});

// 셀렉터
export const getLikeData = (state: RootState) => state.getLike.like;
export const getLikeStatus = (state: RootState) => state.getLike.status;
export const getLikeError = (state: RootState) => state.getLike.error;

export default likeStatusSlice.reducer;
