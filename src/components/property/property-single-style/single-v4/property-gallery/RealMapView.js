import React from "react";

const RealMapView = ({ data }) => {
  const generateGoogleMapEmbedUrl = (lat, lng) => {
    const baseUrl = "https://www.google.com/maps/embed/v1/streetview";
    const coordinatesString = `${lat},${lng}`;
    const url = `${baseUrl}?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&location=${coordinatesString}`;

    return url;
  };

  return (
    <iframe
      className="h600 w-100"
      src={generateGoogleMapEmbedUrl(
        data.coordinates?.lat,
        data.coordinates?.lng
      )}
      allowFullScreen
    />
  );
};

export default RealMapView;
