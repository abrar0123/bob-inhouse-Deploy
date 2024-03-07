import React from 'react';
import SearchBox from './SearchBox';
import Categrory from './Categrory';
import LatestPost from './LatestPost';
import PopularTags from './PopularTags';

const BlogSidebar = ({
  categories,
  tags,
  setSearchText,
  performSearch,
  searchText,
  getCategoryProp,
  getTagsProp,
  categoryProp,
  latestBlogs,
}) => {
  return (
    <div className="blog-sidebar">
      <SearchBox
        setSearchText={setSearchText}
        searchText={searchText}
        performSearch={performSearch}
      />
      <Categrory
        categoryProp={categoryProp}
        categories={categories}
        getCategoryProp={getCategoryProp}
      />
      <LatestPost latestBlogs={latestBlogs} />
      <PopularTags tags={tags} getTagsProp={getTagsProp} />
    </div>
  );
};

export default BlogSidebar;
