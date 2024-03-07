import React from 'react';
import parse from 'html-react-parser';

const MoreIfno = ({ data }) => {
  return (
    <>
      <p className="text mb10" style={{ whiteSpace: 'break-spaces' }}>
        {parse(data.Beschrijving)}
      </p>
    </>
  );
};

export default MoreIfno;
