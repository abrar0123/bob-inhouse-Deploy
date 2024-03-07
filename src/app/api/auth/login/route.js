import { connectionStr } from '@/lib/db';
import { User } from '@/lib/models/user';
import { generateToken } from '@/utilis/generateToken';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Please enter all the fields' },
      { status: 400 },
    );
  }
  try {
    await mongoose.connect(connectionStr);

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return NextResponse.json({
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      return NextResponse.json(
        { error: 'Invalid email or password!' },
        { status: 401 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
