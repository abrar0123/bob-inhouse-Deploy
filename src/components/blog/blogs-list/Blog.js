"use client";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";

const Blog = ({ blogs }) => {
  return blogs.map((item, index) => (
    <div
      className="blog-style1 list-style bgc-white d-block d-md-flex align-items-xl-center"
      key={index}
    >
      <div className="blog-img flex-shrink-0">
        {item?.Categorie && (
          <div className="blog-category">
            <span>{item.Categorie}</span>
          </div>
        )}
        <Image
          width={220}
          height={220}
          priority
          className="cover"
          src={item.Image_hoofd || "/images/blog/blog-10.jpg"}
          alt={item.Titel}
        />
        <div className="date">
          <span className="month">
            {moment(item.Publicatiedatum).format("MMM")}
          </span>
          <span className="day">
            {moment(item.Publicatiedatum).format("DD")}
          </span>
        </div>
      </div>
      <div className="blog-content pl30 pb20 flex-grow-1">
        <a className="tag" href="#">
          {item.tag}
        </a>
        <h4 className="title mt-1 mb20">
          <Link href={`/blogs/${item.Slug}`}>{item.Titel}</Link>
        </h4>
        <p className="text mb0">{item.Inleiding.substring(0, 300)}...</p>
      </div>
    </div>
  ));
};

export default Blog;
