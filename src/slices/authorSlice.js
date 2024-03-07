'use client';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAuthor = createAsyncThunk('author/fetchAuthor', async () => {
  const response = await axios.get(`/api/author`);
  return response.data;
});

const initialState = {
  author: [],
  authorLoading: null,
  authorError: null,
};

export const authorSlice = createSlice({
  name: 'authorSlice',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthor.pending, (state) => {
        state.authorLoading = true;
        state.authorError = null;
      })
      .addCase(fetchAuthor.fulfilled, (state, action) => {
        state.author = action.payload;
        state.authorLoading = false;
        state.authorError = null;
      })
      .addCase(fetchAuthor.rejected, (state, action) => {
        state.authorLoading = false;
        state.authorError = action.payload;
      });
  },
});

// export const {} = userSlice.actions;

export default authorSlice.reducer;
