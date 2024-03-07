import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveToken } from '@/slices/authSlice';
import { fetchFavorites, fetchUser } from '@/slices/userSlice';
import {
  fetchAdvancedFilter,
  fetchFilteredListing,
  fetchListing,
  setUserLocation,
} from '@/slices/listingSlice';
import { parseCookies } from 'nookies';
import { fetchAuthor } from '@/slices/authorSlice';
import { fetchPopularCities } from '@/slices/popluarCitiesSlice';

const Wrap = ({ children }) => {
  const dispatch = useDispatch();

  const userLocation = useSelector((state) => state.listing.userLocation);
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            resolve(userLocation);
          },
          (error) => {
            if (error.code === 1) {
              console.error('User denied geolocation.');
            } else {
              console.error('Error getting user location:', error);
            }
            reject(error);
          }
        );
      } else {
        console.error('Geolocation is not supported.');
        reject(new Error('Geolocation is not supported.'));
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAdvancedFilter());
  }, []);

 

  useEffect(() => {
    const cookies = parseCookies();
    dispatch(fetchAuthor());
    dispatch(fetchPopularCities());
    if (cookies.token) {
      dispatch(saveToken(cookies.token));
      dispatch(fetchUser(cookies.token));
      dispatch(fetchFavorites(cookies.token));
    }

    getUserLocation()
      .then((userLocation) => {
        dispatch(setUserLocation(userLocation));
      })
      .catch((error) => {
        console.error('Error:', error);
        dispatch(fetchListing());
      });
  }, []);

  useEffect(() => {
    if (userLocation) {
      dispatch(fetchListing(userLocation));
    }
  }, [userLocation]);

  return <div>{children}</div>;
};

export default Wrap;
