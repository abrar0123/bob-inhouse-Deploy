import mongoose from 'mongoose';

const authorSchema = mongoose.Schema({
  name: { type: String },
  desc: { type: String },
  img: { type: String },
});

export const Author =
  mongoose.models.author || mongoose.model('author', authorSchema);
