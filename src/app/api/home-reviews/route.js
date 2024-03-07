import { connectionStr } from "@/lib/db";
import { HomeReview } from "@/lib/models/homeReview";
import mongoose from "mongoose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { protect } from "@/middlewares/authMiddleware";
import getQueryParams from "@/utilis/getQueryParams";

export async function POST(req) {
  const { userId, name, rating, review, title } = await req.json();
  if (!userId) {
    return NextResponse.json({ error: "User ID is missing", statu: 400 });
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

    const userReview = new HomeReview({
      user: userId,
      name,
      rating,
      review,
      title,
    });

    await userReview.save();
    return NextResponse.json(userReview);
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

    // const userId = getQueryParams("id", req.url);

    const userReview = await HomeReview.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(userReview);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal error has occurred" },
      { status: 400 }
    );
  }
}
