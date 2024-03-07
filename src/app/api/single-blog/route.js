import { connectionStr } from '@/lib/db';
import { Blog } from '@/lib/models/blog';
import getQueryParams from '@/utilis/getQueryParams';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);

    const Slug = getQueryParams('Slug', req.url);
    const blog = await Blog.findOne({ Slug: Slug });

    if (blog) {
      return NextResponse.json(blog);
    } else {
      return NextResponse.json({ error: 'No blog found' }, { status: 400 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
