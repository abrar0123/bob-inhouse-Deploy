'use client';

import DefaultHeader from '@/components/common/DefaultHeader';
import Footer from '@/components/home/home-v4/footer';
import MobileMenu from '@/components/common/mobile-menu';
import PropertyAddress from '@/components/property/property-single-style/common/PropertyAddress';
import PropertyDetails from '@/components/property/property-single-style/common/PropertyDetails';
import PropertyFeaturesAminites from '@/components/property/property-single-style/common/PropertyFeaturesAminites';
import PropertyHeader from '@/components/property/property-single-style/single-v4/PropertyHeader';
import PropertyNearby from '@/components/property/property-single-style/common/PropertyNearby';
import PropertyVideo from '@/components/property/property-single-style/common/PropertyVideo';
import ProperytyDescriptions from '@/components/property/property-single-style/common/ProperytyDescriptions';
import ReviewBoxForm from '@/components/property/property-single-style/common/ReviewBoxForm';
import AllReviews from '@/components/property/property-single-style/common/reviews';
import PropertyGallery from '@/components/property/property-single-style/single-v4/property-gallery';
import OpeningHours from '@/components/property/property-single-style/common/OpeningHours';
import MoreIfno from '@/components/property/property-single-style/common/MoreInfo';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSingleListing,
  fetchSingleListingReviews,
} from '@/slices/listingSlice';
import Loading from '../common/Loading';
import Error from '../common/Error';
import AdBanner from '../property/property-single-style/common/AdBanner';
import PriceTable from '../property/property-single-style/common/PriceTable';

const Wrap = ({ id }) => {
  const dispatch = useDispatch();

  const {
    singleListing,
    singleListingLoading,
    singleListingError,
    singleListingReviews,
    singleListingReviewsLoading,
    singleListingReviewsError,
  } = useSelector((state) => state.listing);

  useEffect(() => {
    dispatch(fetchSingleListing(id));
  }, [id]);


  useEffect(() => {
    if (singleListing) {
      dispatch(fetchSingleListingReviews(singleListing._id));
    }
  }, [singleListing]);

  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      {singleListingLoading ? (
        <Loading />
      ) : singleListingError ? (
        <Error error={singleListingError} />
      ) : (
        singleListing && (
          <>
            <section className="pt20 pb60 bgc-white">
              <PropertyGallery data={singleListing} />
            </section>
            <section className="pt0 pb90 bgc-white">
              <div className="container">
                <div className="row">
                  <PropertyHeader data={singleListing} />
                </div>
                <div className="row wrap">
                  <div className="col-lg-8">
                    {singleListing['Introductie'] && (
                      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                        <React.Fragment>
                          <h4 className="title fz17 mb30">
                            Property Description{' '}
                          </h4>
                          <ProperytyDescriptions data={singleListing} />
                        </React.Fragment>
                      </div>
                    )}
                    <AdBanner />
                    {singleListing['Tarieven (text)'] && (
                      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                        <h4 className="title fz17 mb30">Price Table</h4>
                        <PriceTable data={singleListing} />
                      </div>
                    )}
                    {(singleListing['Openstelling Maandag'] ||
                      singleListing['Openstelling Dinsdag'] ||
                      singleListing['Openstelling Woensdag'] ||
                      singleListing['Openstelling Donderdag'] ||
                      singleListing['Openstelling Vrijdag'] ||
                      singleListing['Openstelling Zaterdag'] ||
                      singleListing['Openstelling Zondag']) && (
                      <>
                        <h4 className="title fz17 mb30 mt50">Opening Hours</h4>
                        <OpeningHours data={singleListing} />
                      </>
                    )}
                    {singleListing?.Beschrijving && (
                      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                        <h4 className="title fz17 mb30 mt50">More Info</h4>
                        <MoreIfno data={singleListing} />
                      </div>
                    )}
                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">Facilities</h4>
                      <div className="row">
                        <PropertyDetails data={singleListing} />
                      </div>
                    </div>

                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">Activiteiten</h4>
                      <div className="row">
                        <PropertyFeaturesAminites
                          singleListing={singleListing}
                        />
                      </div>
                    </div>

                    {singleListing.youtube && (
                      <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                        <h4 className="title fz17 mb30">Youtube</h4>
                        <div className="row">
                          <PropertyVideo url={singleListing.youtube} />
                        </div>
                      </div>
                    )}

                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                      <div className="row">
                        <PropertyNearby />
                      </div>
                    </div>

                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30 mt30">Address</h4>
                      <div className="row">
                        <PropertyAddress data={singleListing} />
                      </div>
                    </div>

                    {singleListingReviewsLoading ? (
                      <Loading />
                    ) : singleListingReviewsError ? (
                      <Error error={singleListingReviewsError} />
                    ) : (
                      singleListingReviews &&
                      singleListingReviews.length > 0 && (
                        <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                          <div className="row">
                            <AllReviews reviews={singleListingReviews} />
                          </div>
                        </div>
                      )
                    )}
                    <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                      <h4 className="title fz17 mb30">Leave A Review</h4>
                      <div className="row">
                        <ReviewBoxForm id={singleListing._id} />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="column">
                      <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                        <h4 className="form-title mb5">
                          ad/affiliate marketing
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )
      )}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </>
  );
};

export default Wrap;
