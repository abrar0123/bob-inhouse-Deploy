import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: { type: "String" },
    content: { type: "String" },
    date: { type: "String" },
    Slug: { type: "String" },
  },
  { timestaps: true }
);

export const Blog =
  mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);
