import { configureStore, createSlice } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import getLikeReducer from "../reducers/getLikeSlice";
import dogReducer from "../reducers/dogSlice";
export const store = configureStore({
  reducer: {
    user: userReducer,
    getLike: getLikeReducer,
    dog: dogReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
