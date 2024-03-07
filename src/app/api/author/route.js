import { connectionStr } from '@/lib/db';
import { Author } from '@/lib/models/author';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    const author = await Author.findOne();
    return NextResponse.json(author);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
