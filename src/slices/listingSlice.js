'use client';

import { featuresAllFilter } from '@/utilis/helpers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// export const fetchListing = createAsyncThunk(
//   'listing/fetchListing',
//   async (userLocation) => {
//     const response = await axios.post('/api/listing', {
//       userLocation,
//     });
//     return response.data;
//   },
// );

export const fetchListing = createAsyncThunk(
  'listing/fetchListing',
  async (userLocation) => {
    const response = await axios.post('/api/listing', {
      userLocation: { lat: 51.775306, lng: 5.06292 },
    });
    return response.data;
  }
);

export const fetchSingleListing = createAsyncThunk(
  'listing/fetchSingleListing',
  async (id) => {
    const response = await axios.get(`/api/single-listing?id=${id}`);
    return response.data;
  }
);

export const fetchFeaturedListing = createAsyncThunk(
  'listing/fetchFeaturedListing',
  async () => {
    const response = await axios.post(`/api/featured-listing`, {
      userLocation: { lat: 51.775306, lng: 5.06292 },
    });
    return response.data;
  }
);

export const fetchSingleListingReviews = createAsyncThunk(
  'listing/fetchSingleListingReviews',
  async (id) => {
    const response = await axios.get(`/api/listing-review?id=${id}`);
    return response.data;
  }
);

export const postListingReview = createAsyncThunk(
  'listing/postListingReview',
  async ({ data, token }) => {
    const response = await axios.post(`/api/listing-review`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchAdvancedFilter = createAsyncThunk(
  'listing/fetchAdvancedFilter',
  async () => {
    const resp = await axios.get('/api/advanced-filter');
    return resp.data;
  }
);

// p1
export const fetchFilteredListing = createAsyncThunk(
  'listing/fetchFilteredListing',
  async ({ activities, features, services, category, distance, datap }) => {
    const resp = await axios.get(
      `/api/listing-filter?data=${datap}&activities=${activities}&features=${features}&services=${services}&category=${category}&distance=${distance}`
    );
    return resp.data;
  }
);

const initialState = {
  listing: [],
  featuredListing: [],
  featuredListingLoading: null,
  featuredListingError: null,
  listingLoading: false,
  listingError: null,
  singleListing: null,
  singleListingLoading: false,
  singleListingError: null,
  userLocation: null,
  filters: {
    locations: [],
    advanced: [],
    selectedListing: [],
  },
  singleListingReviews: [],
  singleListingReviewsLoading: false,
  singleListingReviewsError: null,
  postListingReviewLoading: false,
  postListingReviewError: false,

  advancedFiltersValues: { activities: [], features: [], services: [] },
  advancedFiltersLoading: null,
  advancedFiltersError: null,

  listingFilters: [],
  listingFiltersLoading: null,
  listingFiltersError: null,

  userFilterList: {},
};

export const listingSlice = createSlice({
  name: 'listingSlice',
  initialState,
  reducers: {
    setUserLocation: (state, action) => {
      state.userLocation = action.payload;
    },
    updateFilters: (state, action) => {
      const { fields } = action.payload;
      state.filters.locations = fields;
    },
    advancedFilters: (state, action) => {
      const { filterData } = action.payload;
      state.filters.advanced = filterData;
    },
    advancedUserFilters: (state, action) => {
      const { filterData } = action.payload;
      state.filters.selectedListing = filterData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListing.pending, (state) => {
        state.listingLoading = true;
        state.listingError = null;
      })
      .addCase(fetchListing.fulfilled, (state, action) => {
        state.listing = action.payload;
        state.listingLoading = false;
        state.listingError = null;
      })
      .addCase(fetchListing.rejected, (state, action) => {
        state.listingLoading = false;
        state.listingError = action.payload;
      })
      .addCase(fetchSingleListing.pending, (state) => {
        state.singleListing = null;
        state.singleListingLoading = true;
        state.singleListingError = null;
      })
      .addCase(fetchSingleListing.fulfilled, (state, action) => {
        state.singleListing = action.payload;
        state.singleListingLoading = false;
        state.singleListingError = null;
      })
      .addCase(fetchSingleListing.rejected, (state, action) => {
        state.singleListingLoading = false;
        state.singleListingError = action.error.message;
      })
      .addCase(fetchFeaturedListing.pending, (state) => {
        state.featuredListing = [];
        state.featuredListingLoading = true;
        state.featuredListingError = null;
      })
      .addCase(fetchFeaturedListing.fulfilled, (state, action) => {
        state.featuredListing = action.payload;
        state.featuredListingLoading = false;
        state.featuredListingError = null;
      })
      .addCase(fetchFeaturedListing.rejected, (state, action) => {
        state.featuredListingLoading = false;
        state.featuredListingError = action.error.message;
      })
      .addCase(fetchSingleListingReviews.pending, (state) => {
        state.singleListingReviews = [];
        state.singleListingReviewsLoading = true;
        state.singleListingReviewsError = null;
      })
      .addCase(fetchSingleListingReviews.fulfilled, (state, action) => {
        state.singleListingReviews = action.payload;
        state.singleListingReviewsLoading = false;
        state.singleListingReviewsError = null;
      })
      .addCase(fetchSingleListingReviews.rejected, (state, action) => {
        state.singleListingReviewsLoading = false;
        state.singleListingReviewsError = action.error.message;
      })
      .addCase(postListingReview.pending, (state) => {
        state.postListingReviewLoading = true;
        state.postListingReviewError = null;
      })
      .addCase(postListingReview.fulfilled, (state, action) => {
        state.postListingReviewLoading = false;
        state.postListingReviewError = null;
        state.singleListingReviews = [
          action.payload,
          ...state.singleListingReviews,
        ];
      })
      .addCase(postListingReview.rejected, (state, action) => {
        state.postListingReviewLoading = false;
        state.postListingReviewError = action.error.message;
      })
      .addCase(fetchAdvancedFilter.pending, (state) => {
        state.advancedFiltersLoading = true;
        state.advancedFiltersError = null;
      })
      .addCase(fetchAdvancedFilter.fulfilled, (state, action) => {
        const activities = featuresAllFilter(action.payload, 'Activiteiten');
        const services = featuresAllFilter(action.payload, 'Voorzieningen');
        const features = featuresAllFilter(action.payload, 'Zwemles Features');

        (state.advancedFiltersValues = {
          activities,
          features,
          services,
        }),
          (state.advancedFiltersLoading = false);
        state.advancedFiltersError = null;
      })
      .addCase(fetchAdvancedFilter.rejected, (state, action) => {
        state.advancedFiltersLoading = false;
        state.advancedFiltersError = action.error.message;
      })
      .addCase(fetchFilteredListing.pending, (state) => {
        (state.listingFiltersLoading = true),
          (state.listingFiltersError = null);
      })
      .addCase(fetchFilteredListing.fulfilled, (state, action) => {
        state.listingFilters = action.payload;
        state.listingFiltersLoading = false;
        state.listingFiltersError = null;
      })
      .addCase(fetchFilteredListing.rejected, (state, action) => {
        state.listingFiltersLoading = false;
        state.listingFiltersError = action.error.message;
      });
  },
});

export const {
  setUserLocation,
  updateFilters,
  advancedFilters,
  advancedUserFilters,
} = listingSlice.actions;

export default listingSlice.reducer;
