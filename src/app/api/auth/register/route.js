import { connectionStr } from '@/lib/db';
import { User } from '@/lib/models/user';
import { generateToken } from '@/utilis/generateToken';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json(
      { error: 'Please enter all the fields' },
      { status: 400 },
    );
  }

  await mongoose.connect(connectionStr);

  const userExists = await User.findOne({ email });
  if (userExists) {
    return NextResponse.json(
      { error: 'User already exists' },
      {
        status: 400,
      },
    );
  }

  try {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      return NextResponse.json(
        {
          success: true,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          },
        },
        {
          status: 200,
        },
      );
    } else {
      return NextResponse.json({ error: 'User not found!' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
