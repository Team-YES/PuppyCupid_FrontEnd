import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../store/store";
import { getCookie } from "@/utils/getCookie";
import { useRouter } from "next/router";

interface LikeState {
  like: any;
  deleteLike: any;
  status: "idle" | "loading" | "success" | "fail";
  error: string | null;
}

const initialState: LikeState = {
  like: null,
  deleteLike: null,
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

// 좋아요 취소 요청
export const AxiosDeleteLike = createAsyncThunk(
  "like/AxiosDeleteLike",
  async (url: string, { rejectWithValue }) => {
    try {
      const token = getCookie("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        withCredentials: true,
      };
      const res = await axios.delete(url, config);
      return res.data.post;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || "Like 취소 실패");
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
      })

      .addCase(AxiosDeleteLike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AxiosDeleteLike.fulfilled, (state, action) => {
        state.status = "success";
        state.deleteLike = action.payload;
      })
      .addCase(AxiosDeleteLike.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.payload as string;
      });
  },
});

// 셀렉터
export const getLikeData = (state: RootState) => state.getLike.like;
export const deleteLikeData = (state: RootState) => state.getLike.deleteLike;
export const getLikeStatus = (state: RootState) => state.getLike.status;
export const getLikeError = (state: RootState) => state.getLike.error;

export default likeStatusSlice.reducer;
