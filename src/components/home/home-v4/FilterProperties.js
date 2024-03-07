'use client';
import AddToComparison from '@/components/common/AddToComparison';
import AddToFavorites from '@/components/common/AddToFavorites';
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loading';
import { fetchFeaturedListing } from '@/slices/listingSlice';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const FilterProperties = () => {
  const dispatch = useDispatch();

  const { featuredListing, featuredListingLoading, featuredListingError } =
    useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(fetchFeaturedListing());
  }, []);

  return featuredListingLoading ? (
    <Loading />
  ) : featuredListingError ? (
    <Error error={featuredListingError} />
  ) : !featuredListing || featuredListing.length === 0 ? (
    <></>
  ) : (
    <>
      <div className="row wow fadeInUp" data-wow-delay="100ms">
        <div className="col-lg-6">
          <div className="main-title2">
            <h2 className="title">Discover Popular Properties</h2>
            <p className="paragraph">Aliquam lacinia diam quis lacus euismod</p>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
          <div className="tab-content">
            <div className="row">
              {featuredListing.map((listing, index) => (
                <div className="col-md-6 col-xl-4" key={index}>
                  <div className="listing-style6">
                    <div className="list-thumb">
                      <Image
                        width={386}
                        height={334}
                        className="w-100 cover"
                        src={'/images/listings/g1-1.jpg'}
                        alt="listings"
                      />

                      <div className="sale-sticker-wrap">
                        <div className="list-tag fz12 text-capitalize">
                          <span className="flaticon-electricity me-2 " />
                          {listing['Pool, school or club']}
                        </div>
                      </div>

                      <div className="list-meta">
                        <div className="icons">
                          <AddToFavorites item={listing} />
                          <AddToComparison item={listing} />
                        </div>
                      </div>
                    </div>
                    <div className="list-content">
                      <div
                        className="list-price mb-2"
                        style={{ top: '-50px', right: '0px' }}
                      >
                        10KM
                      </div>
                      <h6 className="list-title">
                        <Link href={`/${listing._id}`}>{listing.Naam}</Link>
                      </h6>
                      <p className="list-text">{`${listing.Straatnaam} ${listing.Straatnummer} ${listing.Postcode} ${listing.Plaatsnaam}`}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterProperties;
