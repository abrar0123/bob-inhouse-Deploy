"use client";
import Blog from "@/components/common/Blog";
import Error from "@/components/common/Error";
import Loading from "@/components/common/Loading";
import { fetchHomeBlogs } from "@/slices/blogsSlice";
import { fetchUserReviews, postUserReviews } from "@/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HomeBlogs = () => {
  const { homeBlogs, homeBlogsLoading, homeBlogsError } = useSelector(
    (state) => state.blogs
  );


  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHomeBlogs());
    dispatch(fetchUserReviews());
  }, []);

  return homeBlogsLoading ? (
    <Loading />
  ) : homeBlogsError ? (
    <Error error={homeBlogsError} />
  ) : (
    <section className="mb75 mb0-md pb30-md">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 m-auto" data-aos="fade-up">
            <div className="main-title text-start text-md-center">
              <h2 className="title">From Our Blog</h2>
              <p className="paragraph">
                Aliquam lacinia diam quis lacus euismod
              </p>
            </div>
          </div>
        </div>
        <div className="row" data-aos="fade-up" data-aos-delay="300">
          <Blog blogs={homeBlogs} />
        </div>
        <div className="main-title text-start text-md-center">
          <h2 className="title">Home Reviews </h2>
        </div>
      </div>
    </section>
  );
};

export default HomeBlogs;
