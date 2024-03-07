'use client';

import React from 'react';

const TopFilterBar = ({ pageContentTrac }) => {
  return (
    <>
      <div className="col-sm-6">
        <div className="text-center text-sm-start">
          <p className="pagination_page_count mb-0">
            Showing {pageContentTrac[0]}–
            {pageContentTrac[2] < pageContentTrac[1]
              ? pageContentTrac[2]
              : pageContentTrac[1]}{' '}
            of {pageContentTrac[2]} results
          </p>
        </div>
      </div>
    </>
  );
};

export default TopFilterBar;
