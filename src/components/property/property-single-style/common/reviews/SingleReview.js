'use client';
import 'photoswipe/dist/photoswipe.css';
import { MdReviews } from 'react-icons/md';
import React, { useMemo } from 'react';
import moment from 'moment';
import Link from 'next/link';

const SingleReview = ({ reviews }) => {
  const slicedReviews = useMemo(() => reviews.slice(0, 2), [reviews]);

  return (
    <>
      {slicedReviews &&
        slicedReviews.map((review, index) => (
          <div className="col-md-12" key={index}>
            <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
              <MdReviews fontSize={40} />
              <div className="ml20">
                <h6 className="mt-0 mb-0">{review.name}</h6>
                <div>
                  <span className="fz14">
                    {moment(review.createdAt).format('DD MMMM, yyyy')}
                  </span>
                  <div className="blog-single-review">
                    <ul className="mb0 ps-0">
                      {[...Array(review.rating)].map((_, i) => (
                        <li className="list-inline-item me-0" key={i}>
                          <span>
                            <i className="fas fa-star review-color2 fz10" />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <p className="text mt20 mb20">{review.review}</p>
          </div>
        ))}

      {reviews.length > 2 && (
        <div className="col-md-12">
          <div className="position-relative bdrb1 pt30 pb20">
            <Link href="/listing-reviews" className="ud-btn btn-white2">
              Show all {reviews.length} reviews
              <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleReview;
