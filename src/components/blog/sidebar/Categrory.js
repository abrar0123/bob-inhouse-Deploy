import React, { useMemo, useState } from 'react';

const Category = ({ categories, categoryProp, getCategoryProp }) => {
  const [showMore, setshowMore] = useState(false);
  const [selectCat, setselectCat] = useState(-1);

  const memoCategories = useMemo(() => {
    if (showMore == true) {
      return categories.slice(0);
    }
    return categories.slice(0, 10);
  }, [categories, showMore]);

  return (
    <div className="sidebar-widget mb30">
      <h6 className="widget-title">Blog Categories</h6>
      <div
        className="category-list d-flex flex-column mt20"
        style={{ textTransform: 'capitalize' }}
      >
        {memoCategories?.map((category, index) => (
          <div
            className="sidebar-categories"
            style={{
              color: selectCat == index && categoryProp && '#f93a1c',
            }}
            key={index}
            onClick={() => {
              setselectCat(index);
              getCategoryProp(category);
            }}
          >
            {category}
          </div>
        ))}
        {showMore ? (
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => setshowMore(!showMore)}
          >
            show less
          </div>
        ) : (
          categories.length > 10 && (
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => setshowMore(!showMore)}
            >
              show more
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Category;
