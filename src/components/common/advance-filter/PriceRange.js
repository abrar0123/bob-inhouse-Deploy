'use client';
import React, { useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

const PriceRange = ({ distanceHandler }) => {
  const [distance, setdistance] = useState(10);
  const handleOnChange = (value) => {
    setdistance(value);
  };

  return (
    <>
      <div className="range-wrapper">
        <InputRange
          formatLabel={() => ``}
          maxValue={100}
          minValue={0}
          value={distance}
          onChange={(value) => {
            handleOnChange(value);
            distanceHandler(value);
          }}
          id="slider"
          draggableTrack={true}
        />
        <div style={{ width: '200%' }} className="d-flex align-items-center">
          <span
            style={{ alignSelf: 'center', textAlign: 'center' }}
            id="slider-range-value1"
          >
            km {distance}
          </span>
        </div>
      </div>
    </>
  );
};

export default PriceRange;
