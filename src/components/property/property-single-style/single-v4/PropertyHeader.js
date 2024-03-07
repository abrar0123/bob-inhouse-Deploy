'use client';
import React from 'react';
import AddToComparison from '@/components/common/AddToComparison';
import Socials from '../common/more-info';

const PropertyHeader = ({ data }) => {
  const address = `${data.Straatnaam} ${data.Straatnummer} ${data.Postcode} ${data.Plaatsnaam}`;

  return (
    <>
      <div className="col-lg-8">
        <div className="single-property-content mb30-md">
          <h2 className="sp-lg-title">{data.Naam}</h2>
          <div className="pd-meta mb15 d-md-flex align-items-center">
            <p className="text fz15 mb-0 pr10 bdrrn-sm">{address}</p>
          </div>
          <Socials data={data} />
          {data['Listing Categorie'] && (
            <div className="property-meta d-flex align-items-center">
              <a className="ff-heading text-thm fz15 pr10 bdrrn-sm" href="#">
                <i className="fas fa-circle fz10 pe-2" />
                {data['Listing Categorie']}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="col-lg-4">
        <div className="single-property-content">
          <div className="property-action text-lg-end">
            <div className="d-flex mb20 mb10-md align-items-center justify-content-lg-end">
              <a className="icon mr10" href="/vergelijk-zwembad">
                <span className="flaticon-like" />
              </a>
              <AddToComparison item={data} big />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyHeader;
