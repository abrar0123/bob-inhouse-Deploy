import { connectionStr } from '@/lib/db';
import { Blog } from '@/lib/models/blog';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    const blogs = await Blog.aggregate([{ $sample: { size: 3 } }]);

    if (blogs) {
      return NextResponse.json(blogs);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
