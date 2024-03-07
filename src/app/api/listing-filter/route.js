import mongoose from 'mongoose';
import { connectionStr } from '@/lib/db';
import { Listing } from '@/lib/models/listing';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const searchParams = new URLSearchParams(req.url);
    await mongoose.connect(connectionStr);

    const selectActivities = searchParams.get('activities');
    const selectServices = searchParams.get('services');
    const selectfeatures = searchParams.get('features');
    const selectCategorie = searchParams.get('category');
    const selectdistance = searchParams.get('distance');

    let conditions = [];

    if (selectCategorie) {
      conditions.push({
        'Listing Categorie': { $regex: selectCategorie, $options: 'i' },
      });
    }
    if (selectServices) {
      conditions.push({
        Voorzieningen: { $regex: selectServices, $options: 'i' },
      });
    }
    if (selectActivities) {
      conditions.push({
        Activiteiten: { $regex: selectActivities, $options: 'i' },
      });
    }
    if (selectfeatures) {
      conditions.push({
        'Zwemles Features': { $regex: selectfeatures, $options: 'i' },
      });
    }

    console.log('selectdistanceB  : ', selectdistance);
    const query = conditions.length > 0 ? { $and: conditions } : {};

    const listing = await Listing.find(query).limit(6);

    if (listing) {
      return NextResponse.json(listing);
    } else {
      return NextResponse.json({ error: 'No listing Founds', status: 400 });
    }
  } catch (error) {
    console.log('Error  : ', error);
    return NextResponse.json({ error: 'Internal server error', status: 400 });
  }
}
