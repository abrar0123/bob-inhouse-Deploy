import { createSlice } from '@reduxjs/toolkit';
import { destroyCookie } from 'nookies';

const initialState = {
  token: null,
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
    logout: (state) => {
      destroyCookie(null, 'token');
      state.token = null;
    },
  },
});

export const { saveToken, removeToken, logout } = authSlice.actions;

export default authSlice.reducer;
