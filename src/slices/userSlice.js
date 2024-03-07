"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchHomeBlogs } from "./blogsSlice";

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  const response = await axios.get("/api/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
});

export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async (token) => {
    const response = await axios.get("/api/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const addToFavorites = createAsyncThunk(
  "favorites/addFavorites",
  async ({ token, item }) => {
    const response = await axios.post(
      "/api/favorites",
      { item: { name: item.title } },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const getComparisonPools = () => {
  let pools;

  if (typeof window !== "undefined") {
    pools = localStorage.getItem("comparisonPools");
  }

  if (pools) {
    return JSON.parse(pools);
  } else {
    return [];
  }
};

export const postUserReviews = createAsyncThunk(
  "user/postUserReviews",
  async ({ token, data }) => {
    const res = axios.post("api/home-reviews", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
);

export const fetchUserReviews = createAsyncThunk(
  "user/fetchUserReviews",
  async () => {
    const res = await axios.get("api/home-reviews");
    return res.data;
  }
);

const initialState = {
  isSignupModalVisible: false,
  comparisonPools: getComparisonPools(),
  loading: false,
  user: null,
  error: null,
  favorites: [],
  favoritesLoading: false,
  favoritesError: null,

  userPostReviews: [],
  userPostReviewsLoading: null,
  userPostReviewsError: null,

  userReviews: [],
  userReviewsLoading: null,
  userReviewsError: null,
};

export const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    showSignupModal: (state) => {
      state.isSignupModalVisible = true;
    },
    hideSignupModal: (state) => {
      state.isSignupModalVisible = false;
    },
    addToComparisonPools: (state, action) => {
      const swimmingPools = [...state.comparisonPools, action.payload];
      localStorage.setItem("comparisonPools", JSON.stringify(swimmingPools));
      state.comparisonPools = swimmingPools;
    },
    removeFromComparisonPools: (state, action) => {
      const swimmingPools = state.comparisonPools.filter(
        (i) => i.id !== action.payload.id
      );
      localStorage.setItem("comparisonPools", JSON.stringify(swimmingPools));
      state.comparisonPools = swimmingPools;
    },
    removeAllComparisonPools: (state) => {
      state.comparisonPools = [];
      localStorage.setItem("comparisonPools", JSON.stringify([]));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFavorites.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesLoading = false;
        state.favoritesError = null;
      })
      .addCase(fetchFavorites.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload;
      })
      .addCase(addToFavorites.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
        state.favoritesLoading = false;
        state.favoritesError = null;
      })
      .addCase(addToFavorites.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload;
      })
      .addCase(postUserReviews.pending, (state) => {
        state.userPostReviewsLoading = true;
        state.userPostReviewsError = null;
      })
      .addCase(postUserReviews.fulfilled, (state, action) => {
        state.userPostReviews = action.payload;
        state.userPostReviewsLoading = false;
        state.userPostReviewsError = null;
      })
      .addCase(postUserReviews.rejected, (state, action) => {
        state.userPostReviewsLoading = false;
        state.userPostReviewsError = action.payload;
      })
      .addCase(fetchUserReviews.pending, (state) => {
        state.userReviewsLoading = true;
        state.userReviewsError = null;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.userReviews = action.payload;
        state.userReviewsLoading = false;
        state.userReviewsError = null;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.userReviewsLoading = false;
        state.userReviewsError = action.payload;
      });
  },
});

export const {
  showSignupModal,
  hideSignupModal,
  addToComparisonPools,
  removeFromComparisonPools,
  removeAllComparisonPools,
} = userSlice.actions;

export default userSlice.reducer;
