import { connectionStr } from '@/lib/db';
import { Listing } from '@/lib/models/listing';
import getQueryParams from '@/utilis/getQueryParams';
import axios from 'axios';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const getGeocoding = async (address) => {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`,
  );

  if (response.data.results.length > 0) {
    const { lat, lng } = response.data.results[0].geometry.location;

    const streetViewImageUrl = `https://maps.googleapis.com/maps/api/streetview?location=${lat},${lng}&size=800x800&key=${GOOGLE_MAPS_API_KEY}`;

    return { lat, lng, streetViewImageUrl };
  }

  return null;
};

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);

    const id = getQueryParams('id', req.url);

    const listing = await Listing.findById(id);

    if (listing) {
      const newListing = listing.toObject();

      const address = `${newListing.Straatnaam} ${newListing.Straatnummer} ${newListing.Postcode} ${newListing.Plaatsnaam}`;

      const coordinates = await getGeocoding(address);

      const data = { ...newListing, coordinates };

      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: 'No listing found' }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
