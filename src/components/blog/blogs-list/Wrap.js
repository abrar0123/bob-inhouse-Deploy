'use client';

import DefaultHeader from '@/components/common/DefaultHeader';
import MobileMenu from '@/components/common/mobile-menu';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import Blog from './Blog';
import debounce from 'lodash/debounce';

import BlogSidebar from '../sidebar';
import Footer from '@/components/home/home-v4/footer';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '@/components/common/Loading';
import Error from '@/components/common/Error';
import Pagination from '../Pagination';
import {
  fetchBlogs,
  fetchBlogsCategories,
  fetchBlogsTags,
  fetchLatestBlogs,
} from '@/slices/blogsSlice';

const Wrap = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [selectCategory, setSelectCategory] = useState('');
  const [selectTag, setSelectTag] = useState('');
  const {
    blogs,
    blogsLoading,
    blogsError,
    totalBlogs,
    blogsCategories,
    blogsCategoriesLoading,
    blogsCategoriesError,
    latestBlogsLoading,
    latestBlogs,
    blogsTagsLoading,
    blogsTags,
  } = useSelector((state) => state.blogs);

  const getCategoryProp = (data) => {
    setSelectCategory(data);
    setSelectTag('');
  };
  const getTagsProp = (data) => {
    setSelectTag(data);
    setSelectCategory('');
  };

  const totalPages = useMemo(() => {
    if (totalBlogs) {
      return Math.ceil(totalBlogs / 10);
    } else {
      return 0;
    }
  }, [totalBlogs]);

  const performSearch = (query) => {
    dispatch(
      fetchBlogs({ page, searchText: query, selectCategory, selectTag })
    );
  };

  useEffect(() => {
    dispatch(fetchBlogsCategories());
    dispatch(fetchBlogsTags());
    dispatch(fetchLatestBlogs());
  }, []);

  const tags = useMemo(() => {
    if (blogsTags) {
      const tagsArray = blogsTags.flatMap((tag) =>
        tag?.split(',').map((tag) => tag.trim())
      );
      return tagsArray;
    } else {
      return [];
    }
  }, [blogs]);

  useEffect(() => {
    setPage(1);
  }, [searchText, selectCategory, selectTag]);

  useEffect(() => {
    dispatch(fetchBlogs({ page, searchText, selectCategory, selectTag }));
  }, [page, selectCategory, selectTag]);

  return (
    <div className="bgc-f7">
      <DefaultHeader />
      <MobileMenu />
      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Blog</h2>
                <div className="breadcumb-list">
                  <Link href="/">Home</Link>
                  <span>Blog</span>
                </div>
                {selectCategory ? (
                  <div className="categoryContainer">
                    <p className="category-text">{selectCategory}</p>
                    <div
                      className="categorybox"
                      onClick={() => {
                        setSelectCategory('');
                      }}
                    >
                      <p className="category-text-cont">x</p>
                    </div>
                  </div>
                ) : (
                  selectTag && (
                    <div className="categoryContainer">
                      <p className="category-text">{selectTag}</p>
                      <div
                        className="categorybox"
                        onClick={() => {
                          setSelectTag('');
                        }}
                      >
                        <p className="category-text-cont">x</p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-blog pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-8">
              {blogsLoading ? (
                <Loading />
              ) : blogsError ? (
                <Error error={blogsError} />
              ) : (
                <>
                  <Blog blogs={blogs} />
                  <div className="row">
                    <div className="mbp_pagination text-center">
                      <Pagination
                        totalPages={totalPages}
                        currentPage={page}
                        setCurrentPage={setPage}
                      />
                      <p className="mt10 pagination_page_count text-center">
                        {page === 1 ? 1 : 10 * (page - 1) + 1} –{' '}
                        {page === totalPages ? totalBlogs : 10 * page} of{' '}
                        {totalBlogs} property available
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            {blogsCategoriesLoading ||
            latestBlogsLoading ||
            blogsTagsLoading ? (
              <Loading />
            ) : blogsCategoriesError ? (
              <Error />
            ) : (
              blogsCategories.length > 0 && (
                <div className="col-lg-4">
                  <BlogSidebar
                    categories={blogsCategories}
                    tags={tags}
                    latestBlogs={latestBlogs}
                    setSearchText={setSearchText}
                    performSearch={performSearch}
                    searchText={searchText}
                    getCategoryProp={getCategoryProp}
                    getTagsProp={getTagsProp}
                    categoryProp={selectCategory}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </div>
  );
};

export default Wrap;
