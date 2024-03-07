import mongoose from 'mongoose';

const listingSchema = mongoose.Schema(
  {
    title: { type: 'String' },
    content: { type: 'String' },
    excerpt: { type: 'String' },
  },
  { timestaps: true },
);

export const Listing =
  mongoose.models.Listings || mongoose.model('Listings', listingSchema);
