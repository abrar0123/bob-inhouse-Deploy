import { connectionStr } from '@/lib/db';
import { Blog } from '@/lib/models/blog';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    const latestBlogs = await Blog.find({})
      .sort({ Publicatiedatum1: -1 })
      .limit(3);

    return NextResponse.json(latestBlogs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 }
    );
  }
}
