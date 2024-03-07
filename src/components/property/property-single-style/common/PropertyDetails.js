import React, { useMemo } from 'react';

const PropertyDetails = ({ data }) => {
  const facilitiesData = useMemo(() => {
    if (data) {
      const facilities = JSON.parse(data['Zwemles Features']);

      const dataMapping = Object.entries(facilities)
        .map((data) => {
          if (Array.isArray(data[1])) {
            return { heading: data[0], values: data[1]?.map((d) => d) };
          } else {
            return null;
          }
        })
        .filter(Boolean);
      return dataMapping;
    }
  }, []);


  return (
    <div className="row">
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {facilitiesData?.map((item, index) => (
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
    </div>
  );
};

export default PropertyDetails;
