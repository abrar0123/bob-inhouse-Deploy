'use client';

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchBlogs = createAsyncThunk(
  'blogs/fetchBlogs',
  async ({ page, searchText, selectCategory, selectTag }) => {
    const response = await axios.get(
      `/api/blogs?version=2&pageSize=10&page=${page}&selectCategory=${selectCategory}&selectTag=${selectTag}&searchText=${searchText}`
    );
    return response.data;
  }
);

export const fetchSingleBlog = createAsyncThunk(
  'blogs/fetchSingleBlog',
  async (Slug) => {
    const response = await axios.get(`/api/single-blog?Slug=${Slug}`);
    return response.data;
  }
);

export const fetchRelatedBlogs = createAsyncThunk(
  'blogs/fetchRelatedBlogs',

  async ({ category, id }) => {
    const response = await axios.get(
      `/api/related-blogs?category=${category}&blogId=${id}`
    );
    return response.data;
  }
);

export const fetchHomeBlogs = createAsyncThunk(
  'blogs/fetchHomeBlogs',

  async () => {
    const response = await axios.get(`/api/home-blogs`);
    return response.data;
  }
);

export const fetchSingleBlogReviews = createAsyncThunk(
  'blogs/fetchSingleBlogReviews',
  async (id) => {
    const response = await axios.get(`/api/blog-review?id=${id}`);
    return response.data;
  }
);

export const postSingleBlogsReview = createAsyncThunk(
  'blogs/postBlogsReview',
  async ({ data, token }) => {
    const response = await axios.post(`/api/blog-review`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
);

export const fetchBlogsCategories = createAsyncThunk(
  'blogs/fetchBlogsCategories',
  async () => {
    const response = await axios.get('/api/blog-categories');
    return response.data;
  }
);

export const fetchBlogsTags = createAsyncThunk(
  'blogs/fetchBlogsTags',
  async () => {
    const response = await axios.get('/api/blog-tags');
    return response.data;
  }
);

export const fetchLatestBlogs = createAsyncThunk(
  'blogs/fetchLatestBlogs',
  async () => {
    const resp = await axios.get('/api/latest-blogs?version=2&pageSize=10');
    return resp.data;
  }
);

const initialState = {
  blogs: [],
  relatedBlogs: [],
  totalBlogs: 0,
  relatedBlogsLoading: null,
  relatedBlogsError: null,
  blogsLoading: false,
  blogsError: null,
  singleBlog: null,
  singleBlogLoading: false,
  singleBlogError: null,
  homeBlogs: [],
  homeBlogsLoading: false,
  homeBlogsError: null,

  blogsReviews: [],
  blogsReviewLoading: false,
  blogsReviewError: false,

  singleBlogReview: [],
  singleBlogLoading: null,
  singleBlogError: null,

  blogsCategories: [],
  blogsCategoriesLoading: null,
  blogsCategoriesError: null,

  latestBlogs: [],
  latestBlogsLoading: null,
  latestBlogsError: null,

  blogsTags: [],
  blogsTagsLoading: null,
  blogsTagsError: null,
};

export const blogSlice = createSlice({
  name: 'blogSlice',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.blogsLoading = true;
        state.blogsError = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.blogs = action.payload.blogs;
        state.totalBlogs = action.payload.totalBlogs;
        state.blogsLoading = false;
        state.blogsError = null;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.blogsLoading = false;
        state.blogsError = action.payload;
      })
      .addCase(fetchSingleBlog.pending, (state) => {
        state.singleBlog = null;
        state.singleBlogLoading = true;
        state.singleBlogError = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.singleBlog = action.payload;
        state.singleBlogLoading = false;
        state.singleBlogError = null;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.singleBlogLoading = false;
        state.singleBlogError = action.error.message;
      })
      .addCase(fetchRelatedBlogs.pending, (state) => {
        state.relatedBlogs = [];
        state.relatedBlogsLoading = true;
        state.relatedBlogsError = null;
      })
      .addCase(fetchRelatedBlogs.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.relatedBlogs = [];
        } else {
          state.relatedBlogs = action.payload;
        }
        state.relatedBlogsLoading = false;
        state.relatedBlogsError = null;
      })
      .addCase(fetchRelatedBlogs.rejected, (state, action) => {
        state.relatedBlogsLoading = false;
        state.relatedBlogsError = action.error.message;
      })
      .addCase(fetchHomeBlogs.pending, (state) => {
        state.homeBlogs = [];
        state.homeBlogsLoading = true;
        state.homeBlogsError = null;
      })
      .addCase(fetchHomeBlogs.fulfilled, (state, action) => {
        state.homeBlogs = action.payload;
        state.homeBlogsLoading = false;
        state.homeBlogsError = null;
      })
      .addCase(fetchHomeBlogs.rejected, (state, action) => {
        state.homeBlogsLoading = false;
        state.homeBlogsError = action.error.message;
      })
      .addCase(fetchSingleBlogReviews.pending, (state) => {
        state.blogsReviews = [];
        state.blogsReviewLoading = true;
        state.blogsReviewError = null;
      })
      .addCase(fetchSingleBlogReviews.fulfilled, (state, action) => {
        state.blogsReviews = action.payload;
        state.blogsReviewLoading = false;
        state.blogsReviewError = null;
      })
      .addCase(fetchSingleBlogReviews.rejected, (state, action) => {
        state.blogsReviewLoading = false;
        state.blogsReviewError = action.error.message;
      })
      .addCase(postSingleBlogsReview.pending, (state) => {
        state.singleBlogLoading = true;
        state.singleBlogError = null;
      })
      .addCase(postSingleBlogsReview.fulfilled, (state, action) => {
        state.singleBlogLoading = false;
        state.singleBlogError = null;
        state.blogsReviews = [action.payload, ...state.blogsReviews];
      })
      .addCase(postSingleBlogsReview.rejected, (state, action) => {
        state.singleBlogLoading = false;
        state.singleBlogError = action.error.message;
      })
      .addCase(fetchBlogsCategories.pending, (state) => {
        state.blogsCategoriesLoading = true;
        state.blogsCategoriesError = null;
      })
      .addCase(fetchBlogsCategories.fulfilled, (state, action) => {
        const newCategories = action.payload.map((cat) => cat.Categorie);
        const uniqueCategories = [...new Set(newCategories)];
        state.blogsCategoriesLoading = false;
        state.blogsCategories = uniqueCategories;
        state.blogsCategoriesError = null;
      })
      .addCase(fetchBlogsCategories.rejected, (state, action) => {
        state.blogsCategoriesLoading = false;
        state.blogsCategoriesError = action.error.message;
      })
      .addCase(fetchLatestBlogs.pending, (state) => {
        state.latestBlogsLoading = true;
        state.latestBlogsError = null;
      })
      .addCase(fetchLatestBlogs.fulfilled, (state, action) => {
        state.latestBlogsLoading = false;
        state.latestBlogsError = null;
        state.latestBlogs = action.payload;
      })
      .addCase(fetchLatestBlogs.rejected, (state, action) => {
        state.latestBlogsLoading = false;
        state.latestBlogsError = action.error.message;
      })
      .addCase(fetchBlogsTags.pending, (state) => {
        state.blogsTags = true;
        state.blogsTagsError = null;
      })
      .addCase(fetchBlogsTags.fulfilled, (state, action) => {
        state.blogsTagsLoading = false;
        state.blogsTagsError = null;

        const newTag = action.payload.map((item) => item.Tags);
        const uniqueTag = [...new Set(newTag)];
        state.blogsTags = uniqueTag;
      })
      .addCase(fetchBlogsTags.rejected, (state, action) => {
        state.blogsTagsLoading = false;
        state.blogsTagsError = action.error.message;
      });
  },
});

// export const {} = userSlice.actions;

export default blogSlice.reducer;
