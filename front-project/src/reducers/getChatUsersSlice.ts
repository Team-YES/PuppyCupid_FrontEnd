import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ChatUser = {
  id: number;
  nickName: string;
  dogImage: string | null;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
};

interface ChatUsersState {
  users: ChatUser[];
}

const initialState: ChatUsersState = {
  users: [],
};

const chatUsersSlice = createSlice({
  name: "chatUsers",
  initialState,
  reducers: {
    setChatUsers: (state, action: PayloadAction<ChatUser[]>) => {
      state.users = action.payload;
    },
    clearChatUsers: (state) => {
      state.users = [];
    },
  },
});

export const { setChatUsers, clearChatUsers } = chatUsersSlice.actions;
export default chatUsersSlice.reducer;
