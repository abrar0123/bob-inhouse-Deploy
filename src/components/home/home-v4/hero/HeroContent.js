'use client';
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import LocationDropdown from './LocationDropdown';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { updateFilters } from '@/slices/listingSlice';
import useOutsideAlerter from '@/hooks/onOutsideClick';
import Autocomplete from 'react-google-autocomplete';

const HeroContent = () => {
  const router = useRouter();
  const wrapperRef = useRef(null);

  const dispatch = useDispatch();

  const [isDropdown, setIsDropdown] = useState(false);
  const [dropData, setdropData] = useState([]);

  useOutsideAlerter(wrapperRef, () => {
    setIsDropdown(false);
  });

  // const dropDataHandler = (data) => {
  //   setdropData(data);
  // };
  return (
    <div
      className="advance-search-tab mt60 mt30-lg mx-auto animate-up-3"
      ref={wrapperRef}
    >
      <div className="tab-content" style={{ borderRadius: '12px' }}>
        <div className={`active tab-pane`}>
          <div className="advance-content-style1">
            <div className="row">
              <div className="col-md-8 col-lg-9">
                <div className="advance-search-field position-relative text-start">
                  <form className="form-search position-relative">
                    <div className="box-search">
                      <div
                        className="bgc-f7 bdrs12 form-control"
                        style={{
                          display: 'flex',
                          cursor: 'pointer',
                          alignItems: 'center',
                          marginBottom: '2px',
                          justifyContent: 'space-between',
                        }}
                        onClick={() => {
                          setIsDropdown(!isDropdown);
                        }}
                      >
                        <>
                          <span className="flaticon-home-1 " />

                          {dropData.length > 0 ? (
                            dropData.map((item, i) => (
                              <div className="boxContainer">
                                <div>
                                  <p className="scrollable-text">{item}</p>
                                </div>
                                <div
                                  className="smallbox"
                                  onClick={() => {
                                    let rep = [...dropData];
                                    const s = rep[i];
                                    const newArr = rep.filter((item) => {
                                      if (item != s) {
                                        return item;
                                      }
                                    });
                                    setdropData(newArr);
                                    setIsDropdown(false);
                                  }}
                                >
                                  <p
                                    style={{
                                      color: 'white',
                                      margin: '0px',
                                      padding: '0px',
                                      boxSizing: 'border-box',
                                    }}
                                  >
                                    x
                                  </p>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div style={{}}>
                              <div>Click to find location</div>
                            </div>
                          )}
                        </>
                        <div
                          className="mapcont"
                          // onClick={getUserLocation}
                        >
                          <i className={'fas fa-location-arrow'} />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              {/* End .col-md-8 */}

              <div className="col-md-4 col-lg-3">
                <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                  <button
                    className="advance-search-btn"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#advanceSeachModal"
                  >
                    <span className="flaticon-settings" /> Advanced
                  </button>
                  <button
                    className="advance-search-icon ud-btn btn-dark ms-4"
                    type="button"
                    onClick={() => {
                      router.push(
                        `/vergelijk-zwembad?locations=${dropData.toString()},`
                      );
                      dispatch(updateFilters({ fields: dropData }));
                    }}
                  >
                    <span className="flaticon-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDropdown && (
        <div className="DropDownLocationContainer">
          <Autocomplete
            className="DropDownLocation form-control bgc-f7 bdrs12"
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
            onPlaceSelected={(place) => {
              console.log('placedComes102 : ', place);
              setdropData([...dropData, place]);
            }}
            options={{
              types: ['(regions)'],
              componentRestrictions: { country: 'ru' },
            }}
            defaultValue={dropData}
          />
        </div>
      )}
      {/* {isDropdown && <LocationDropdown dropDataHandler={dropDataHandler} />} */}
    </div>
  );
};

export default HeroContent;
