'use client';

const PropertyVideo = ({ url }) => {
  return (
    <div className="col-md-12">
      <div className="property_video bdrs12 w-100">
        <button
          className="video_popup_btn mx-auto popup-img"
          onClick={() => window.open(url, '_blank')}
          style={{ border: 'none', background: 'transparent' }}
        >
          <span className="flaticon-play" />
        </button>
      </div>
    </div>
  );
};

export default PropertyVideo;
