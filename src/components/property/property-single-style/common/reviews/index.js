import React from 'react';
import SingleReview from './SingleReview';

const AllReviews = ({ reviews }) => {
  console.log('reviews : ', reviews);
  return (
    <div className="product_single_content mb50">
      <div className="mbp_pagination_comments">
        <div className="row">
          <div className="col-lg-12">
            <div className="total_review d-flex align-items-center justify-content-between mb20">
              <h6
                className="fz17 mb15"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <i className="fas fa-star fz12 pe-2" />
                Listing Reviews
              </h6>
            </div>
          </div>
          <SingleReview reviews={reviews} />
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
