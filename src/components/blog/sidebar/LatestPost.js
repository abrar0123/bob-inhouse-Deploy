import { posts } from '@/data/blogs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const LatestPost = ({ latestBlogs }) => {
  return (
    <div className="sidebar-widget mb30">
      <h6 className="widget-title">Latest Posts</h6>
      {latestBlogs.map((post, index) => (
        <div
          className="list-news-style d-flex align-items-center mt20 mb20"
          key={index}
        >
          <div className="news-img flex-shrink-0">
            <Image width={90} height={80} src={post?.Image_hoofd} alt="blog" />
          </div>
          <div className="news- flex-shrink-1 ms-3">
            <p className="mb0 fz14 " style={{ lineHeight: '20px' }}>
              <Link href={`/blogs/${post?.Slug}`}>{post?.Titel}</Link>
            </p>
            <p className="body-light-color">
              {post?.Publicatiedatum?.slice(0, 4)}{' '}
              {post?.Publicatiedatum?.slice(5, 7)}{' '}
              {post?.Publicatiedatum?.slice(8, 10)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestPost;
