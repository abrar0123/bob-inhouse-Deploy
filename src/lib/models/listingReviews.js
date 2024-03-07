import mongoose from 'mongoose';

const listingReviewSchema = new mongoose.Schema(
  {
    listing: { type: mongoose.Schema.Types.ObjectId, ref: 'Listing' },
    name: String,
    rating: Number,
    review: String,
    title: String,
  },
  {
    timestamps: true,
  },
);

export const ListingReview =
  mongoose.models.ListingReviews ||
  mongoose.model('ListingReviews', listingReviewSchema);
