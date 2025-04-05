import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserInfo = {
  id: number;
  email: string;
  role: string;
  phoneNumber: string | null;
  nickName: string | null;
  gender: string | null;
  isPhoneVerified: boolean;
};

type UserState = {
  user: UserInfo | null;
  isLoggedIn: boolean;
};

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser: setReduxUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
