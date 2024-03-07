import Wrap from "@/components/singleBlog/Wrap";

export const metadata = {
  title: "Blog || Homez - Real Estate NextJS Template",
};

const BlogSingle = ({ params }) => {
  const { Slug } = params;

  return <Wrap Slug={Slug} />;
};

export default BlogSingle;
