import moment from 'moment';
import Image from 'next/image';
import React from 'react';

export default function Details({ data, author }) {
  return (
    <>
      <div className="container">
        <div className="row" data-aos="fade-up" data-aos-delay="100">
          <div className="col-lg-12">
            <h2 className="blog-title">{data.Titel}</h2>
            <div className="blog-single-meta">
              <div className="post-author d-sm-flex align-items-center">
                <Image
                  width={40}
                  height={40}
                  className="mr10"
                  src={author.image || '/images/blog/author-1.png'}
                  alt="blog"
                />
                <a className="pr15 bdrr1" href="#">
                  {author.name}
                </a>
                {data.Categorie && (
                  <span className="ml15 pr15 bdrr1">{data.Categorie}</span>
                )}
                <a className="ml15" href="#">
                  {moment(data.Publicatiedatum).format('MMMM')}{' '}
                  {moment(data.Publicatiedatum).format('DD')},{' '}
                  {moment(data.Publicatiedatum).format('yyyy')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .container */}

      <div
        className="mx-auto maxw1600 mt60"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="row">
          <div className="col-lg-12">
            <div className="large-thumb">
              <Image
                width={1200}
                height={600}
                priority
                className="w-100 h-100 cover"
                src={data?.Image_hoofd || '/images/blog/blog-single-1.jpg'}
                alt={data.Titel}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
