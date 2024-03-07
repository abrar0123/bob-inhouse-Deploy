import mongoose from "mongoose";
import { string } from "prop-types";

const homeReviews = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Home" },
    name: String,
    rating: Number,
    review: String,
    title: String,
  },
  {
    timestamps: true,
  }
);

export const HomeReview =
  mongoose.models.HomeReviews || mongoose.model("HomeReviews", homeReviews);
