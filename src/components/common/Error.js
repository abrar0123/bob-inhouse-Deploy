import React from 'react';

const Error = ({ error }) => {
  return (
    <div className="loading-wrap">
      <p>{error}</p>
    </div>
  );
};

export default Error;
