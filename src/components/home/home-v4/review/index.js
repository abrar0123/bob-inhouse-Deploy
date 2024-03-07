"use client";
import React from "react";
import SingleReview from "./SingleReview";
import { useSelector } from "react-redux";

const AllReviews = ({ homeReviews }) => {
  const { user, userReviewsLoading, userReviews } = useSelector(
    (state) => state.user
  );

  
  return (
    <div className="product_single_content mb50">
      <div className="mbp_pagination_comments">
        <div className="row">
          <div className="col-lg-12">
            <div className="total_review d-flex align-items-center justify-content-between mb20 mt60">
              <h6 className="fz17 mb15">
                <i className="fas fa-star fz12 pe-2" />
                Home Page Reviews
              </h6>
            </div>
          </div>
          <SingleReview reviews={userReviews} />
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
