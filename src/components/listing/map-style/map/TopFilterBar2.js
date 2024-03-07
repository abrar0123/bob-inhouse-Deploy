"use client";

import React, { useState, useEffect } from "react";
import LocationDropdown from "@/components/home/home-v4/hero/LocationDropdown";
import useOutsideAlerter from "@/hooks/onOutsideClick";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateFilters } from "@/slices/listingSlice";
import { useSearchParams } from "next/navigation";

const TopFilterBar2 = () => {
  const search = useSearchParams();
  const newCity = search.get("locations");


  const wrapperRef = useRef(null);
  const { locations } = useSelector((state) => state.listing.filters);

  const [isDropdown, setIsDropdown] = useState(false);
  const [dropData, setdropData] = useState([]);
  const dispatch = useDispatch();
  useOutsideAlerter(wrapperRef, () => {
    setIsDropdown(false);
  });

  const dropDataHandler = (data) => {
    setdropData(data);
  };

  useEffect(() => {
    dispatch(updateFilters({ fields: [...locations, newCity, ...dropData] }));
  }, [dropData, newCity]);

  return (
    <div ref={wrapperRef}>
      <li className="list-inline-item position-relative">
        <div
          className="location-card bgc-f7 bdrs12 form-control "
          style={{ background: "white" }}
          onClick={() => {
            setIsDropdown(!isDropdown);
          }}
        >
          <span className="flaticon-home-1 " />
          <>
            {locations?.length > 0 ? (
              locations?.map((item) => (
                <div className="boxContainer">
                  <p className="scrollable-text">{item}</p>
                  <div
                    onClick={() => {
                      // let rep = [...dropData];
                      // const s = rep[i];
                      // const newArr = rep.filter((item) => {
                      //   if (item != s) {
                      //     return item;
                      //   }
                      // });
                      // setdropData(newArr);
                      // setIsDropdown(false);
                    }}
                    className="smallbox"
                  >
                    <p
                      style={{
                        color: "white",
                        margin: "0px",
                        padding: "0px",
                        boxSizing: "border-box",
                      }}
                    >
                      x
                    </p>{" "}
                  </div>
                </div>
              ))
            ) : (
              <div>Click to Find Location</div>
            )}
          </>
        </div>

        {isDropdown && <LocationDropdown dropDataHandler={dropDataHandler} />}
      </li>
      <li className="list-inline-item">
        <button
          type="button"
          className="open-btn mb15"
          data-bs-toggle="modal"
          data-bs-target="#advanceSeachModal"
        >
          <i className="flaticon-settings me-2" /> More Filter
        </button>
      </li>
    </div>
  );
};

export default TopFilterBar2;
