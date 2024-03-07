'use client';
import moment from 'moment';
import Image from 'next/image';
import Link from 'next/link';

const Blog = ({ blogs }) => {
  return (
    <>
      {blogs?.map((blog, index) => (
        <div className="col-sm-6 col-lg-4" key={index}>
          <div className="blog-style1">
            <div className="blog-img">
              <Image
                width={386}
                height={271}
                className="w-100 h-100 cover"
                src={blog?.Image_hoofd || '/images/blog/blog-1.jpg'}
                alt="blog"
              />
            </div>
            <div className="blog-content">
              <div className="date">
                <span className="month">
                  {moment(blog.Publicatiedatum).format('MMM')}
                </span>
                <span className="day">
                  {moment(blog.Publicatiedatum).format('DD')}
                </span>
              </div>
              <a className="tag" href="#">
                {blog?.tag}
              </a>
              <h6 className="title mt-1">
                <Link href={`/blogs/${blog?.Slug}`}>{blog?.Titel}</Link>
              </h6>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Blog;
