import ListingMap1 from '@/components/listing/map-style/ListingMap';
import React from 'react';

const Map = ({ data }) => {
  return (
    <div style={{ height: '600px' }}>
      <ListingMap1 data={data} />
    </div>
  );
};

export default Map;
