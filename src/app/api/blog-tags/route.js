import { connectionStr } from '@/lib/db';
import { Blog } from '@/lib/models/blog';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    const tags = await Blog.find({ Tags: { $ne: null } }, 'Tags');

    if (tags) {
      return NextResponse.json(tags);
    } else {
      return NextResponse.json({ error: 'No Tags found' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 }
    );
  }
}
