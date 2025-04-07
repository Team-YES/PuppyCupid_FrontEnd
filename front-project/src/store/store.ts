import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import getLikeReducer from "../reducers/getLikeSlice";
import dogReducer from "../reducers/dogSlice";
import getAllPostsReducer from "../reducers/getAllPostsSlice";
import getCommentReducer from "../reducers/getCommentSlice";
import getChatUsersReducer from "../reducers/getChatUsersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    getLike: getLikeReducer,
    dog: dogReducer,
    posts: getAllPostsReducer,
    comment: getCommentReducer,
    chatUsers: getChatUsersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
