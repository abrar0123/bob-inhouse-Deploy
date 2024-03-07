'use client';
import React, { useMemo } from 'react';

const PropertyFeaturesAminites = ({ singleListing }) => {
  const filteredData = useMemo(() => {
    if (singleListing.Activiteiten) {
      const amenitiesData = JSON.parse(singleListing.Activiteiten);
      const datafiltered = Object.entries(amenitiesData)
        .map((item) => {
          if (Array.isArray(item[1])) {
            return { heading: item[0], values: item[1]?.map((e) => e) };
          } else {
            return null;
          }
        })
        .filter(Boolean);
      return datafiltered;
    }
  }, [singleListing]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {filteredData?.map((item, index) => (
        <div className="grid-item">
          <p key={index} className="text mb10" style={{ fontWeight: 'bold' }}>
            {item.values.length > 0 && item.heading}
          </p>
          {item.values}
          {item.values.map((data) => {
            return <div>{data}</div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default PropertyFeaturesAminites;
