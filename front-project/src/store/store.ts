import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import getLikeReducer from "../reducers/getLikeSlice";
import dogReducer from "../reducers/dogSlice";
import getAllPostsReducer from "../reducers/getAllPostsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    getLike: getLikeReducer,
    dog: dogReducer,
    posts: getAllPostsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
