// dogSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface Dog {
  id: number;
  name: string;
  breed: string;
  personality: string;
  age: string;
  mbti: string;
  gender: string;
  image: string;
  userId: number;
}

interface DogState {
  dog: Dog | null;
  loading: boolean;
  error: string | null;
}

const initialState: DogState = {
  dog: null,
  loading: false,
  error: null,
};

export const fetchMyDog = createAsyncThunk("dog/fetchMyDog", async () => {
  const res = await axios.get("http://localhost:5000/dogs/profile", {
    withCredentials: true,
  });
  return res.data;
});

const dogSlice = createSlice({
  name: "dog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyDog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyDog.fulfilled, (state, action) => {
        state.loading = false;
        state.dog = action.payload.dog;
      })
      .addCase(fetchMyDog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "알 수 없는 오류입니다.";
      });
  },
});

export default dogSlice.reducer;
