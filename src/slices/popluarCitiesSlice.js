'use client';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPopularCities = createAsyncThunk(
  'popularCities/fetchPopularCities',
  async () => {
    const response = await axios.get(`/api/popular-cities`);
    return response.data;
  },
);

const initialState = {
  popularCities: [],
  popularCitiesLoading: null,
  popularCitiesError: null,
};

export const popluarCitiesSlice = createSlice({
  name: 'popluarCities',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularCities.pending, (state) => {
        state.popularCitiesLoading = true;
        state.popularCitiesError = null;
      })
      .addCase(fetchPopularCities.fulfilled, (state, action) => {
        state.popularCities = action.payload;
        state.popularCitiesLoading = false;
        state.popularCitiesError = null;
      })
      .addCase(fetchPopularCities.rejected, (state, action) => {
        state.popularCitiesLoading = false;
        state.popularCitiesError = action.payload;
      });
  },
});

// export const {} = userSlice.actions;

export default popluarCitiesSlice.reducer;
