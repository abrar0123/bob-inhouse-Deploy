import { connectionStr } from '@/lib/db';
import { Listing } from '@/lib/models/listing';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import axios from 'axios';

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const getDistance = (location1, location2) => {
  const geolib = require('geolib');
  return geolib.getDistance(location1, location2);
};

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

export async function POST(req) {
  const { userLocation } = await req.json();

  try {
    await mongoose.connect(connectionStr);

    const listings = await Listing.find().limit(10);
    // const listings = await Listing.find();

    if (listings) {
      // const listingsWithCoordinates = await Promise.all(
      //   listings.map(async (listing) => {
      //     const address = `${listing._doc.Naam} ${listing._doc.Plaatsnaam} ${listing._doc.Straatnaam}`;

      //     const coordinates = await getGeocoding(address);

      //     return {
      //       ...listing._doc,
      //       coordinates,
      //     };
      //   }),
      // );

      // if (!userLocation || !userLocation.lat || !userLocation.lng) {
      //   return NextResponse.json(listingsWithCoordinates);
      // }

      // // Filter listings based on proximity
      // const nearbyListings = listingsWithCoordinates.filter((listing) => {
      //   const distance = getDistance(userLocation, listing.coordinates);
      //   return distance <= 100000; // 10 kilometers in meters
      // });

      // const listingsWithDistance = nearbyListings.map((listing) => {
      //   const distance = getDistance(userLocation, listing.coordinates);
      //   console.log('distance', distance);
      //   return { ...listing, coordinates: listing.coordinates, distance };
      // });
      // const listingsWithDistance = listingsWithCoordinates.map((listing) => {
      //   const distance = getDistance(userLocation, listing.coordinates);

      //   return { ...listing, coordinates: listing.coordinates, distance };
      // });

      // return NextResponse.json(listingsWithDistance);
      return NextResponse.json(listings);
    } else {
      return NextResponse.json({ error: 'No listing found' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
