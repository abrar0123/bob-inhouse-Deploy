'use client';

import React from 'react';
import moment from 'moment';
import { MdReviews } from 'react-icons/md';
import { useSelector } from 'react-redux';

const ReviewsWrap = () => {
  const { singleListingReviews } = useSelector((state) => state.listing);


  return (
    <div>
      <div className="product_single_content mb50">
        <div className="mbp_pagination_comments">
          <div className="row">
            <div className="col-lg-12">
              <div className="total_review d-flex align-items-center justify-content-between mb20"></div>
            </div>

            {singleListingReviews.length === 0 ? (
              <p>No reviews to show</p>
            ) : (
              singleListingReviews.map((review, index) => (
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
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsWrap;
