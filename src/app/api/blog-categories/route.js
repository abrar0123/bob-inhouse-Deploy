import { connectionStr } from '@/lib/db';
import { Blog } from '@/lib/models/blog';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await mongoose.connect(connectionStr);

    const categories = await Blog.find(
      { Categorie: { $ne: null } },
      'Categorie'
    );
    const tags = await Blog.find({ Tags: { $ne: null } }, 'Tags');

    if (categories) {
      return NextResponse.json(categories);
    } else {
      return NextResponse.json(
        { error: 'No categories found' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.log('Blogs Category Error: ' + error);
    return NextResponse.json(
      { error: 'Internal error has occurred' },
      { status: 400 }
    );
  }
}
