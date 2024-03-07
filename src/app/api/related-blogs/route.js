import { connectionStr } from '@/lib/db';
import { Blog } from '@/lib/models/blog';
import getQueryParams from '@/utilis/getQueryParams';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);

    let category = getQueryParams('category', req.url);
    if (category == 0) {
      category = null;
    }
    const currentBlogId = getQueryParams('blogId', req.url);

    const query = {
      $or: [{ Categorie: category }, { Categorie: { $exists: false } }],
      _id: { $ne: currentBlogId },
    };

    const blogs = await Blog.find(query).limit(3);

    if (blogs) {
      return NextResponse.json(blogs);
    } else {
      return NextResponse.json([]);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 },
    );
  }
}
