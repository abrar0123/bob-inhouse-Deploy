"use client";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoWindow,
} from "@react-google-maps/api";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/common/Loading";
import { useSelector } from "react-redux";
import { mapContainerStyle, mapOptions } from "@/utilis/mapStyle";

export default function ListingMap1({ data }) {
  const [getLocation, setLocation] = useState(null);
  const userLocation = useSelector((state) => state.listing.userLocation);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });
  const center = useMemo(() => ({ lat: 51.775306, lng: 5.06292 }), []);
  // const center = useMemo(
  //   () => (userLocation ? userLocation : { lat: 51.775306, lng: 5.06292 }),
  //   [userLocation],
  // );

  // add long & lat
  const locationHandler = (location) => {
    setLocation(location);
  };

  // close handler
  const closeCardHandler = () => {
    setLocation(null);
  };

  return (
    <>
      {!isLoaded ? (
        <Loading />
      ) : userLocation ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          options={mapOptions}
        >
          <Marker
            position={{
              lat: userLocation.lat,
              lng: userLocation.lng,
            }}
            label="You are here"
          />
          {data.map((marker, index) => (
            <Marker
              key={index}
              position={{
                lat: marker.coordinates?.lat,
                lng: marker.coordinates?.lng,
              }}
              title={marker.title}
              onClick={() => locationHandler(marker)}
            />
          ))}
          {getLocation !== null && (
            <InfoWindow
              position={{
                lat: getLocation.coordinates?.lat,
                lng: getLocation.coordinates?.lng,
              }}
              onCloseClick={closeCardHandler}
            >
              <div>
                <div className="listing-style1">
                  <div className="list-thumb">
                    <Image
                      width={382}
                      height={248}
                      className="w-100 h-100 cover"
                      src={getLocation.coordinates.streetViewImageUrl}
                      alt="listings"
                    />
                  </div>
                  <div className="list-content">
                    <h6 className="list-title">
                      <Link href={`/single-v1/${getLocation.id}`}>
                        {getLocation.title}
                      </Link>
                    </h6>
                    <p className="list-text" style={{ width: "250px" }}>
                      {getLocation.lv_listing_google_address}
                    </p>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          options={mapOptions}
        >
          {data.map((marker, index) => (
            <Marker
              key={index}
              position={{
                lat: marker.coordinates.lat,
                lng: marker.coordinates.lng,
              }}
              title={marker.title}
              onClick={() => locationHandler(marker)}
            />
          ))}
          {getLocation !== null && (
            <InfoWindow
              position={{
                lat: getLocation.coordinates.lat,
                lng: getLocation.coordinates.lng,
              }}
              onCloseClick={closeCardHandler}
            >
              <div>
                <div className="listing-style1">
                  <div className="list-thumb">
                    <Image
                      width={382}
                      height={248}
                      className="w-100 h-100 cover"
                      src={getLocation.coordinates.streetViewImageUrl}
                      alt="listings"
                    />
                  </div>
                  <div className="list-content">
                    <h6 className="list-title">
                      <Link href={`/single-v1/${getLocation.id}`}>
                        {getLocation.title}
                      </Link>
                    </h6>
                    <p className="list-text" style={{ width: "250px" }}>
                      {getLocation.lv_listing_google_address}
                    </p>
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </>
  );
}
