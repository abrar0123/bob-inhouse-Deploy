import React, { useMemo, useState } from 'react';

const PopularTags = ({ tags, getTagsProp }) => {
  const [select, setselect] = useState(-1);

  return (
    <div className="sidebar-widget mb30 pb20">
      <h6 className="widget-title">Popular Tags</h6>
      <div className="tag-list mt20 tagsContainer">
        {tags?.map((tag, index) => (
          <div
            className="sidebar-categories tagsBoxStyle"
            style={{ textTransform: 'capitalize' }}
            key={index}
            onClick={() => {
              setselect(index);
              getTagsProp(tag);
            }}
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
