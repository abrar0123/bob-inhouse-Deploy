import mongoose from 'mongoose';

const popularCitySchema = mongoose.Schema({
  value: { type: String, required: true },
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export const PopularCity =
  mongoose.models.popularCities ||
  mongoose.model('popularCities', popularCitySchema);
