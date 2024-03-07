'use client';
import Select from 'react-select';
import PriceRange from './PriceRange';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import {
  advancedFilters,
  advancedUserFilters,
  fetchFilteredListing,
} from '@/slices/listingSlice';
import { retriveListingFilterCatagories } from '@/utilis/helpers';

const AdvanceFilterModal = ({ listing, listingLoading }) => {
  const router = useRouter();
  const [selectedValues, setselectedValues] = useState({
    activities: {},
    catagories: {},
    features: {},
    services: {},
    distance: 10,
  });

  const { selectedListing } = useSelector((state) => state.listing.filters);

  const {
    advancedFiltersValues,
    advancedFiltersLoading,
    listingFilters,
    listingFiltersLoading,
  } = useSelector((state) => state.listing);
  const [resetFilterValue, setresetFilterValue] = useState({
    value: null,
    label: null,
  });

  const { advanced } = useSelector((state) => state.listing.filters);

  const filterCatagories = useMemo(
    () => retriveListingFilterCatagories('catagories'),
    [listing]
  );

  const dispatch = useDispatch();

  // console.log('distance00 : ');
  const filteHandler = () => {
    dispatch(
      fetchFilteredListing({
        activities: selectedListing?.activities?.label
          ? selectedListing?.activities?.label
          : '',
        services: selectedListing?.services?.label
          ? selectedListing?.services?.label
          : '',
        features: selectedListing?.features?.label
          ? selectedListing?.features?.label
          : '',
        category: selectedListing?.catagories?.label
          ? selectedListing?.catagories?.label
          : '',
        distance: selectedListing?.distance,
      })
    );
  };
  const filterData = [
    {
      id: 1,
      name: 'Categories',
      title: 'Catagories',
      catatagory: filterCatagories,
    },
    {
      id: 2,
      name: 'Activites',
      title: 'Activites',
      catatagory: advancedFiltersValues.activities,
    },
    {
      id: 3,
      name: 'Services',
      title: 'Services',
      catatagory: advancedFiltersValues.services,
    },
    {
      id: 4,
      name: 'Features',
      title: 'Facilites',
      catatagory: advancedFiltersValues.features,
    },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? '#bcbcbc'
          : isHovered
          ? '#eb675312'
          : isFocused
          ? '#eb675312'
          : '#fff',
      };
    },
  };

  const distanceHandler = (distance) => {
    setselectedValues({ ...selectedValues, distance });
  };

  useEffect(() => {
    dispatch(advancedUserFilters({ filterData: selectedValues }));
  }, [selectedValues]);

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      <div className="modal-content">
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">
            More Filter
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          />
        </div>
        <div className="modal-body pb-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">Distance</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange distanceHandler={distanceHandler} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            {filterData.map((item, index) => {
              return (
                <div className="col-sm-6" key={index}>
                  <div className="widget-wrapper">
                    <h6 className="list-title">{item.name}</h6>
                    <div className="form-style2 input-group">
                      <Select
                        isLoading={advancedFiltersLoading}
                        defaultValue={
                          item.title == 'Catagories'
                            ? advanced?.catagories
                            : item.title == 'Activites'
                            ? advanced?.activities
                            : item.title == 'Services'
                            ? advanced?.services
                            : item.title == 'Facilites'
                            ? advanced?.features
                            : {
                                value: 'select an option',
                                label: 'select an option',
                              }
                        }
                        name="colors"
                        options={item.catatagory}
                        value={
                          resetFilterValue.value != null
                            ? resetFilterValue
                            : item.catagories
                        }
                        onChange={(value) => {
                          setresetFilterValue({ value: null, label: null });
                          if (value.value == 'Activiteiten') {
                            setselectedValues({
                              ...selectedValues,
                              activities: value,
                            });
                          }
                          if (value.value == 'catagories') {
                            setselectedValues({
                              ...selectedValues,
                              catagories: value,
                            });
                          }
                          if (value.value == 'Zwemles Features') {
                            setselectedValues({
                              ...selectedValues,
                              features: value,
                            });
                          }
                          if (value.value == 'Voorzieningen') {
                            setselectedValues({
                              ...selectedValues,
                              services: value,
                            });
                          }
                        }}
                        className="select-custom"
                        classNamePrefix="select"
                        required
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="modal-footer justify-content-between">
          <button
            className="reset-button"
            onClick={() => {
              setselectedValues([]);
              setresetFilterValue({
                value: 'select an option',
                label: 'select an option',
              });
            }}
          >
            <span className="flaticon-turn-back" />
            <u>Reset all filters</u>
          </button>
          <div className="btn-area">
            <button
              data-bs-dismiss="modal"
              type="submit"
              className="ud-btn btn-thm"
              onClick={() => {
                dispatch(advancedFilters({ filterData: selectedValues }));
                router.push('/vergelijk-zwembad');
                filteHandler();
              }}
            >
              <span className="flaticon-search align-text-top pr10" />
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
