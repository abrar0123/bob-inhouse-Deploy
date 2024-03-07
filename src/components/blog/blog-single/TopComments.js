import Image from 'next/image';
import React from 'react';

const TopComments = ({ author }) => {
  return (
    <div className="bsp_comments bdrb1 d-block d-sm-flex justify-content-between pt30 pb45 pb30-sm">
      <div className="mbp_first d-flex">
        <div className="flex-shrink-0">
          <Image
            width={70}
            height={70}
            src={author.image || '/images/blog/comments-1.png'}
            className="mr-3"
            alt="comment-image"
          />
        </div>
        <div className="flex-grow-1 ml30">
          <h6 className="mb0">{author.name}</h6>
          <div className="text fz13 mb20">Medical Assistant</div>
          <p className="text">{author.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default TopComments;
