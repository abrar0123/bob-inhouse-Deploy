import { connectionStr } from '@/lib/db';
import { User } from '@/lib/models/user';
import getQueryParams from '@/utilis/getQueryParams';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { protect } from '@/middlewares/authMiddleware';

export async function GET() {
  const headersList = headers();
  const auth = headersList.get('authorization');

  const isAuthenticated = await protect(auth);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Not authorized. No token available' },
      { status: 401 },
    );
  }

  try {
    await mongoose.connect(connectionStr);
    const user = await User.findById(isAuthenticated.id);

    if (user) {
      return NextResponse.json(user.favorites);
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}

export async function POST(req) {
  const { item } = await req.json();

  if (!item) {
    return NextResponse.json(
      { error: 'Favorite item is missing' },
      { status: 400 },
    );
  }

  const headersList = headers();
  const auth = headersList.get('authorization');

  const isAuthenticated = await protect(auth);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Not authorized. No token available' },
      { status: 401 },
    );
  }

  try {
    await mongoose.connect(connectionStr);
    const user = await User.findByIdAndUpdate(
      isAuthenticated.id,
      { $addToSet: { favorites: item } },
      { new: true },
    );

    return NextResponse.json({ favorites: user.favorites });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}

export async function DELETE(req) {
  const id = getQueryParams('id', req.url);

  if (!id) {
    return NextResponse.json({ error: 'Item ID is missing' }, { status: 400 });
  }

  const headersList = headers();
  const auth = headersList.get('authorization');

  const isAuthenticated = await protect(auth);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: 'Not authorized. No token available' },
      { status: 401 },
    );
  }

  try {
    await mongoose.connect(connectionStr);
    const user = await User.findByIdAndUpdate(
      isAuthenticated.id,
      { $pull: { favorites: { _id: id } } },
      { new: true },
    );

    return NextResponse.json({ favorites: user.favorites });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
