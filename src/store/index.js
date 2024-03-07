import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import userReducer from "../slices/userSlice";
import listingReducer from "../slices/listingSlice";
import blogsReducer from "../slices/blogsSlice";
import authorReducer from "../slices/authorSlice";
import popularCitiesReducer from "../slices/popluarCitiesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    listing: listingReducer,
    blogs: blogsReducer,
    author: authorReducer,
    cities: popularCitiesReducer,
  },
});
