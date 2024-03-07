"use client";
import testimonialData from "@/data/testimonials";
import Image from "next/image";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserReviews } from "@/slices/userSlice";
import React, { useEffect } from "react";
import Loading from "@/components/common/Loading";

const UserReviews = () => {
  const { userReviewsLoading, userReviewsError, userReviews } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserReviews());
  }, []);

  return (
    <React.Fragment>
      {userReviews.length > 0 && (
        <React.Fragment>
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h2 className="title">People Love Living with Realton</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>

            {/*   Displays review section  */}
            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="testimonila_prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                {/* End prev */}

                <div className="col-auto">
                  <div className="pagination swiper--pagination testimonila_pagination__active" />
                </div>
                {/* End pagination */}

                <div className="col-auto">
                  <button className="testimonila_next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
                {/* End Next */}
              </div>
            </div>

            {/* End .col for navigation and pagination */}
          </div>
          {userReviewsLoading ? (
            <Loading />
          ) : userReviewsError ? (
            <Error />
          ) : (
            userReviews && (
              <Swiper
                className="overflow-visible"
                spaceBetween={30}
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: ".testimonila_next__active",
                  prevEl: ".testimonila_prev__active",
                }}
                pagination={{
                  el: ".testimonila_pagination__active",
                  clickable: true,
                }}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  1200: {
                    slidesPerView: 3,
                  },
                }}
              >
                {userReviews.map((userReview) => (
                  <SwiperSlide key={userReview.id}>
                    <div className="item">
                      <div className="testimonial-style1 position-relative">
                        <div className="testimonial-content">
                          <h5 className="title">{userReview.title}</h5>
                          <span className="icon fas fa-quote-left" />
                          <p>{userReview?.review}</p>
                          <div className="testimonial-review">
                            {Array.from(
                              { length: userReview?.stars },
                              (_, index) => (
                                <a className="me-1" href="#" key={index}>
                                  <i className="fas fa-star" />
                                </a>
                              )
                            )}
                          </div>
                        </div>
                        <div className="thumb d-flex align-items-center">
                          <div className="flex-grow-1 ms-3">
                            <h6 className="mb-0">{userReview?.name}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default UserReviews;
