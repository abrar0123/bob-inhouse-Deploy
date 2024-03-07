import { connectionStr } from '@/lib/db';
import mongoose from 'mongoose';
import { PopularCity } from '@/lib/models/popularCities';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    const popularCities = await PopularCity.find({});
    return NextResponse.json(popularCities);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
