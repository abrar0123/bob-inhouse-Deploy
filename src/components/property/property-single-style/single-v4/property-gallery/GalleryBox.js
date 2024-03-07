'use client';

import Image from 'next/image';

const GalleryBox = ({ data }) => {
  return (
    <div className="item">
      <Image
        width={1170}
        height={600}
        className="bdrs12 w-100 cover"
        src={
          data?.coordinates?.streetViewImageUrl ||
          '/images/listings/listing-single-slide1.jpg'
        }
        alt={data.Naam}
      />
    </div>
  );
};

export default GalleryBox;
