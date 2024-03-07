import mongoose from "mongoose";

const blogReviewSchema = new mongoose.Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    name: String,
    rating: Number,
    review: String,
    title: String,
  },
  {
    timestamps: true,
  }
);

export const BlogReview =
  mongoose.models.BlogReviews ||
  mongoose.model("BlogReviews", blogReviewSchema);
