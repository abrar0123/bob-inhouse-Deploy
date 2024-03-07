import Image from "next/image";
import React from "react";
import Link from "next/link";

const SingleReview = ({ reviews }) => {
  return (
    <>
      {reviews.slice(0, 2).map((review, index) => (
        <div className="col-md-12" key={index}>
          <div className="mbp_first position-relative d-flex align-items-center justify-content-start mt30 mb30-sm">
            <Image
              width={60}
              height={60}
              src="/images/blog/comments-2.png"
              className="mr-3"
              alt="comments-2.png"
            />
            <div className="ml20">
              <h6 className="mt-0 mb-0">{review.name}</h6>
              <div>
                <span className="fz14">{review.date}</span>
                <div className="blog-single-review">
                  <ul className="mb0 ps-0">
                    {[...Array(review.rating)].map((_, i) => (
                      <li className="list-inline-item me-0" key={i}>
                        <a href="#">
                          <i className="fas fa-star review-color2 fz10" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* End .d-flex */}

          <p className="text mt20 mb20">{review.text}</p>
          <ul className="mb20 ps-0">
            {review?.images?.map((image, i) => (
              <li className="list-inline-item mb5-xs" key={i}>
                <Image
                  width={110}
                  height={90}
                  className="bdrs6"
                  src={image}
                  alt="review-img"
                />
              </li>
            ))}
          </ul>

          <div className="review_cansel_btns d-flex bdrb1 pb30">
            <a href="#">
              <i className="fas fa-thumbs-up" />
              Helpful
            </a>
            <a href="#">
              <i className="fas fa-thumbs-down" />
              Not helpful
            </a>
          </div>
        </div>
      ))}

      {reviews.length > 2 && (
        <div className="col-md-12">
          <div className="position-relative bdrb1 pt30 pb20">
            <Link href={`/blog-reviews`} className="ud-btn btn-white2">
              Show all {reviews.length} blog reviews
              <i className="fal fa-arrow-right-long" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleReview;
