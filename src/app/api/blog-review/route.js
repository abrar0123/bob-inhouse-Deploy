import { connectionStr } from "@/lib/db";
import { BlogReview } from "@/lib/models/blogReview";
import mongoose from "mongoose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { protect } from "@/middlewares/authMiddleware";
import getQueryParams from "@/utilis/getQueryParams";

export async function POST(req) {
  const { blogsId, name, rating, review, title } = await req.json();

  if (!blogsId) {
    return NextResponse.json({ error: "Blog ID is missing" }, { status: 400 });
  }
  if (!name) {
    return NextResponse.json({ error: "Name is missing" }, { status: 400 });
  }
  if (!rating) {
    return NextResponse.json({ error: "Rating is missing" }, { status: 400 });
  }
  if (!review) {
    return NextResponse.json({ error: "Review is missing" }, { status: 400 });
  }
  if (!title) {
    return NextResponse.json({ error: "Title is missing" }, { status: 400 });
  }

  const headersList = headers();
  const auth = headersList.get("authorization");

  const isAuthenticated = await protect(auth);

  if (!isAuthenticated) {
    return NextResponse.json(
      { error: "Not authorized. No token available" },
      { status: 401 }
    );
  }

  try {
    await mongoose.connect(connectionStr);

    const blogReview = new BlogReview({
      blog: blogsId,
      name,
      rating,
      review,
      title,
    });

    await blogReview.save();

    return NextResponse.json(blogReview);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal error has occurred" },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  try {
    await mongoose.connect(connectionStr);

    const blogId = getQueryParams("id", req.url);

    const reviews = await BlogReview.find({ blog: blogId }).sort({
      createdAt: -1,
    });

    return NextResponse.json(reviews);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal error has occurred" },
      { status: 400 }
    );
  }
}
