import React from 'react';

const ProperytyDescriptions = ({ data }) => {
  return (
    <>
      <p className="text mb10 listing-content">{data['Introductie']}</p>
    </>
  );
};

export default ProperytyDescriptions;
