import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string;
}

const initialState: UserState = {
  name: "kim",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    resetName: (state) => {
      state.name = "kim";
    },
  },
});

export const { setName, resetName } = userSlice.actions;
export default userSlice.reducer;
