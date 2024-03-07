import AddToComparison from '@/components/common/AddToComparison';
import Image from 'next/image';
import Link from 'next/link';

const FeaturedListings = ({ data, colstyle }) => {
  return (
    <>
      {data.map((listing) => {
        const address = `${listing.Naam} ${listing.Plaatsnaam} ${listing.Straatnaam}`;

        return (
          <div
            className={`${colstyle ? 'col-sm-12 col-lg-6' : 'col-sm-6'}  `}
            key={listing._id}
          >
            <div
              className={
                colstyle
                  ? 'listing-style6 listCustom listing-type'
                  : 'listing-style6'
              }
            >
              <div className="list-thumb" style={{ position: 'relative' }}>
                <Image
                  width={386}
                  height={334}
                  className="w-100 cover"
                  style={{ height: '334px' }}
                  src={
                    listing.coordinates?.streetViewImageUrl ||
                    '/images/listings/listing-single-slide1.jpg'
                  }
                  alt={listing.Naam}
                />

                {/* p1 */}
                {listing['Pool, school or club'] && (
                  <div className="sale-sticker-wrap">
                    <div className="list-tag fz12 text-capitalize">
                      <span className="flaticon-electricity me-2" />
                      {listing['Pool, school or club']}
                    </div>
                  </div>
                )}

                <div className="list-meta">
                  <div className="icons">
                    <a href="#">
                      <span className="flaticon-like" />
                    </a>
                    <AddToComparison item={listing} />
                    <a href="#">
                      <span className="flaticon-fullscreen" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="list-content">
                {/* {listing?.distance && ( */}
                <div
                  className="list-price mb-2"
                  style={{ top: '-50px', right: '0px' }}
                >
                  {/* {(listing.distance / 1000).toFixed(2)}KM */}
                  1KM
                </div>
                {/*  )} */}
                <h6 className="list-title">
                  <Link href={`/${listing._id}`}>{listing.Naam}</Link>
                </h6>
                <p className="list-text">{address}</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default FeaturedListings;
