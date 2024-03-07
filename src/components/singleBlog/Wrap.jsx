"use client";

import React, { useEffect } from "react";
import Details from "@/components/blog/blog-single/Details";
import ReviewBoxForm from "@/components/blog/blog-single/ReviewBoxForm";
import Social from "@/components/blog/blog-single/Social";
import Tags from "@/components/blog/blog-single/Tags";
import TopComments from "@/components/blog/blog-single/TopComments";
import AllReviews from "@/components/blog/blog-single/reviews";
import Blog from "@/components/common/Blog";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/home/home-v4/footer";
import MobileMenu from "@/components/common/mobile-menu";
import {
  fetchRelatedBlogs,
  fetchSingleBlog,
  fetchSingleBlogReviews,
} from "@/slices/blogsSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../common/Loading";
import Error from "../common/Error";
import parse from "html-react-parser";
import { fetchSingleListingReviews } from "@/slices/listingSlice";

const Wrap = ({ Slug }) => {
  const dispatch = useDispatch();

  const {
    singleBlog,
    singleBlogLoading,
    singleBlogError,
    relatedBlogs,
    relatedBlogsError,
    relatedBlogsLoading,
  } = useSelector((state) => state.blogs);

  const { author, authorLoading, authorError } = useSelector(
    (state) => state.author
  );

  const { blogsReviews, blogsReviewLoading, blogsReviewError } = useSelector(
    (state) => state.blogs
  );
  useEffect(() => {
    dispatch(fetchSingleBlog(Slug));
  }, [Slug]);

  useEffect(() => {
    if (singleBlog) {
      dispatch(fetchSingleBlogReviews(singleBlog._id));
    }
  }, [singleBlog]);

  useEffect(() => {
    if (singleBlog) {
      const category = singleBlog.Categorie || 0;
      dispatch(fetchRelatedBlogs({ category, id: singleBlog._id }));
    }
  }, [singleBlog, Slug]);

  return (
    <>
      <DefaultHeader />

      <MobileMenu />
      {singleBlogLoading || authorLoading ? (
        <Loading />
      ) : singleBlogError || authorError ? (
        <Error error={singleBlogError || authorError} />
      ) : (
        singleBlog && (
          <>
            <section className="our-blog pt50">
              <Details data={singleBlog} author={author} />

              <div className="container">
                <div className="roww" data-aos="fade-up" data-aos-delay="500">
                  <div className="col-xl-8 offset-xl-2">
                    <div className="text mb40 mt40 listing-content">
                      {parse(singleBlog["Inleiding"])}
                    </div>
                    <div className="text mb10 listing-content">
                      {parse(singleBlog["Main Content"])}
                    </div>
                    <div
                      style={{ fontSize: "24px", fontWeight: "bold" }}
                      className="text mb40 mt40 listing-content"
                    >
                      {parse(singleBlog["Samenvatting"])}
                    </div>
                    <div className="bdrt1 bdrb1 d-block d-sm-flex justify-content-between pt50 pt30-sm pb50 pb30-sm">
                      <div className="blog_post_share d-flex align-items-center mb10-sm">
                        <span className="mr30">Share this post</span>
                        <Social />
                      </div>
                      <div className="bsp_tags d-flex">
                        <Tags />
                      </div>
                    </div>
                    <TopComments author={author} />
                    {blogsReviewLoading ? (
                      <Loading />
                    ) : blogsReviewError ? (
                      <Error />
                    ) : (
                      blogsReviews && <AllReviews blogsReviews={blogsReviews} />
                    )}
                    {/* p1 */}
                    <div className="bsp_reveiw_wrt">
                      <h6 className="fz17">Leave A Review</h6>
                      <ReviewBoxForm blog id={singleBlog._id} />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {relatedBlogsLoading ? (
              <Loading />
            ) : relatedBlogsError ? (
              <Error error={relatedBlogsError} />
            ) : (
              relatedBlogs.length !== 0 && (
                <section className="pb90 pb20-md pt-0">
                  <div className="container">
                    <div className="row">
                      <div
                        className="col-lg-6 m-auto"
                        data-aos="fade-up"
                        data-aos-delay="0"
                      >
                        <div className="main-title text-start text-md-center">
                          <h2 className="title">Related Posts</h2>
                          <p className="paragraph">
                            Aliquam lacinia diam quis lacus euismod
                          </p>
                        </div>
                      </div>
                    </div>
                    <div
                      className="row"
                      data-aos="fade-up"
                      data-aos-delay="300"
                    >
                      <Blog blogs={relatedBlogs} />
                    </div>
                  </div>
                </section>
              )
            )}
          </>
        )
      )}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Wrap;
