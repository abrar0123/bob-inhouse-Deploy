import { connectionStr } from '@/lib/db';
import { User } from '@/lib/models/user';
import { protect } from '@/middlewares/authMiddleware';
import mongoose from 'mongoose';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

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
    const user = await User.findById(isAuthenticated.id).select('-password');

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
