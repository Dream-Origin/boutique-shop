// src/slices/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: false,
    userInfo: null,
  },
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.userInfo = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.userInfo = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
