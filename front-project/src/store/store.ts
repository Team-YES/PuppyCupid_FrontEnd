import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import getLikeReducer from "../reducers/getLikeSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    getLike: getLikeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
