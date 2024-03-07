import DefaultHeader from '@/components/common/DefaultHeader';
import MobileMenu from '@/components/common/mobile-menu';
import ReviewsWrap from '@/components/property/property-single-style/common/reviews/ReviewsWrap';

export const metadata = {
  title: 'Reviews ',
};

const Reviews = () => {
  return (
    <>
      <DefaultHeader />
      <MobileMenu />
      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">All Reviews</h2>
              </div>
            </div>
          </div>
        </div>

        <section className="pt0 pb90 bgc-white">
          <div className="container">
            <div className="row wrap">
              <div className="col-lg-8">
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <ReviewsWrap />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Reviews;
