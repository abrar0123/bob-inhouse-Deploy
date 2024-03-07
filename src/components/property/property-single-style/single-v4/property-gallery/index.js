import React from 'react';
import GalleryBox from './GalleryBox';
import Map from './Map';
import RealMapView from './RealMapView';

const PropertyGallery = ({ data }) => {
  const address = `${data.Straatnaam} ${data.Straatnummer} ${data.Postcode} ${data.Plaatsnaam}`;

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="ps-v4-hero-tab position-relative">
              <ul
                className="nav nav-pills justify-content-end"
                id="pills-tab2"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active mr10"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    <span className="flaticon-images text-white fz20" />
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link mr10"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    <span className="flaticon-map text-white fz20" />
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-contact-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-contact"
                    type="button"
                    role="tab"
                    aria-controls="pills-contact"
                    aria-selected="false"
                  >
                    <span className="flaticon-maps-1 text-white fz20" />
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* End container */}

      <div className="ps-v4-hero-tab">
        <div className="tab-content overflow-visible" id="pills-tabContent2">
          <div
            className="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <div className="container">
              <div className="row" data-aos="fade-up" data-aos-delay="300">
                <div className="col-lg-12">
                  <div className="ps-v4-hero-slider">
                    <GalleryBox data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End tab-pane gallery */}

          <div
            className="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <div className="col-md-12" style={{ height: '600px' }}>
              <iframe
                className="position-relative bdrs12 mt30 h600"
                loading="lazy"
                src={`https://maps.google.com/maps?q=${data.Naam} ${address}&t=m&z=14&output=embed&iwloc=near`}
                title={data.Naam}
                aria-label={data.Naam}
              />
            </div>
            {/* <Map data={data} /> */}
          </div>
          {/* End tab-pane map */}

          <div
            className="tab-pane fade"
            id="pills-contact"
            role="tabpanel"
            aria-labelledby="pills-contact-tab"
          >
            <RealMapView data={data} />
          </div>
          {/* End tab-pane real location */}
        </div>
        {/* End tab-content */}
      </div>
    </>
  );
};

export default PropertyGallery;
