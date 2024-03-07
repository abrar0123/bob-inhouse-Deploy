'use client';
import React, { useEffect, useState } from 'react';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

const LocationDropdown = ({ dropDataHandler }) => {
  const [dropData, setdropData] = useState([]);
  const [currentLocation, setCurrentLocation] = useState('');

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  let options = [
    placePredictions[0]?.terms[0].value,
    placePredictions[1]?.terms[0].value,
    placePredictions[2]?.terms[0].value,
    placePredictions[3]?.terms[0].value,
  ];

  useEffect(() => {
    if (placePredictions.length)
      placesService?.getDetails({
        placeId: placePredictions[0].place_id,
      });
  }, [placePredictions]);

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          fetchCity(userLocation.lat, userLocation.lng);
        },
        (error) => {
          if (error.code === 1) {
            console.error('User denied geolocation.');
          } else {
            console.error('Error getting user location:', error);
          }
        }
      );
    } else {
      console.error('Geolocation is not supported.');
    }
  };

  const fetchCity = async (lat, lng) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const city = data.results?.find(
        (item) =>
          item.types.includes('postal_town') || item?.types.includes('locality')
      );
      if (city) {
        setCurrentLocation(city?.formatted_address);
      }
    }
  };

  return (
    <div className="dropdownModel" style={{ zIndex: 999 }}>
      <>
        <div className="mapParent">
          <input
            style={{ outline: 'none', width: '85%', marginBottom: '5px' }}
            className="form-control bgc-f7 bdrs12"
            type="text"
            name="search"
            value={currentLocation}
            placeholder="Enter a location"
            onChange={(evt) => {
              getPlacePredictions({ input: evt.target.value });
              setCurrentLocation(evt.target.value);
            }}
            loading={isPlacePredictionsLoading}
          />
          <div className="mapcont" onClick={getUserLocation}>
            <i className={'fas fa-location-arrow'} />
          </div>
        </div>

        <div className="dropdown-container">
          {placePredictions?.length > 0 && (
            <div className="dropdown-options">
              {options.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-option"
                  onClick={() => {
                    if (dropData.includes(option)) {
                      return false;
                    }
                    setdropData([...dropData, option]);
                    dropDataHandler([...dropData, option]);
                  }}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </>
    </div>
  );
};

export default LocationDropdown;
