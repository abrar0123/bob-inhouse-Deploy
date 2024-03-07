import Image from 'next/image';
import React from 'react';

const Loading = ({ height, width }) => {
  return (
    <div className="loading-wrap">
      <Image
        src="/images/loading/loading.svg"
        alt="loading"
        height={height ? height : 100}
        width={width ? width : 100}
      />
    </div>
  );
};

export default Loading;
