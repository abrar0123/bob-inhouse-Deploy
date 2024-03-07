import { connectionStr } from '@/lib/db';
import { Blog } from '@/lib/models/blog';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const searchParams = new URLSearchParams(req.url);

  const pageSize = searchParams.get('pageSize') || 10;
  const page = searchParams.get('page') || 1;
  const searchText = searchParams.get('searchText');
  const selectCategory = searchParams.get('selectCategory');
  const selectTag = searchParams.get('selectTag');
  const pageNumber = parseInt(page);
  const limit = parseInt(pageSize);

  const offset = (pageNumber - 1) * limit;

  try {
    await mongoose.connect(connectionStr);
    const query = selectTag
      ? { Tags: { $regex: selectTag, $options: 'i' } }
      : selectCategory
      ? { Categorie: selectCategory }
      : searchText
      ? { Titel: { $regex: searchText, $options: 'i' } }
      : {};

    const blogs = await Blog.find(query).skip(offset).limit(limit);

    if (blogs) {
      const totalBlogs = await Blog.countDocuments(query);
      return NextResponse.json({ blogs, totalBlogs });
    } else {
      return NextResponse.json({ error: 'No blogs found' }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 }
    );
  }
}
