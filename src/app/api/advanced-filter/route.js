import { connectionStr } from '@/lib/db';
import { Listing } from '@/lib/models/listing';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    const listings = await Listing.find(
      {
        Activiteiten: { $ne: null },
        Voorzieningen: { $ne: null },
        'Zwemles Features': { $ne: null },
      },
      { Activiteiten: 1, Voorzieningen: 1, 'Zwemles Features': 1 },
    ).limit(10);

    // const selectActivities = searchParams.get("activities");
    // const selectServices = searchParams.get("services");
    // const selectfeatures = searchParams.get("features");

    // console.log(
    //   searchParams,
    //   "advancedFilters100  :  ",
    //   selectActivities,
    //   selectServices
    // );
    //Zwemles Features

    // const query =
    //   selectActivities || selectServices
    //     ? {
    //         $or: [
    //           { Voorzieningen: { $regex: selectActivities, $options: "i" } },
    //           { Activiteiten: { $regex: selectActivities, $options: "i" } },
    //         ],
    //       }
    //     : selectActivities
    //     ? { Voorzieningen: { $regex: selectActivities, $options: "i" } }
    //     : selectServices
    //     ? { Activiteiten: { $regex: selectActivities, $options: "i" } }
    //     : {};

    // const query1 = {
    //   Activiteiten: { $ne: null },
    //   Voorzieningen: { $ne: null },
    //   "Zwemles Features": { $ne: null },
    // };

    // const listings = await Listing.find(query1, {
    //   Activiteiten: 1,
    //   Voorzieningen: 1,
    //   "Zwemles Features": 1,
    // }).limit(10);
    // const query =
    //   selectActivities || selectServices
    //     ? {
    //         $or: [
    //           { Voorzieningen: { $regex: selectActivities, $options: "i" } },
    //           { Activiteiten: { $regex: selectActivities, $options: "i" } },
    //         ],
    //       }
    //     : selectActivities
    //     ? { Voorzieningen: { $regex: selectActivities, $options: "i" } }
    //     : selectServices
    //     ? { Activiteiten: { $regex: selectActivities, $options: "i" } }
    //     : {};

    // const query1 = {
    //   Activiteiten: { $ne: null },
    //   Voorzieningen: { $ne: null },
    //   "Zwemles Features": { $ne: null },
    // };

    // // Merge both queries
    // const mergedQuery = {
    //   $and: [query, query1],
    // };

    // const listings = await Listing.find(mergedQuery, {
    //   Activiteiten: 1,
    //   Voorzieningen: 1,
    //   "Zwemles Features": 1,
    // }).limit(10);

    if (listings) {
      return NextResponse.json(listings);
    } else {
      return NextResponse.json({ error: 'No listing found' }, { status: 400 });
    }
  } catch (error) {
    console.log('Error', error);
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
